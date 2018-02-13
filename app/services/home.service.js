//const ZwaveObject = require('../class/ZwaveObject');
const DeviceManager = require('../class/DeviceManager');


class HomeService {
  constructor() {
    this.deviceManager = new DeviceManager();
    this.rooms = [];
  }

  /**
   *
   * @param room
   * @returns {*}
   */
  addRoom(room) {
    room.deviceManager = new DeviceManager();
    this.rooms.push(room);

    return room;
  }

  /**
   *
   * @param roomId
   */
  removeRoom(roomId) {
    for(let i = 0; i < this.rooms.length; i++) {
      let room = this.rooms[i];

      if(room._id == roomId) {
        for(let device of room.deviceManager.devices) {
          device.setLocation('');
        }

        this.rooms.splice(i, 1);
        return;
      }
    }
  }

  /**
   *
   * @param rooms
   */
  addRooms(rooms) {
    for(let room of rooms) {
      this.addRoom(room);
    }
  }

  /**
   *
   * @returns {Array}
   */
  getRooms() {
    return this.rooms;
  }

  /**
   *
   * @param roomId
   * @returns {*}
   */
  getRoomById(roomId) {
    for(let room of this.rooms) {
      if(room._id == roomId) {
        return room;
      }
    }
  }

  /**
   *
   * @param roomId
   * @returns {Array}
   */
  getObjectsByRoom(roomId) {
    return this.getRoomById(roomId).deviceManager.devices;
  }

  /**
   *
   * @param nodeId
   * @param roomId
   */
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

  /**
   *
   * @param rooms
   */
  launch(rooms) {
    this.addRooms(rooms);

    ava.hotSpotGateway.on('connection', (device) => { this.onDeviceConnected(device) });

    ava.hotSpotGateway.on('disconnect', (device) => { this.onDeviceDisconnected(device) });

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

  onDeviceConnected(device) {
    if(device.location != '') {
      this.getRoomById(device.location).deviceManager.add(device);
    }
    this.deviceManager.add(device);
  }

  onDeviceDisconnected(device) {
    if(device.location != '') {
      this.getRoomById(device.location).deviceManager.remove(device.nodeId);
    }
    this.deviceManager.remove(device.nodeId);
  }
}

module.exports = HomeService;