'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Boardgames', [
     {gameName: 'Gloomhaven', maxPlayers: 3},
     {gameName: 'Pandemic Legacy: Season 1', maxPlayers: 4},
     {gameName: 'Brass: Birmingham', maxPlayers: 6},
     {gameName: 'Terraforming Mars', maxPlayers: 5},
     {gameName: 'Twilight Imperium: Fourth Edition', maxPlayers: 6},
     {gameName: 'Spirit Island', maxPlayers: 8},
     {gameName: 'Mage Knight', maxPlayers: 7},
     {gameName: 'Rising Sun', maxPlayers: 5},
     {gameName: 'Mystic Vale', maxPlayers: 4},
     {gameName: 'Wingspan', maxPlayers: 5},
     {gameName: 'Terra Mystica', maxPlayers: 5}
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('Boardgames', {
    //   where: {
    //     name: ['Gloomhaven'] // WHERE name =
    //   }
    // })
    await queryInterface.bulkDelete('Boardgames', null)  // DELETE FROM Boardgames
  }
};
