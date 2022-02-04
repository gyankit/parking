const http = require('http');
const app = require('../app');

const port = 8000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
}).on('error', () => {
    console.log('Error Occur');
})