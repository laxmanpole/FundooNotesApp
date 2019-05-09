const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/route')
const gitrouter = require('./routes/gitroute')
const dbConfig = require('./dbconfig.js');
const mongoose = require("mongoose")
const session = require('express-session')
require('dotenv').config();
const app = express();
var expressValidator = require('express-validator')
app.use(expressValidator());


//parse requests of content-type-application/X-WWW-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//parse requests of content-type-application/json
app.use(bodyParser.json())
app.use('/', router)
app.use('/', gitrouter)

app.use(session({
    secret: 'bridgelabz developer',
    resave: true,
    saveUninitialized: true
}));

// Configuring the database

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



//listen for requests
app.listen(process.env.port, () => {
    console.log("Server is listening on port 3000");
});
//app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app;