import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import fs from "fs/promises";

const CONTACT_LIST_FILE_PATH = "./data/contact-list.json";

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log("---- ContactList ----");

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

async function saveContacts() {
    try {
        const contactListJSON = JSON.stringify(contactList);
        await fs.writeFile(CONTACT_LIST_FILE_PATH, contactListJSON);
    } catch (error) {
        throw error;
    }
}

async function addNewContact() {
    const firstName = await rl.question("First Name: ");
    const lastName = await rl.question("Last Name: ");
    const newContact = {
        id: contactList.length,
        firstName,
        lastName,
    }
    contactList.push(newContact);
    await saveContacts();
}

function showContactList() {
    const formattedContactList = contactList.map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`).join(' \n ');

    console.log("Contact List: ");
    console.log(formattedContactList);
}

function quit() {
    rl.close();
}


async function help() {
    console.log('\nn: Add new contact\nl: Show contact list\nq: Quit\n');
    const action = await rl.question("Enter your input: ");

    if (action === 'n') {
        await addNewContact();
    } else if (action === 'l') {
        showContactList();
    } else {
        quit();
        return;
    }

    help();
}

async function main() {
    await loadContacts();
    help();
}

await main();