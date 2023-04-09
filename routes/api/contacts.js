const express = require("express");

const contacts = require("../../models/contacts.js");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const schemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const listAll = await contacts.listContacts();
    res.json(listAll);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const dataId = await contacts.getContactById(contactId);
    // console.log(data);
    if (!dataId) {
      throw HttpError(404, "Not found");
    }
    res.json(dataId);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemaJoi.validate(req.body);
    console.log(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const resultAdd = await contacts.addContact(req.body);
    res.status(201).json(resultAdd);
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schemaJoi.validate(req.body);
    console.log(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const resultUpdate = await contacts.updateContacts(id, req.body);
    if (!resultUpdate) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(resultUpdate);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const deleteContact = await contacts.removeContact(id);
    console.log(deleteContact);
    if (!deleteContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({"message": "contact deleted"});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
