const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;
const { HttpError, ctrWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email alredy exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  // if(!user.password){
  //   throw HttpError(401, "Email or password is wrong");
  // }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const playload = {
    id: user._id,
  };
  const token = jwt.sign(playload, SECRET_KEY, { expiresIn: "3d" });
  await User.findByIdAndUpdate(user._id, {token})

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
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const {_id } = req.user;
  await User.findByIdAndRemove(_id, { token: "" });

  // if (!_id) {
  //   throw HttpError(401, "Not authorized");
  // }
  res.status(204)
};

const updateSubscription = async (req, res) => {
  const {_id} = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {new: true});
  if(!result){
    throw HttpError(404)
  }
  res.status(200).json(result)
}

module.exports = {
  register: ctrWrapper(register),
  login: ctrWrapper(login),
  logout: ctrWrapper(logout),
  getCurrent: ctrWrapper(getCurrent),
  updateSubscription: ctrWrapper(updateSubscription)
};
