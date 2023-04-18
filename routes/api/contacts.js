const express = require("express");
const controllers = require("../../controllers/contacts");

const { validateBodyNewContact } = require("../../middlewares");
const {
  validateBodyUpdateContact,
} = require("../../middlewares");
const { isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", 
// isValidId, 
controllers.getById);

router.post(
  "/",
  validateBodyNewContact(schemas.schemaJoiAdd),
  controllers.addNewContact
);

router.put(
  "/:contactId", 
  // isValidId,
  validateBodyUpdateContact(schemas.schemaJoiUpdate),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite", 
  // isValidId,
  // validateBodyUpdateContact(schemas.schemaUpdateFavorite),
  controllers.updateFavorite
);

router.delete("/:contactId", 
// isValidId, 
controllers.deleteById);

module.exports = router;
