const http = require('http');

const { port } = require('./config');
const logger = require('./logger');
const app = require('./server');

const server = http.createServer(app);
server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
