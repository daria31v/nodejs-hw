const validateBodyNewContact = require("./validateBody");
const validateBodyUpdateContact = require("./validateUpdateContact");
const isValidId = require("./isValidId");
const validateBodyNewUser = require("./validateBodyNewUser");
const authentication = require("./authentication");
const validateBodyUpdate = require("./validateUpdateUser");

module.exports = {
  validateBodyNewContact,
  validateBodyUpdateContact,
  validateBodyUpdate,
  isValidId,
  validateBodyNewUser,
  authentication,
//   validateBodyCurrentUser,
};
