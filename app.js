const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//const morgan = require('morgan');    // logging support

const userRoutes = require('./api/routes/user');
const protectedStatusRoutes = require('./api/routes/status-protected');

// Middleware **********************************************************

//app.use(morgan('dev'));              // logging support

// request body parsing
app.use(express.json());               

// Make public the folder for access from external url
app.use('/public/images', express.static(path.join(__dirname, 'public/images')) ); 

// Fix CORS headers, needed to allow access to SPAs / UIs 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ALLOW_ORIGIN || "*");
    res.header("Access-Control-Allow-Headers", process.env.ALLOW_HEADERS || "*" );

    next();
});


// Routes **************************************************************

// Health endpoint
app.get('/status', (req, res, next) => {
    res.status(200).send('ok');
});

// Preflight request handling here, request is made with the OPTION http method
app.options( (req, res, next)=> {
    res.header('Access-Control-Allow-Methods', process.env.ALLOW_METHODS || 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
});


// Import routes *******************************************************
app.use('/api/user', userRoutes);
app.use('/api/status', protectedStatusRoutes);



// Middleware again for error handling and 404 *************************

// Not found -- It needs to run after all routes mapping, 
// it means will catch whatever not matched with above routes
app.use( (req, res, next) => {
    let error = new Error('404 Requested resource not found');
    error.status = 404;
    next(error);
});

// Error Handling for all errors
app.use( (error, req, res, next) => { 
    res.status( error.status || 500 );
    //customize you error result here:
    res.json({
        error: { message: error.message }
    });
});


// DB connection
const uri = /*process.env.DB_CONNECTION ||*/ 'mongodb://root:secret@localhost:27017'; 
mongoose.Promise = global.Promise;
mongoose.connect( 
    uri, 
    { useNewUrlParser: true, useUnifiedTopology: true }
).then( () => { 
    console.log('Connected to mongodb!'); 
}).catch( err => {
    console.log('Error connecting database', err);
});


module.exports = app;