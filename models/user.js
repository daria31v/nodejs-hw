const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const userTarif = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: [emailRegexp, "is not a valid email"],
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: userTarif,
      default: "starter",
    },
    avatarURL: String,
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const schemaJoiRegister = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().validate(...userTarif),
  token: Joi.string(),
});

const schemaJoiLogin = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemaJoiCurrentUser = Joi.object({
  email: Joi.string().pattern(emailRegexp),
  token: Joi.string().required(),
});

const schemaJoiUpdate = Joi.object({
  subscription: Joi.string().valid(...userTarif),
});

const schemas = {
  schemaJoiRegister,
  schemaJoiUpdate,
  schemaJoiLogin,
  schemaJoiCurrentUser,
};
const User = model("user", userSchema);

module.exports = { User, schemas };
