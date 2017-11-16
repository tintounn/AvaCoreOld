const sequelize = require('sequelize');

module.exports = {
  name: "files",
  attributes: {
    id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: sequelize.STRING},
    size: {type: sequelize.INTEGER},
    image: {type: sequelize.STRING},
    folderId: {type: sequelize.INTEGER}
  },
  relations: [
    {name: 'belongsTo', table: 'folders', association: {foreignKey: 'folderId', targetKey: 'id'}},
  ]
};