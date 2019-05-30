const dbConfig = require('./dbconfig.js')
const mongoose = require('mongoose')

// Configuring the database
mongoose.Promise = global.Promise

// Connecting to the database
var db = mongoose.connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database')
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})
module.exports = { db }