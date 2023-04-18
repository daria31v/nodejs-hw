const express = require("express");
const controllers = require("../../controllers/contacts");

const { validateBodyNewContact } = require("../../middlewares");
const {
  validateBodyUpdateContact,
} = require("../../middlewares");

const schemas = require("../../schemas/contact");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/",
  validateBodyNewContact(schemas.schemaJoiAdd),
  controllers.addNewContact
);

router.put(
  "/:contactId",
  validateBodyUpdateContact(schemas.schemaJoiUpdate),
  controllers.updateById
);

router.delete("/:contactId", controllers.deleteById);

module.exports = router;
