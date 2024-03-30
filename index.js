import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { futimesSync } from "fs";

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log("---- ContactList ----");


async function addNewContact() {
    const firstName = await rl.question("First Name: ");
    const lastName = await rl.question("Last Name: ");
    const newContact = {
        id: contactList.length,
        firstName,
        lastName,
    }
    contactList.push(newContact);
}

function showContactList() {
    const formattedContactList = contactList.map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`).join(' \n ');

    console.log("Contact List: ");
    console.log(formattedContactList);
}

function quit() {
    rl.close();
}

await addNewContact();
showContactList();
quit();