const sequelize = require('sequelize');

module.exports = {
  name: "rooms",
  attributes: {
    id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: sequelize.STRING},
    image: {type: sequelize.STRING},
  },
  relations: [
    {name: 'hasMany', table: 'alarms', association: {foreignKey: 'roomId', sourceKey: 'id'}}
  ]

};