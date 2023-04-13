const { HttpError } = require("../helpers");

const validateBodyNewContact = (schema) => {
  const validation = (req, res, next) => {
    // const fieldsConstant = ["name", "email", "phone"];
    const { error } = schema.validate(req.body);
    if (error) {
      const fields = [req.body];
      console.log(fields)
      const missingField = fields.filter(
        (field) => Object[field] === undefined
      );
      console.log(missingField.length);
      // const body = req.body;
      // console.log(body);
      if (missingField.length > 1) {
        throw HttpError(
          400,
          `missing required ${missingField[0]}.join(",") fields`
        );
      }
      // throw HttpError(400, "missing required name field");
    }

    next();
  };
  validation.schema = schema;
  return validation;
};

module.exports = validateBodyNewContact;
