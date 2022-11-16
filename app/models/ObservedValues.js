'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ObservedValues extends Model {
    static associate(models) {
      ObservedValues.belongsTo(models.Visit);
      ObservedValues.belongsTo(models.User);
      ObservedValues.belongsTo(models.SubCategory);
    }
  }
  ObservedValues.init({
    value: DataTypes.BOOLEAN,
    observations: DataTypes.STRING,
    image: DataTypes.STRING,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ObservedValues',
  });
  return ObservedValues;
};