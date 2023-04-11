const express = require("express");
const controllers = require("../../controllers/contacts");
// console.log(controllers);

const {validateBody} = require('../../middlewares');

const schemas = require("../../schemas/contact");
const jsonParser = express.json();
const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", jsonParser, validateBody(schemas.schemaJoi), 
controllers.addNewContact);


router.put("/:contactId", jsonParser, validateBody(schemas.schemaJoi), 
controllers.updateById);

router.delete("/:contactId", controllers.deleteById);

module.exports = router;
