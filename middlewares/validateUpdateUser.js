const { HttpError } = require("../helpers");

const validateBodyUpdate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    // if (error) {
    //   throw HttpError(400, "missing field subscription");
    // }
    next();
  };
  func.schema = schema;
  return func;
};


module.exports =  validateBodyUpdate;
