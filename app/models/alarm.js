const sequelize = require('sequelize');

module.exports = {
  name: "alarms",
  attributes: {
    id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: sequelize.STRING},
    time: {type: sequelize.STRING},
    days: {type: sequelize.STRING},
    roomId: {type: sequelize.INTEGER}
  },
  relations: [
    {name: 'belongsTo', table: 'rooms', association: {foreignKey: 'roomId', targetKey: 'id'}}
  ]
};