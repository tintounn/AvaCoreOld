const mongoose = require('mongoose');
var Schema = mongoose.Schema;

class Database {
  constructor() { }

  init(config, models) {
    mongoose.Promise = global.Promise;
    return mongoose.connect('mongodb://localhost:27017/ava', { useMongoClient: true }).then((connection) => {
      for(let modelName in models) {
        let model = models[modelName];

        let schema = new Schema(model.schema);
        for(let hook of model.hooks) {
          schema[hook.type](hook.action, hook.func);
        }

        global[model.name] = connection.model(model.name, schema);
      }

      this.connection = connection;
    });
  }
}
module.exports = Database;
