const { HttpError } = require("../helpers");

const validateBodyUpdateContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(404, "Not Found");
    }

    next();
  };
  func.schema = schema;
  return func;
};

module.exports = validateBodyUpdateContact;
