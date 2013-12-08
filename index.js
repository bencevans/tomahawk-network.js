
var frame = require('./lib/frame');
var messages = require('./lib/messages');
var net   = require('net');

var server = net.createServer(function(socket) {

  socket.on('data', function(frameBuffer) {
    console.log('Received:', frame.unpack(frameBuffer));
  });

});

var client = net.connect(50210, function() {
  client.write(messages.initiateConnection());
  client.on('data', function(data) {
    console.log('Client Received');
  })
});

server.listen(3000, function() {
  console.log('Listening on port 3000');
});