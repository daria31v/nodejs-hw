const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const chalk = require("chalk");

const contactsPath = path.resolve("./models/contacts.json");
// console.log(contactsPath);

async function readAllContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

const listContacts = async () => {
  return await readAllContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readAllContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  console.log(contact);
  if (!contact) {
    console.log(chalk.red(`Sorry there is no contact with ${contactId}.`));
  }
  if (contact) {
    console.log(chalk.greenBright(`Contact: ${contactId} was finded.`));
    return contact || null;
  }
};

const removeContact = async (contactId) => {
  const contacts = await readAllContacts();

  const contact = await contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    console.log(`Sorry there is no contact with ${contactId}.`);
  }

  const newListContacts = await contacts.filter(
    (contact) => contact.id !== contactId
  );

  await updateContacts(newListContacts);
  return console.log(
    chalk.green(`Succsess! Contact ${contactId} was removed.`)
  );
};

const addContact = async (contact) => {
  const contacts = await readAllContacts();
  console.log(contacts);
  const newContact = { id: nanoid(21), contact };
  console.log(newContact);
  
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact && console.log(chalk.bgBlueBright(`Contact was added!`));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
};
