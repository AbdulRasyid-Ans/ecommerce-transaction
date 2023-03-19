const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compress = require('compression');
const helmet = require('helmet');
const logger = require('morgan');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

const config = require('./config');
const routes = require('../routes');

require('./cron');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress())
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(logger('dev'));

// Get API Version from .env
const baseUrl = `/api/v${config.apiVersion}`;

// mount all routes on /api path
app.use(`${baseUrl}`, routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(res.status(404).json({
    response: 404,
    result: {
        message: 'API Not Found',
    },
})));

module.exports = app