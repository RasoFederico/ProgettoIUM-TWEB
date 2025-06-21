//----------------
// Import moduli core
//----------------
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//----------------
// Import moduli database
//----------------
const mongoose = require('mongoose');

//----------------
// Import moduli Swagger
//----------------
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//----------------
// Import router
//----------------
const indexRouter = require('./routes/index');

//----------------
// Inizializza app Express
//----------------
const app = express();

//----------------
// Impostazioni del motore di viste
//----------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//----------------
// Middleware standard
//----------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//----------------
// Swagger configuration
//----------------
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Main Server',
            version: '5.0.1',
            description: 'Documentazione API della Filmoteca',
        },
    },
    apis: ['./routes/*.js'], // File da analizzare per Swagger JSDoc
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//----------------
// Connessione a MongoDB
//----------------
const mongoDB = 'mongodb://localhost:27017/reviews';

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, { checkServerIdentity: true })
    .then(() => {
        console.log('MongoDB connection started!');
    })
    .catch((err) => {
        console.error('MongoDB connection failed! ' + JSON.stringify(err));
    });
//----------------
// Routes
//----------------
app.use('/', indexRouter);

//----------------
// Gestione 404 (not found)
//----------------
app.use(function (req, res, next) {
    next(createError(404));
});

//----------------
// Gestione errori
//----------------
app.use(function (err, req, res, next) {
    // Mostra dettagli errore solo in sviluppo
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Rende la pagina di errore
    res.status(err.status || 500);
    res.render('error');
});

//----------------
// Esporta l'app
//----------------
module.exports = app;
