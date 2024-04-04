import http from "http";
import { loadContacts } from "./services.mjs";

const contactList = [];


const server = http.createServer((req, res) => {
    const urlData = req.parse(req.url, true);


    res.write("");
    res.end();
});

async function main() {
    const loadedContacts = await loadContacts();

    contactList.push(...loadedContacts);

    server.listen(3000, () => {
        console.log("HTTP server is listening on the port 3000");
    });
}

await main();