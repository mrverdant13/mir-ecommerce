const express = require('express');
const cors = require('cors');

const apiV1 = require('./api/v1');
const { reqIdSetter, reqLogger, errorHandlers } = require('./middlewares');

const app = express();

// Enable CORS
app.use(cors());

// Process JSON payload.
app.use(express.json());

// Set request IDs on each request.
app.use(reqIdSetter);

// Log every request.
app.use(reqLogger);

// Plug API routes into the app.
// Using the V1 implementation as default.
app.use('/api', apiV1);
app.use('/api/v1', apiV1);

// Static files
app.use('/uploads', express.static('uploads'));

// Handle errors.
app.use(...errorHandlers);

module.exports = app;
