const validateBodyNewContact = require('./validateBody');
const validateBodyUpdateContact = require('./validateUpdate');
const isValidId = require("./isValidId");
const validateBodyNewUser = require('./validateBodyNewUser');
const authentication = require("./authentication")

module.exports = {
    validateBodyNewContact, validateBodyUpdateContact, isValidId, validateBodyNewUser, authentication
};