'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Boardgame, { foreignKey: 'gameId'}) // foreignKey: BoardgameId
    }
  }
  Review.init({
    reviewer: DataTypes.STRING,
    comment: DataTypes.TEXT,
    gameId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review; 
};