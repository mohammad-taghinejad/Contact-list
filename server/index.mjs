import express from "express";
import { loadContacts } from "../services.mjs";
import routes from './routes.js'
const app = express();
const port = 3000;
const contactList = [];

function loggerMiddleware(req, res, next) {
    console.log("Request: ", req.method, req.url);
    next();
}

app.disable('etag');
app.use(loggerMiddleware);
app.use("/contacts", routes);




async function main() {
    const loadedContacts = await loadContacts();

    contactList.push(...loadedContacts);

    app.listen(port, () => {
        console.log("HTTP server is listening on the port 3000");
    });
}

await main();