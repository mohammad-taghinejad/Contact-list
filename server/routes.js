import express from 'express';
import { formatContactList, loadContacts } from "../services.mjs";

const router = express.Router();
const contactList = [];

router.get('/list', (req, res) => {
    if (req.query.format) {
        const responseData = `<pre>${formatContactList(contactList)}</pre>`;
        res.type('html');
        res.send(responseData);
        return;
    }
    res.json(contactList);
});

const loadedContacts = await loadContacts();
contactList.push(...loadedContacts);

export default router;