import http from "http";
import url from "url";
import { formatContactList, loadContacts } from "./services.mjs";

const contactList = [];


const server = http.createServer((req, res) => {
    const urlData = url.parse(req.url, true);
    let responseData = null;
    console.log(req.method, req.url);

    if (urlData.query.formatted == 'true') {
        res.setHeader('Content-Type', 'text/html');
        responseData = '<pre>'
        responseData += formatContactList(contactList);
        responseData += '</pre>'
    } else {
        res.setHeader('Content-Type', 'application/json');
        responseData = JSON.stringify(contactList);
    }

    res.writeHead(200);

    res.write(responseData);

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