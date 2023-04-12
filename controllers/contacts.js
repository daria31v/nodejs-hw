const contacts = require("../models/contacts.js");

const { HttpError, ctrWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const listAll = await contacts.listContacts();
  res.status(200).json(listAll);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const dataId = await contacts.getContactById(contactId);
  if (!dataId) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(dataId);
};

const addNewContact = async (req, res) => {
  // console.log(req.body);
  const { name, email, phone } = req.body;
  const data = await contacts.addContact({ name, email, phone });
  console.log(data);
  res.status(201).json(data);
};

const updateById = async (req, res) => {
  // console.log(req.params);
  // console.log(
  //   req.body
  // );
  // if (!req.body) {
  //   throw HttpError(400, { message: "missing fields" });
  // }
  const id = req.params.contactId;
  // const name = req.params.name;
  // const email = req.params.email;
  // const phone = req.params.phone;
  const resultUpdate = await contacts.updateContact(id, req.body);
// console.log(resultUpdate);
  if (!resultUpdate) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(resultUpdate);
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const deleteContact = await contacts.removeContact(id);

  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrWrapper(getAll),
  getById: ctrWrapper(getById),
  addNewContact: ctrWrapper(addNewContact),
  updateById: ctrWrapper(updateById),
  deleteById: ctrWrapper(deleteById),
};
