import fs from "fs/promises";

const CONTACT_LIST_FILE_PATH = "./data/contact-list.json";

/*
  This function loads the contact list from the JSON file located at CONTACT_LIST_FILE_PATH.
  It reads the file asynchronously using fs.readFile and parses the JSON data.
  If successful, it appends the loaded contacts to the contactList array.
  If an error occurs during file reading or parsing, it throws the error.
*/
export async function loadContacts() {
  try {
    const contactListJSON = await fs.readFile(CONTACT_LIST_FILE_PATH, 'utf-8');
    return JSON.parse(contactListJSON);
  } catch (error) {
    throw error;
  }
}

/*
  This function saves the current contact list to the JSON file located at CONTACT_LIST_FILE_PATH.
  It serializes the contactList array to JSON format and writes it to the file asynchronously using fs.writeFile.
  If an error occurs during file writing, it throws the error.
*/
export async function saveContacts(contactList) {
  try {
    const contactListJSON = JSON.stringify(contactList);
    await fs.writeFile(CONTACT_LIST_FILE_PATH, contactListJSON);
  } catch (error) {
    throw error;
  }
}

/*
  This function formats and displays the current contact list in the console.
  It iterates over each contact in the contactList array, formats it as a string, and joins them with line breaks.
  The formatted contact list is then printed to the console.
*/
export function formatContactList(contactList) {
  return contactList.map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`).join(' \n');
}


export function generateContactId(contactList) {
  const lastContact = contactList[contactList.length - 1];
  const id = lastContact.id + 1;

  return id;
}