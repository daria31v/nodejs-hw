const express = require("express");
const controllers = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contact");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", validateBody(schemas.schemaJoi), controllers.addNewContact);

router.put(
  "/:contactId",
  validateBody(schemas.schemaJoi),
  controllers.updateById
);

router.delete("/:contactId", controllers.deleteById);

module.exports = router;
