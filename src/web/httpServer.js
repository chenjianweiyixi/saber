const http = require('http');
const router = require('./router')


const server = http.createServer((req, res) => {

    // res.writeHead(200, { 'Content-Type': 'text/plain',
    // 'Trailer': 'Content-MD5' });
    // res.write("server data: biubiubiu...");
    // res.addTrailers({'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667'});
    // res.end();
    router.route(req, res);

});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(9999);