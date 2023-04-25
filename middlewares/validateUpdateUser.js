const { HttpError } = require("../helpers");

const validateBodyUpdate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const { subscription } = req.body;
    if (!subscription) {
      throw HttpError(400, "missing field subscription");
    } else if (error && subscription) {
      throw HttpError(404, error.message);
    }
    next();
  };
  func.schema = schema;
  return func;
};

module.exports = validateBodyUpdate;
