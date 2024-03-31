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

function showContactList() {
    const formattedContactList = contactList.map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`).join(' \n ');

    console.log("Contact List: ");
    console.log(formattedContactList);
}

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

function quit() {
    rl.close();
}


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

async function main() {
    await loadContacts();
    help();
}

await main();