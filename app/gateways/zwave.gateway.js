const OZW = require('openzwave-shared');
const EventEmitter = require('events').EventEmitter;

const ZwaveObject = require('../class/ZwaveObject');

class ZwaveGateway extends EventEmitter {
  constructor(config, root) {
    super();

    this.zwave = new OZW({ConsoleOutput: true});
    this.zwave.connect(config.get('zwave'));

    this.objects = [];

    this.objectsConfig = require('require-all')(root + '/app/class/zwave');
  }

  listen() {
    this.zwave.on('node ready', (nodeId, nodeInfo) => {
      try {
        let object = new this.objectsConfig[ava.tools.replaceAll(nodeInfo.manufacturer, ' ', '_')][nodeInfo.productid](nodeId, nodeInfo);
        this.objects.push(object);

        this.emit('zwave:new', this.objects[this.objects.length - 1]);
      } catch(e) {
        console.log(e);
      }
    });

    this.zwave.on('value refreshed', (nodeId, commandClass, valueId) => {
      let device = this.getObjectByNodeId(nodeId);
      //TODO: A faire en prio
    });

    this.zwave.on('node removed', (nodeId) => {
      for(let i = 0; i < this.objects.length; i++) {
        if(this.objects[i].nodeId == nodeId) {
          let object = this.objects[i];
          this.emit('zwave:removed', object);

          this.objects.splice(i, 1);
        }
      }
    });
  }

  sendValue(nodeId, classId ,instance, index, value) {
    this.zwave.setValue(nodeId, classId, instance, index, value);
  }

  setNodeLocation(nodeId, location) {
    this.zwave.setNodeLocation(nodeId, location);
  }

  getObjectByNodeInfo(prop, value) {
    let objects = [];
    for(let object of this.objects) {
      if(object.nodeInfo[prop] == value) {
        objects.push(object);
      }
    }

    return objects;
  }

  getObjectByNodeId(nodeId) {
    for(let object of this.objects) {
      if(object.nodeId == nodeId) return object;
    }
  }

  softReset() {
    this.zwave.softReset();
  }

  hardReset() {
    this.zwave.hardReset();
  }

  heal() {
    this.zwave.healNetwork();
  }
}

module.exports = ZwaveGateway;