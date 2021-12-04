const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
var cookieParser = require('cookie-parser')

require("dotenv").config();
const Todo = require("./server/models").Todo;
const routes = require('./controller')
app.use(cookieParser())
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Require our routes into the application.
// require('./server/routes')(app);
// app.get("*", (req, res) =>
//   Todo.findAll({raw: true})
//     .then((value) => {
//       console.log("value di sini",value);
//       res.status(200).send({
//         message: value,
//       });
//     })
//     .catch((error) => res.status(400).send(error))
// );

app.use('/api', routes)

const port = parseInt(process.env.PORT, 10) || 4000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;
