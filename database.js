const Sequelize = require('sequelize');

class Database {
  constructor() { }

  init(config, models) {
    return new Promise((resolve, reject) => {
      this.sequelize = new Sequelize(config.get('orm:database'), config.get('orm:user'), config.get('orm:password'), {
        host: config.get('orm:host'),
        dialect: config.get('orm:dialect'),
        logging: false
      });

      this.sequelize.authenticate().then(() => {
        this.models = {};
        for(let modelName in models) {
          let model = models[modelName];
          this.models[model.name] = this.sequelize.define(model.name, model.attributes);
        }

        for(let modelName in models) {
          let model = models[modelName];
          let relations = model.relations;

          for(let relation of relations) {
            this.models[model.name][relation.name](this.models[relation.table], relation.association);


            let name = modelName.split('.')[0];
            global[name.charAt(0).toUpperCase() + name.slice(1)] = this.models[model.name];
          }
        }

        this.sequelize.sync().then(resolve).catch(reject);
      }).catch(reject);
    });
  }
}
module.exports = Database;
