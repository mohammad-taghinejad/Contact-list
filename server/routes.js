import express from 'express';
import { formatContactList } from "../services.mjs";

const router = express.Router();

router.get('/list', (req, res) => {
    if (req.query.format) {
        const responseData = `<pre>${formatContactList(contactList)}</pre>`;
        res.type('html');
        res.send(responseData);
        return;
    }
    res.json(contactList);
});


export default router;