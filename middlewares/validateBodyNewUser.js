const { HttpError } = require("../helpers");

const validateBodyNewUser = (schema) => {
  const validation = (req, res, next) => {
    const newUser = req.body;
    console.log(newUser);
    const { error } = schema.validate(newUser);
    const fields = Object.keys(newUser);
    const CONSTANT = ["email", "password"];

    if (error && fields.length < CONSTANT.length){
      
      const set1 = Array.from(new Set(CONSTANT));
      const set2 = Array.from(new Set(fields));
      const resultFilter = set1.filter((field) => set2.indexOf(field) < 0);
      
      throw HttpError(400, `missing required ${resultFilter.join(",")} fields`);
    
    } else if (error && fields.length === CONSTANT.length) {
      console.log(error);
       throw HttpError(400, error.message)
    }
    next();
  };
  validation.schema = schema;
  return validation;
};

module.exports = validateBodyNewUser;
