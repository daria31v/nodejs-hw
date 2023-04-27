const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");


const { User } = require("../models/user");
const { SECRET_KEY } = process.env;
const { HttpError, ctrWrapper } = require("../helpers");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
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
  const { token, _id } = req.user;
  console.log(token);
  const { path: tempUpload, originalname } = req.file;
  const filename = `user_-_${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", resultUpload);
  await User.findOneAndUpdate(token, { avatarURL });

  res.status(200).json({
    avatarURL
  });
};

module.exports = {
  register: ctrWrapper(register),
  login: ctrWrapper(login),
  logout: ctrWrapper(logout),
  getCurrent: ctrWrapper(getCurrent),
  updateSubscription: ctrWrapper(updateSubscription),
  updateAvatar: ctrWrapper(updateAvatar),
};
