const { HttpError } = require("../helpers");

const validateVerifyEmail = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      throw HttpError(400, "missing required field email");
    }
    next();
  };
  func.schema = schema;
  return func;
};



module.exports = validateVerifyEmail;
