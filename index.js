/*
  This script manages a contact list stored in a JSON file. It utilizes the readline module to interact with the user via the command line.
  The contact list is loaded from and saved to a file named "contact-list.json" using the fs module.

  Functions:
  - loadContacts(): Loads the contact list from the file.
  - saveContacts(): Saves the current contact list to the file.
  - addNewContact(): Prompts the user to input a new contact and adds it to the contact list.
  - showContactList(): Displays the current contact list.
  - deleteContact(): Prompts the user to delete a contact from the list.
  - quit(): Closes the readline interface, terminating the program.
  - help(): Displays a list of available actions and prompts the user for input.

  Operations:
  - Upon running the script, it loads the existing contacts, then displays the help menu.
  - The user can choose to add a new contact ('n'), show the contact list ('l'), delete a contact ('d'), or quit ('q').
  - The script loops until the user chooses to quit.
*/

import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import fs from "fs/promises";

const CONTACT_LIST_FILE_PATH = "./data/contact-list.json";

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log("---- ContactList ----");


/*
  This function loads the contact list from the JSON file located at CONTACT_LIST_FILE_PATH.
  It reads the file asynchronously using fs.readFile and parses the JSON data.
  If successful, it appends the loaded contacts to the contactList array.
  If an error occurs during file reading or parsing, it throws the error.
*/
async function loadContacts() {
    try {
        const contactListJSON = await fs.readFile(CONTACT_LIST_FILE_PATH, 'utf-8');
        contactList.push(
            ...JSON.parse(contactListJSON)
        );
    } catch (error) {
        throw error;
    }
}


/*
  This function saves the current contact list to the JSON file located at CONTACT_LIST_FILE_PATH.
  It serializes the contactList array to JSON format and writes it to the file asynchronously using fs.writeFile.
  If an error occurs during file writing, it throws the error.
*/
async function saveContacts() {
    try {
        const contactListJSON = JSON.stringify(contactList);
        await fs.writeFile(CONTACT_LIST_FILE_PATH, contactListJSON);
    } catch (error) {
        throw error;
    }
}


/*
  This function prompts the user to input a new contact's first name and last name.
  It generates a unique ID for the new contact based on the ID of the last contact in the list.
  It then creates a new contact object and adds it to the contactList array.
  Finally, it saves the updated contact list to the file using the saveContacts function.
*/
async function addNewContact() {
    const firstName = await rl.question("First Name: ");
    const lastName = await rl.question("Last Name: ");
    const lastContact = contactList[contactList.length - 1];
    const id = lastContact.id + 1;

    const newContact = {
        id,
        firstName,
        lastName,
    }
    contactList.push(newContact);
    await saveContacts();
}


/*
  This function formats and displays the current contact list in the console.
  It iterates over each contact in the contactList array, formats it as a string, and joins them with line breaks.
  The formatted contact list is then printed to the console.
*/
function showContactList() {
    const formattedContactList = contactList.map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`).join(' \n ');

    console.log("Contact List: ");
    console.log(formattedContactList);
}


/*
  This function prompts the user to confirm the deletion of a contact.
  If confirmed ('y'), it displays the contact list and prompts the user to enter the ID of the contact to delete.
  It then finds the index of the contact in the contactList array, removes it, and saves the updated list to the file.
  If canceled ('n'), it displays the help menu.
*/
async function deleteContact() {
    if (contactList.length < 1) {
        console.error("There is no contact on the list");
        return;
    }
    try {
        console.log("Are you sure you want delete a contact?");
        const deleteContact = await rl.question("( y / n ): ");
        if (deleteContact === "y") {
            await showContactList();
            const contactID = await rl.question("Write the ID of the contact that you want to delete: ");
            const contactIndex = contactList.findIndex(({ id }) => id === Number(contactID));

            if (contactIndex < 0) {
                console.error("Invalid index - you should write a valid contact ID to delete from the contact list.");
                return;
            }

            contactList.splice(contactIndex, 1);
            await saveContacts();
        } else {
            await help();
        }
    } catch (error) {
        throw error;
    }
}


/*
  This function closes the readline interface, terminating the program.
*/
function quit() {
    rl.close();
}


/*
  This function displays a help menu with available actions and prompts the user to enter their choice.
  Based on the user's input, it calls the appropriate function (addNewContact, showContactList, deleteContact, quit).
  If an invalid input is provided, it displays the help menu again.
*/
async function help() {
    console.log('\nn: Add new contact\nl: Show contact list\nd: Delete a contact\nq: Quit\n');

    console.log("----------");

    const action = await rl.question("Enter your input: ");

    if (action === 'n') {
        await addNewContact();
    } else if (action === 'l') {
        showContactList();
    } else if (action === 'd') {
        await deleteContact();
    } else {
        quit();
        return;
    }

    console.log("----------");

    help();
}


/*
  This function serves as the entry point of the program.
  It first loads the existing contacts using loadContacts, then displays the help menu using help.
*/
async function main() {
    await loadContacts();
    help();
}

/*
  This function executes the main logic of the program.
  It loads the existing contacts, then displays the help menu to start interaction with the user.
*/
await main();