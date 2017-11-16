const sequelize = require('sequelize');

module.exports = {
  name: "folders",
  attributes: {
    id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: sequelize.STRING},
    parent: {type: sequelize.INTEGER}
  },
  relations: [
    {name: 'belongsTo', table: 'folders', association: {foreignKey: 'parent', targetKey: 'id'}},
    {name: 'hasMany', table: 'folders', association: {foreignKey: 'folderId', sourceKey: 'id'}},
    {name: 'hasMany', table: 'files', association: {foreignKey: 'folderId', sourceKey: 'id'}}
  ]
};