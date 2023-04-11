const Joi = require("joi");

const schemaJoi = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.number().required(),
});

module.exports = { schemaJoi };
