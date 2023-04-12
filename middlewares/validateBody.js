// const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    console.log(req.params);
    // console.log(value);
    // console.log(error);
    // console.log(req.body);
    if (error && !value.object) {
      return res.status(400).json({ message: "missing fields" });
    }
    // if(error && !value){
    //   throw HttpError(400, "missing required name fields");
    // }
    next();
  };
  func.schema = schema;
  return func;
};

module.exports = validateBody;
