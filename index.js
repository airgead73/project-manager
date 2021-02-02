const { createServer } = require('http');
const app = require('./app')
const { PORT } = require('./config/constants');
const server = createServer(app);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));