const path = require('path');
const express = require('express');
const logger = require('morgan');

const mongoose = require('mongoose');

// middleware import
const cors = require('./api/middleware/cors');
const corsOptions = require('./api/middleware/corsOptions');
const notFound = require('./api/middleware/notFound');
const errorHandling = require('./api/middleware/errorHandling');
const authGuard = require('./api/middleware/authGuard');

// routes import
const statusRoute = require('./api/routes/status');
const uploadFormRoute = require('./api/routes/uploadForm');
const uploadRoute = require('./api/routes/upload');

const userRoutes = require('./api/routes/user');
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");


// Initializations
// Express framework 
const app = express();
// DB Connection
const mongooseConnect = require('./api/data/mongooseConnect')(mongoose);

// Middleware **********************************************************
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')) ); 

// Fix CORS headers, needed to allow access to SPAs / UIs 
app.use(cors);


// Preflight request options
app.options(corsOptions);


// Routes **************************************************************

// Routing *************************************************************

app.use('/protected', authGuard, statusRoute );  // Protected Health endpoint
app.use('/', statusRoute);   // Public Health endpoint
app.use('/api/uploadform', uploadFormRoute);
app.use('/api/upload', uploadRoute);

app.use('/api/user', userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Middleware again for error handling and 404 *************************

// Not Found
app.use(notFound);

// Error handling for all application errors
app.use(errorHandling);


module.exports = app;
