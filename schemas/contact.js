const Joi = require("joi");

const schemaJoi = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  module.exports = {schemaJoi};

  