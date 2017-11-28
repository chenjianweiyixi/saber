const net = require('net');
// console.dir(net);

var server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString());
  });
  // socket.end('goodbye\n');
});
server.on('error', (err) => {
  // handle errors here
  throw err;
});
  
  // grab a random port.
//   server.listen(() => {
//     address = server.address();
//     console.log('opened server on %j', address);
//   });

  server.listen({
    host: 'localhost',
    port: 9999,
    exclusive: true
  });

  // console.warn(`server.maxConnections:${server.maxConnections}`)
