const path = require('path');
const express = require('express');
const app = express();


// Middleware ******************************************** 
app.use(express.json());    // request body parsing
app.use( '/public/images', express.static(path.join(__dirname, 'public/images')) ); // access folder from external url

// Import routes 


// Routes
app.get('/status',(req, res, next) => {
    res.status(200).send('ok');
});

// DB connection
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:secret@localhost:27017';


module.exports = app;