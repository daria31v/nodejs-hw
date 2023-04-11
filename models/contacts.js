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
  if (contact) {
    console.log(chalk.greenBright(`Contact: ${contactId} was finded.`));
    return contact || null;
  }
};

const addContact = async (data) => {
  const contacts = await readAllContacts();
  const newContact = { id: nanoid(21), ...data };

  contacts.push(newContact);
  await updateAllContacts(contacts);
  return newContact && console.log(chalk.bgBlueBright(`Contact was added!`));
};
const removeContact = async (contactId) => {
  const id = contactId;
  const contacts = await readAllContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [newListContacts] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  return newListContacts;
};

const updateContact = async (contactId, data) => {
  const id = contactId;
  const contacts = await readAllContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };

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
