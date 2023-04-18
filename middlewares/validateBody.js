const { HttpError } = require("../helpers");

const validateBodyNewContact = (schema) => {
  const validation = (req, res, next) => {
    const newContact = req.body;
    const { error } = schema.validate(newContact);
    console.log(error);
    if (error) {
      const CONSTANT = ["name", "email", "phone"];
      const fields = Object.keys(newContact);

      const set1 = Array.from(new Set(CONSTANT));
      const set2 = Array.from(new Set(fields));

      const resultFilter = set1.filter((field) => set2.indexOf(field) < 0);
     
      throw HttpError(400, `missing required ${resultFilter.join(",")} fields`);
    }
    next();
  };
  validation.schema = schema;
  return validation;
};

module.exports = validateBodyNewContact;
