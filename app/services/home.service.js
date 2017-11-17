//const ZwaveObject = require('../class/ZwaveObject');
const DeviceManager = require('../class/DeviceManager');

class HomeService {
  constructor() {
    this.deviceManager = new DeviceManager();
    this.rooms = [];
  }

  addRoom(room) {
    room.deviceManager = new DeviceManager();
    this.rooms.push(room);

    return room;
  }

  removeRoom(roomId) {
    for(let i = 0; i < this.rooms.length; i++) {
      let room = this.rooms[i];

      if(room.id == roomId) {
        for(let device of room.deviceManager.devices) {
          device.setLocation('');
        }

        this.rooms.splice(i, 1);
        return;
      }
    }
  }

  addRooms(rooms) {
    for(let room of rooms) {
      this.addRoom(room);
    }
  }

  getRooms() {
    return this.rooms;
  }

  getRoomById(roomId) {
    for(let room of this.rooms) {
      if(room.id == roomId) {
        return room;
      }
    }
  }

  getObjectsByRoom(roomId) {
    return this.getRoomById(roomId).deviceManager.devices;
  }

  setObjectLocation(nodeId, roomId) {
    let device = ava.deviceManager.getObjectByNodeId(nodeId);

    if(device.location != '') {
      let room = this.getRoomById(device.location).getDeviceManager().remove(object.nodeId);
    }

    if(roomId != '') {
      this.getRoomById(roomId).getDeviceManager().add(device);
    }
    device.setLocation(roomId);
  }

  launch(rooms) {
    this.addRooms(rooms);

    /*ava.zwaveGateway.on('zwave:new', (object) => {
      if(object.location != '') {
        this.getRoomById(object.location).deviceManager.add(object);
      }

      //Socket here
    });

    ava.zwaveGateway.on('zwave:removed', (object) => {
      if(object.location != '') {
        this.getRoomById(object.location).deviceManager.remove(object.nodeId);
      }

      //Socket here
    });*/
  }
}

module.exports = HomeService;