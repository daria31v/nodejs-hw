const contacts = require("../models/contacts.js");
const { HttpError, ctrWrapper } = require("../helpers");


const getAll = async (req, res) => {
  
    const listAll = await contacts.listContacts();
    res.json(listAll);
};
const getById = async (req, res) => {
    const { contactId } = req.params;
    const dataId = await contacts.getContactById(contactId);
    
    if (!dataId) {
      throw HttpError(404, "Not found");
    }
    res.json(dataId);
 };
const addNewContact = async (req, res) => {
     const data = await contacts.addContact(req.body);
    console.log(data);
    res.status(201).json(data);
 
};
const updateById = async (req, res) => {
    console.log(req, res)   
    const { id } = req.params;
     const resultUpdate = await contacts.updateContacts(id, req.body);
     console.log(resultUpdate);
    if (!resultUpdate) {
      throw HttpError(404, "Not found");
    }
    res.json(resultUpdate);  
};
const deleteById = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const deleteContact = await contacts.removeContact(id);
    console.log(deleteContact);
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
