const express = require('express');
const cors = require('cors');

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

// Handle errors.
app.use(...errorHandlers);

module.exports = app;
