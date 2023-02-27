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
    let data = [
      {gameName: 'Spirit Island', genre: 'Strategy'},
      { gameName: 'Pandemic Legacy: Season 1', genre: 'Cooperative'},
      { gameName: 'Brass: Birmingham', genre: 'Economic'},
      { gameName: 'Terraforming Mars', genre: 'Economic'},
      { gameName: 'Terraforming Mars', genre: 'Strategy'},
      {gameName: 'Spirit Island', genre: 'Cooperative'},
    ]
   await queryInterface.bulkInsert('GenreBoardgames', [
    {boardgameId: 6, genreId: 1},
    {boardgameId: 2, genreId: 2},
    {boardgameId: 3, genreId: 3},
    {boardgameId: 4, genreId: 1},
    {boardgameId: 5, genreId: 1},
    {boardgameId: 6, genreId: 2},
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('GenreBoardgames', null)
  }
};
