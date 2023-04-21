const validateBodyNewContact = require('./validateBody');
const validateBodyUpdateContact = require('./validateUpdate');
const isValidId = require("./isValidId");
const validateBodyNewUser = require('./validateBodyNewUser');

module.exports = {
    validateBodyNewContact, validateBodyUpdateContact, isValidId, validateBodyNewUser
};