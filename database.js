const mongoose = require('mongoose');

class Database {
  constructor() { }

  init(config, models) {
    mongoose.Promise = global.Promise;
    this.connection = mongoose.connect('mongodb://localhost:27017/ava', { useMongoClient: true });

    for(let modelName in models) {
      let model = models[modelName];
      global[modelName.charAt(0).toUpperCase() + modelName.slice(1)] = this.connection.model(model.name, model.schema);
    }
  }
}
module.exports = Database;
