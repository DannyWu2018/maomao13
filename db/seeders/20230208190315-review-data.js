'use strict';
const {Boardgame} = require('../models')

let reviewData =
  [{ reviewer: 'Alec', comment: 'This game is sweet', rating: 10, gameName: 'Spirit Island' },
  { reviewer: 'Dan', comment: '2gloomy4me', rating: 5, gameName: 'Gloomhaven' },
  { reviewer: 'Olivia', comment: `Even though it's co-op, it's pretty fun`, rating: 7, gameName: 'Spirit Island' },
  { reviewer: 'Nate', comment: 'Animals are lame and so are animal board games', rating: 1, gameName: 'Wingspan' },
  { reviewer: 'David', comment: 'Honestly, too soon.', rating: 10, gameName: 'Pandemic Legacy: Season 1' },
  { reviewer: 'Franco', comment: 'I can be a space pirate, enough said', rating: 9, gameName: 'Twilight Imperium: Fourth Edition' }]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  for (let i = 0; i < reviewData.length; i++) {
    const review = reviewData[i];
    const game = await Boardgame.findOne({
      where: {gameName: review.gameName}
    })
    await game.createReview({
      reviewer: review.reviewer,
      comment: review.comment,
      rating: review.rating
    })
  }    

  //  await queryInterface.bulkInsert('Reviews', [
  //    { reviewer: 'Alec', comment: 'This game is sweet', rating: 10, gameId: 6 },
  //    { reviewer: 'Dan', comment: '2gloomy4me', rating: 5, gameId: 1 },
  //    { reviewer: 'Olivia', comment: `Even though it's co-op, it's pretty fun`, rating: 7, gameId: 6 },
  //    { reviewer: 'Nate', comment: 'Animals are lame and so are animal board games', rating: 1, gameId: 10 },
  //    { reviewer: 'David', comment: 'Honestly, too soon.', rating: 5, gameId: 2 },
  //    { reviewer: 'Franco', comment: 'I can be a space pirate, enough said', rating: 9, gameId: 5 }
  //  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null)
  }
};
