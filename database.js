const mongoose = require('mongoose');

class Database {
  constructor() { }

  init(config, models) {
    mongoose.Promise = global.Promise;
    return mongoose.connect('mongodb://localhost:27017/ava', { useMongoClient: true }).then((connection) => {
      for(let modelName in models) {
        let model = models[modelName];
        global[modelName.charAt(0).toUpperCase() + modelName.slice(1)] = connection.model(model.name, model.schema);
      }

      this.connection = connection;
    });
  }
}
module.exports = Database;
