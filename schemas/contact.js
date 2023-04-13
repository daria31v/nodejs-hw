const Joi = require("joi");

const schemaJoiAdd = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.number().required()
})

  
const schemaJoiUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } }),
  phone: Joi.number()
}).min(1);


module.exports = { schemaJoiAdd, schemaJoiUpdate };
