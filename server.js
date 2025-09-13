const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const connectMongo = require('./server/database/connect');
const PORT = process.env.PORT || 3000;

// set view engine
app.set('view engine', 'ejs');

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static('assets'));

// use morgan to log http requests
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to Database
connectMongo();

// load routes
app.use('/', require('./server/routes/routes'));

// =======================
// ERROR HANDLING
// =======================

// Handle 404 - Page not found
app.use((req, res, next) => {
    res.status(404).render("error", { 
        title: "Page Not Found", 
        message: "Oops! The page you are looking for does not exist." 
    });
});

// Global error handler (for crashes or thrown errors)
app.use((err, req, res, next) => {
    console.error("❌ Error stack:", err.stack);

    res.status(500).render("error", { 
        title: "Server Error", 
        message: "Something went wrong on our server. Please try again later." 
    });
});

// start server
app.listen(PORT, function () {
    console.log('listening on ' + PORT);
    console.log(`Welcome to the Drug Monitor App at http://localhost:${PORT}`);
});

module.exports = app;
