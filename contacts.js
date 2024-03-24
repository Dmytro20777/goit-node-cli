import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return data.toString();
    } catch (error) {
        throw error;
    }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
}


async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        let contacts = JSON.parse(data);

        const index = contacts.findIndex(contact => contact.id === contactId);
        if (index !== -1) {
            const removedContact = contacts.splice(index, 1)[0];
            await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
            return removedContact;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}


async function addContact(name, email, phone) {
  try {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);

      const newContact = {
          id: Date.now(),
          name: name,
          email: email,
          phone: phone
      };

      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return newContact;

  } catch (error) {
      throw error;
  }
}


export { listContacts, getContactById, removeContact, addContact };


