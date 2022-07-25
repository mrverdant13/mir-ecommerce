const http = require('http');

const { port } = require('./config');
const database = require('./database');
const logger = require('./logger');
const app = require('./server');

database.connect();

const server = http.createServer(app);
server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
