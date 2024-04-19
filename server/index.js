import express from "express";
import routes from './routes.js'
const app = express();
const port = 3000;

function loggerMiddleware(req, res, next) {
    console.log("Request: ", req.method, req.url);
    next();
}

app.disable('etag');
app.use(loggerMiddleware);
app.use("/contacts", routes);


app.listen(port, () => {
    console.log("HTTP server is listening on the port 3000");
});
