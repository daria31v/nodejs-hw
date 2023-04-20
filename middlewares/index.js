const validateBodyNewContact = require('./validateBody');
const validateBodyUpdateContact = require('./validateUpdate');
const isValidId = require("./isValidId");

module.exports = {
    validateBodyNewContact, validateBodyUpdateContact, isValidId
};