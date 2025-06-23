const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const indexRouter = require('./routes/index');


const app = express();

// -------------------
// Configurazione Handlebars
// -------------------
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');

// -------------------
// Middleware base
// -------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -------------------
// Swagger/OpenAPI
// -------------------
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Main Server',
      version: '5.0.1',
      description: 'Documentazione API della Filmoteca',
    },
  },
  apis: [ /*   './routes/*.js'  */ path.join(__dirname, 'routes', '*.js')] // Tutti i file di routes con JSDoc/OpenAPI
  ,
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
console.log("Swagger paths:", Object.keys(swaggerSpec.paths));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// -------------------
// Routes
// -------------------
app.use('/', indexRouter);

// -------------------
// Gestione errori
// -------------------
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  const env = req.app.get('env');
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: env === 'development'
        ? { status: err.status || 500, stack: err.stack }
        : { status: err.status || 500, stack: '' },
  });
});

module.exports = app;
