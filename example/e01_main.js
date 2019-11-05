/** */
const http = require('http');
const http_methods = require('./e01a').http_methods;
const PORT = 8000;

const server = http.createServer((request, response) => {
    http_methods(request, response);
});

server.listen(PORT);
console.log(`Listening on port ${PORT}`);