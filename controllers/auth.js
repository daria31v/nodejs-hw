const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

require("dotenv").config();

const { User } = require("../models/user");
const { SECRET_KEY, BASE_URL, SENDER_EMAIL } = process.env;
const { HttpError, ctrWrapper, sendEmails } = require("../helpers");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid(6);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmails({
    to: `${email}`,
    from: SENDER_EMAIL,
    subject: `Welcome ${email}`,
    html: `<table>
      <thead>
          <tr>
              <th >Please verify your email - follow the link below</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td><a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click me</a></td>      
          </tr>
      </tbody>
  </table`,
    headers: {
      "Content-Type": "text/html",
    },
  })
    .then((info) => console.log(info))
    .catch((err) => console.error(err));

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmailUser = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken: verificationToken });

  if (user === null) {
    throw HttpError(401, "Invalid verification token");
  }
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
};

const resentVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400);
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmails({
    to: `${email}`,
    from: SENDER_EMAIL,
    subject: `Welcome again ${email}`,
    html: `<table>
      <thead>
          <tr>
              <th >Please verify your email - follow the link below</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td><a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click me</a></td>      
          </tr>
      </tbody>
  </table`,
    headers: {
      "Content-Type": "text/html",
    },
  })
    .then((info) => console.log(info))
    .catch((err) => console.error(err));

  res.status(200).json({ message: "Verification email sent" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, verify: true });

  if (!user || !user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const playload = {
    id: user._id,
  };

  const token = jwt.sign(playload, SECRET_KEY, { expiresIn: "3d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription, token } = req.user;
  if (!token) {
    throw HttpError(401, "Not authorized");
  }
  res.status(200).json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const resultLogout = await User.findByIdAndRemove(_id, { token: "" });
  if (!resultLogout) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204).json("");
};

const updateSubscription = async (req, res) => {
  const { token } = req.user;
  const result = await User.findOneAndUpdate(token, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { token } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const nanoidId = nanoid(3);
  const extention = path.extname(originalname);
  const basename = path.basename(originalname, extention);
  const newName = basename + "-" + nanoidId + extention;
  const filename = `${newName}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findOneAndUpdate({ token }, { avatarURL });

  (async function () {
    const image = await Jimp.read(resultUpload);
    image.resize(250, 250);
    image.write(resultUpload);
  })();

  res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  register: ctrWrapper(register),
  login: ctrWrapper(login),
  logout: ctrWrapper(logout),
  getCurrent: ctrWrapper(getCurrent),
  updateSubscription: ctrWrapper(updateSubscription),
  updateAvatar: ctrWrapper(updateAvatar),
  verifyEmailUser: ctrWrapper(verifyEmailUser),
  resentVerifyEmail: ctrWrapper(resentVerifyEmail),
};
