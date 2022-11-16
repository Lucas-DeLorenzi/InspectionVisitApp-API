'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    static associate(models) {
      Visit.belongsTo(models.User)
      Visit.hasMany(models.ObservedValues)
    }
  }
  Visit.init({
    creationDate: DataTypes.DATE,
    finishDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Visit',
  });
  return Visit;
};