const validateBodyNewContact = require("./validateBody");
const validateBodyUpdateContact = require("./validateUpdateContact");
const isValidId = require("./isValidId");
const validateBodyNewUser = require("./validateBodyNewUser");
const authentication = require("./authentication");
const validateUpdateUser = require("./validateUpdateUser");

module.exports = {
  validateBodyNewContact,
  validateBodyUpdateContact,
  validateUpdateUser,
  isValidId,
  validateBodyNewUser,
  authentication,

};
