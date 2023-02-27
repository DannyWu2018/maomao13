'use strict';
const { Op } = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boardgame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Boardgame.hasMany(models.Review, { foreignKey: 'gameId'})
      // FROM Boardgames JOIN Reviews ON (reviews.gameId = boardgames.id)

      Boardgame.belongsToMany(models.Genre, {
        through: models.GenreBoardgame, // 'GenreBoardgames'
        foreignKey: 'boardgameId', // FROM Boardgames JOIN GenreBoardgames ON (boardgames.id = genreboardgames.boardgameId)
        otherKey: 'genreId' // JOIN Genres ON (genres.id = genreboardgames.genreId)
      })

      Boardgame.hasMany(models.GenreBoardgame, {foreignKey: 'boardgameId', onDelete: 'CASCADE', hooks: true})
    }
  }
  Boardgame.init({
    gameName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
        // isAGameILike(value) { // Can refer to other properties using this.otherPropertyName
        //   if (value.charAt(0) !== 'D') {
        //     throw new Error('Only games I like can be added to the DB')
        //   }
        // }
      }
    },
    maxPlayers: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        max: 10,
        min: 1
      }
    },
    // genre: {
    //   allowNull: false,
    //   type: DataTypes.STRING
    // }
  }, {
    sequelize,
    modelName: 'Boardgame',
    defaultScope: {
      // attributes: ['gameName', 'maxPlayers']
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    scopes: {
      bigGames: {
        where: {
          maxPlayers: {
            [Op.gte]: 6
          }
        }
      },
      getReviews(rating) {
        const {Review} = require('../models')
        return {
          include: {
            model: Review,
            where: {
              rating: {
                [Op.gte]: rating
              }
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        }
      }
    }
  });
  return Boardgame;
}; 