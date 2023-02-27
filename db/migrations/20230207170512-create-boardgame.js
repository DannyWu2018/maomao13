'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Boardgames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameName: {
        allowNull: false, //NOT NULL
        type: Sequelize.STRING(50),
        // unique: true // UNIQUE
      },
      maxPlayers: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Boardgames');
  }
};

// CREATE TABLE Boardgames (
//   id,
//   name VARCHAR NOT NULL UNIQUE,
//   maxPlayers
// )