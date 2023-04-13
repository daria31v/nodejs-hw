const { HttpError } = require("../helpers");

const validateBodyNewContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    next();
  };
  func.schema = schema;
  return func;
};

module.exports = validateBodyNewContact;
