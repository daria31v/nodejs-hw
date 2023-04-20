const bcrypt = require("bcryptjs")

const { User } = require("../models/user");

const { HttpError, ctrWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);

  if(user){
    throw HttpError (409, "Email alredy exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({...req.body, password: hashPassword});

  res.status(201).json({
    // password: newUser.password,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = {
  register: ctrWrapper(register),
};
