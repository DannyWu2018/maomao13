const express = require('express')
const router = express.Router()
// const data = require('../data')

const {Boardgame, Review, Genre, sequelize} = require('../db/models')

router.get('/test', async (req, res) => {
    let game = Boardgame.build({
        name: 'Monopoly',
        maxPlayers: 4
    })
    // INSERT INTO Boardgames (name, maxPlayers) VALUES ('Monopolyyyyy', 4);
    game.validate()

    await game.save()

    res.json(game)
})

// For testing adder methods
router.get('/add/:id', async(req, res) => {
    // Create a new review based on a board game instance
    const game = await Boardgame.findByPk(req.params.id)
    // // req.body
    // const review = await game.createReview(req.body)
    // res.json({review})

    // Build a relationship between a board game and any number of genres
    await game.addGenre(req.body.genreIds)
    res.send('added genres')
})


// For testing aggregates
router.get('/agg', async(req, res) => {
// agg methods on models/class methods
    // count, sum, max, min
    const numGames = await Boardgame.count()

    const lowestReview = await Review.min('rating')

    // SELECT AVG(rating) FROM Reviews
    const reviews = await Review.findAll({
        // attributes: [
        //     'comment',
        //     'rating',
        //     [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
        // ],
        attributes: {
            include: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']]
        }
        // include: {
        //     model: Boardgame,
        //     attributes: ['gameName']
        // }
    })

    res.json({
        reviews,
        lowestRating: lowestReview,
        numGames: numGames
    })
})



const { Op } = require("sequelize");


// // /boardgames
router.get('/', async(req, res) => {
    const games = await Boardgame.findAll({
        where: {
            gameName: {
                [Op.like]: 'T%'
            },
            // maxPlayers: 6
        },
        order: [['maxPlayers', 'DESC'], ['gameName', 'DESC']]
        // order: ['maxPlayers']
    })
    res.json({games})
})




router.get('/join', async(req, res) => {
    // const game = await Boardgame.findOne({
    //     where: {id: 6}
    // })

    // const reviews = await game.getReviews()

    // const review = await Review.findOne({
    //     where: {id: 1}
    // })
    // let game = await review.getBoardgame()
    // res.json({game, review})

    // const game = await Boardgame.findOne({
    //     where: {id: 6},
    //     // include: Review
    //     // include: {
    //     //     model: Review
    //     // }
    //     // include: [Review]
    //     include: [{model: Review}, {model: Genre}]
    // })

    // get review, get associated boardgame, get associated genres
    const review = await Review.findOne({
        where: {id: 1},
        // include: [Boardgame, Genre] //BAD D:
        include: {
            model: Boardgame,
            include: {model: Genre}
        }
    })

    res.json(review)
})


router.get('/assoc-test', async(req, res) => {
    const genre = await Genre.findOne({
        where: {id: 1},
        include: Boardgame
    })
    res.json(genre)
})








// const DATA_SOURCE = 'bg_db.db';

// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database(DATA_SOURCE, sqlite3.OPEN_READWRITE);

// router.post('/', async(req, res) => {

//     const {gameName, maxPlayers} = req.body

//     if (!gameName || !maxPlayers) {
//         res.send('please provide valid gameName and maxPlayers')
//     }

//     // create
//     // build + save

//     // const newGame = await Boardgame.create({
//     //     // gameName: gameName
//     //     gameName,
//     //     maxPlayers
//     // })

//     const newGame = Boardgame.build({
//         gameName,
//         maxPlayers
//     })
//     await newGame.save()

//     res.json(newGame)



//     // const {name, avg_rating, max_players, genre} = request.body

//     // const sql = 'INSERT INTO boardgames (name, avg_rating, max_players, genre) VALUES (?, ?, ?, ?);'
//     // const params = [name, avg_rating, max_players, genre]
//     // db.run(sql, params, (err) => {
//     //     if (err) {
//     //         response.send(err)
//     //     } else {
//     //         response.send('You built a board game')
//     //     }
//     // })
// })

// router.put('/:id', async(req, res) => {
//     // Boardgame.update({gameName: 'new value}, {id: req.params.id})
//     // query for record to update
//         // assigned property values, then invoke save()
//         // invoke set() on instance, provide k/v of new data, game.set({gameName: 'new value}), await instance.save()
//         // invoke .update on instance to immediately save the update to the DB without .save
//     const {gameName} = req.body
//     const game = await Boardgame.findByPk(req.params.id)

//     // game.gameName = gameName
//     // await game.save()
//     // game.set({gameName: gameName})
//     // await game.save()
//     await game.update({gameName: gameName})
//     res.json({updatedGame: game})
// })

// router.delete('/:id', async(req, res) => {
//     // Boardgame.destroy({where: {}})

//     const game = await Boardgame.findByPk(req.params.id)

//     await game.destroy()
//     res.json({message: "Your game was destroyed!"})
// })

// router.get('/', (req, res) => {
//     res.json({
//         ourBoardgames: data
//     })
// })

// //put, patch, delete
// //send, json, redirect, render

// // Taking in user input
// // req.body, req.query, req.params
// // /boardgames/search?name=Spirit Island
// router.get('/search', async(req, res, next) => {
//     console.log(req.query)
//     if (req.query.name) {
//         // findByPk, findOne, findAll
//         // .findByPk(req.params.id, {})
//         // .findOne({})  // ONLY returns one record
//         // .findAll({})  // Always returns an array
//         try {
//             let game = await Boardgame.findOne({
//                 where: {
//                     // gameName: req.query.name
//                     maxPlayers: 5
//                 }
//             })
//             res.json({
//                 // game: game
//                 game
//             })
//         } catch (err) {
//             console.log(err)
//         }
//     } else {
//         res.send('please include a name query parameter')
//     }
// })



// // /boardgames/banana
// // /boardgames/1
// // /boardgames/search

// // const checkData = (req, res, next) => {
// //     let index = req.params.id
// //     if (data.length - 1 < index) {
// //         return res.send('This game could not be found')
// //     }
// //     next()
// // }
// // let arr = [checkData]
// router.get('/:id', async(req, res) => {
//     console.log(req.params)

//     const game = await Boardgame.findByPk(req.params.id)
//     res.json(game)


//     // sql code, parameters, callback
//     // const sql = 'SELECT * FROM boardgames JOIN reviews ON (boardgames.id = reviews.boardgame_id) WHERE boardgames.id = ?;'
//     // const params = [req.params.id]
//     // db.all(sql, params, (err, rows) => {
//     //     console.log(err)
//     //     console.log(rows)
//     //     res.json(rows)
//     // })
// })

module.exports = router;