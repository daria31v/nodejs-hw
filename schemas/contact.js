const Joi = require("joi");

const schemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.number().required()
});
  

module.exports = { schemaJoi };
