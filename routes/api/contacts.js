const express = require("express");
const controllers = require("../../controllers/contacts");

const { validateBodyNewContact } = require("../../middlewares");
const { validateBodyUpdateContact } = require("../../middlewares");
const { isValidId } = require("../../middlewares");
const {authentication } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authentication, controllers.getAll);
// router.get("/", authentication,  controllers.getFavoriteTrue);

router.get("/:contactId", authentication, isValidId, controllers.getById);

router.post(
  "/", authentication,
  validateBodyNewContact(schemas.schemaJoiAdd),
  controllers.addNewContact
);

router.put(
  "/:contactId", authentication,
  isValidId,
  validateBodyUpdateContact(schemas.schemaJoiUpdate),
  controllers.updateById
);

router.patch(
  "/:contactId/favorite", authentication,
  isValidId,
  validateBodyUpdateContact(schemas.schemaUpdateFavorite),
  controllers.updateFavorite
);

router.delete("/:contactId", authentication, isValidId, controllers.deleteById);

module.exports = router;
