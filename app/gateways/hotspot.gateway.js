const EventEmitter = require('events').EventEmitter;
const Server = require('socket.io');

const HotSpotDevice = require('../class/HotSpotDevice');

class HopSpotGateway extends EventEmitter {
  constructor(config) { 
    super();
    this.port = config.get('gateway:hotspot');
    this.devices = [];
  }

  listen(http) {
    this.io = new Server(http);
    this.io.attach(http);
    this.io.path('/hotspots');
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
    let device = new HotSpotDevice(socket.id, this, '');
    this.devices.push(device);

    this.emit('connection', device);

    ava.log.info(`Hotspot connected: ${socket.id}`);
    socket.on('disconnect', () => this.handleOnCloseConnection(device));
  }

  handleOnCloseConnection(device) {
    let index = this.devices.indexOf(device);
    this.devices.splice(index, 1);

    ava.log.info(`Hotspot disconnected: ${device.nodeId}`);

    this.emit('disconnect', device);
  }
}

module.exports = HopSpotGateway;