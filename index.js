const { createServer } = require('http');
const app = require('./app')
const PORT = 3000;
const server = createServer(app);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));