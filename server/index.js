import express from "express";
import routes from './routes.js'
import bodyParser from "body-parser";
const app = express();
const port = 3000;

function loggerMiddleware(req, res, next) {
    console.log("Request: ", req.method, req.url);
    next();
}

app.disable('etag');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(loggerMiddleware);
app.use("/contacts", routes);


app.listen(port, () => {
    console.log("HTTP server is listening on the port 3000");
});
