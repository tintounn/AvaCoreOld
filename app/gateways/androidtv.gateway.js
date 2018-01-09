const EventEmitter = require('events').EventEmitter;
const Server = require('socket.io');

const AndroidTvObject = require('../class/AndroidTvDevice');

class AndroidTvGateway extends EventEmitter {
  constructor(config) { 
    super();
    this.port = config.get('gateway:androidtv');
    this.devices = [];
  }

  listen(http) {
    this.io = new Server();
    this.io.attach(http);
    this.io.listen(this.port);
  
    this.io.on('connection', (socket) => this.handleOnNewConnection(socket));
  }

  sendValue(nodeId, value, data) {
    this.io.to(nodeId).emit(value, data);
  }

  getObjectByNodeId(nodeId) {
    for(let device of this.devices) {
      if(device.nodeId == nodeId) return this.device;
    }
  }

  setNodeLocation(nodeId, location) {
    this.io.to(nodeId).emit('location:set', {location: location});
  }

  handleOnNewConnection(socket) {
    let object = new AndroidTvObject(socket.id, this);
    this.devices.push(object);

    socket.on('disconnect', () => this.handleOnCloseConnection(object));
  }

  handleOnCloseConnection(object) {
    let index = this.devices.indexOf(object);
    this.devices.splice(index, 1);
  }
}

module.exports = AndroidTvGateway;