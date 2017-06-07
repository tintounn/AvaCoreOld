const ZwaveObject = require('../class/ZwaveObject');

class HomeService {
  constructor() {
    this.rooms = [];
  }

  addRoom(room) {
    this.rooms.push(room);
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
        room.objects = this.getObjectsByRoom(roomId);
        return room;
      }
    }
  }

  getObjectsByRoom(roomId) {
    return ava.zwaveGateway.getObjectByNodeInfo('loc', roomId);
  }

  setObjectLocation(nodeId, roomId) {
    return ava.zwaveGateway.getObjectByNodeId(nodeId).setLocation(roomId);
  }

  launch(rooms) {
    this.addRooms(rooms);

    ava.zwaveGateway.on('zwave:new', (object) => {
      if(object.location != '') {
        //Socket here
      }
    });

    ava.zwaveGateway.on('zwave:removed', (object) => {
      //Socket here
    });
  }
}

module.exports = HomeService;