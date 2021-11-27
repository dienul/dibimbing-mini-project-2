const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");

const Todo = require("./server/models").Todo;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
// require('./server/routes')(app);
app.get("*", (req, res) =>
  Todo.findAll({raw: true})
    .then((value) => {
      console.log("value di sini",value);
      res.status(200).send({
        message: value,
      });
    })
    .catch((error) => res.status(400).send(error))
);

const port = parseInt(process.env.PORT, 10) || 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;
