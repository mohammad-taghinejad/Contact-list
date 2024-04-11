import express from "express";
import { formatContactList, loadContacts } from "./services.mjs";

const app = express();
const port = 3000;
const contactList = [];

function loggerMiddleware(req, res, next) {
    console.log("Request: ", req.method, req.url);
    next();
}

app.disable('etag');
app.use(loggerMiddleware);

app.get('/list', (req, res) => {
    if (req.query.format) {
        const responseData = `<pre>${formatContactList(contactList)}</pre>`;
        
        res.type('html');
        res.send(responseData);
        return;
    }
    res.json(contactList);
});



async function main() {
    const loadedContacts = await loadContacts();

    contactList.push(...loadedContacts);

    app.listen(port, () => {
        console.log("HTTP server is listening on the port 3000");
    });
}

await main();