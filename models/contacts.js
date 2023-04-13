const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const chalk = require("chalk");

const contactsPath = path.join(__dirname, "contacts.json");

async function readAllContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function updateAllContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
}

const listContacts = async () => {
  return await readAllContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readAllContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    console.log(chalk.red(`Sorry there is no contact with ${contactId}.`));
  }
  return contact || null;
};

const addContact = async (data) => {
  const contacts = await readAllContacts();
  const newContact = { id: nanoid(21), ...data };
  contacts.push(newContact);
  await updateAllContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const id = contactId;
  const contacts = await readAllContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [newListContacts] = contacts.splice(index, 1);
  await updateAllContacts(contacts);
  return newListContacts;
};

const updateContact = async (contactId, data) => {
  const id = contactId;
  const existingContact = await getContactById(id);
  const { name, email, phone } = data;
  const contacts = await readAllContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...existingContact, ...data };
  console.log(contacts[index]);
  await updateAllContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
