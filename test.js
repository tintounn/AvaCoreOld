var socket = require('socket.io-client')('http://localhost:8080/');


let requestId = parseInt(Math.random()*100);


socket.on('post /auth ' + requestId, (data) => {
  console.log(data);
  socket.removeListener('post /auth ' + requestId);
});
socket.emit('post /auth', {requestId: requestId, body: {code: "1111"}});
