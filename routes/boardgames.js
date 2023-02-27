const express = require('express')
const router = express.Router()

const { Boardgame, Review, Genre, sequelize } = require('../db/models')
const { Op } = require("sequelize");

// Find all board games
// Order by gameName
// Include review rating average
// Include board game genres
router.get('/scopes', async(req, res) => {
    const result = await Boardgame.scope(['defaultScope', {
        method: ['getReviews', 5]
    }]).findAll()

    res.send(result)
})

router.get('/', async(req, res) => {
    const games = await Boardgame.findAll({
        include: {
            model: Genre,
            attributes: ['genre'],
            through: {
                attributes: []
            }
        },
        order: [['gameName'], [Genre, 'genre']]
    })

    let payload = []
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        let gameJson = game.toJSON()
        const gameRating = await Review.findOne({
            where: {
                gameId: game.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
            ]
        })
        let rating = gameRating.dataValues.avgRating
        if (!rating) {
            gameJson.avgRating = 'No reviews yet'
        } else {
            gameJson.avgRating = rating
        }
        // console.log(gameJson)
        payload.push(gameJson)
    }

    res.json({Games: payload})
})

router.get('/:id(\\d+)', async(req, res, next) => {
    const game = await Boardgame.findByPk(req.params.id, {
        include: {
            model: Review
        },
        order: [[Review, 'rating', 'DESC']]
    })
    if (!game) {
        const err = new Error(`Game with an id of ${req.params.id} does not exist :(`)
        err.statusCode = 404
        return next(err)
    }
    res.json(game)
})

// Create new Boardgame
// Also add Genre join table records
    // body:
    // gameName, maxPlayers, genreStrings array

const gameCheck = (req, res, next) => {
    let errors = []
    if (!req.body.gameName) {
        errors.push('Game Name is required')
    }
    if (!req.body.maxPlayers) {
        errors.push('Max Player count is required')
    }
    if (errors.length > 0) {
        const err = new Error('Invalid user input')
        err.statusCode = 400
        err.errors = errors
        return next(err)
    }
    next()
}

router.post('/', gameCheck, async(req, res) => {
    const {gameName, maxPlayers, genreNames} = req.body

    const newGame = await Boardgame.create({
        gameName,
        maxPlayers
    })

    const genreList = await Genre.findAll({
        where: {
            genre: genreNames
        }
    })
    let genreIds = []
    for (let i = 0; i < genreList.length; i++) {
        const genre = genreList[i].toJSON();
        genreIds.push(genre.id)
    }
    
    await newGame.addGenres(genreIds)
    let gameId = newGame.toJSON().id
    const createdGame = await Boardgame.findByPk(gameId, {
        include: {
            model: Genre,
            attributes: ['genre'],
            through: {
                attributes: []
            }
        }
    })

    res.json({
        message: "Game successfully added to the database :)",
        game: createdGame
    })
})

const checkUpdateInput = (req, res, next) => {
    let errors = []
    if (!req.body.gameName && !req.body.maxPlayers) {
        errors.push('To update a game, please provide a new game name or max players value')
    }
    if (req.body.maxPlayers > 10 || req.body.maxPlayers < 1) {
        errors.push('Please provide a max players value between 1 and 10')
    }
    if (errors.length > 0) {
        const err = new Error('Something went wrong')
        err.statusCode = 400
        err.errors = errors
        return next(err)
    }
    next()
}

// gameName and/or maxPlayers
router.put('/:id', checkUpdateInput, async(req, res, next) => {
    const {gameName, maxPlayers} = req.body
    const gameToUpdate = await Boardgame.findByPk(req.params.id)

    if (!gameToUpdate) {
        const err = new Error(`Game with an id of ${req.params.id} does not exist :(`)
        err.statusCode = 404
        return next(err)
    }

    if (gameName) {
        gameToUpdate.set({
            gameName
        })
    }
    if (maxPlayers) {
        gameToUpdate.set({
            maxPlayers
        })
    }
    await gameToUpdate.save()

    res.json({
        message: `Successfully updated game with an id of ${req.params.id}`,
        game: gameToUpdate
    })
})

router.delete('/:id', async(req, res, next) => {
    const game = await Boardgame.findByPk(req.params.id)

    if (!game) {
        const err = new Error(`Game with an id of ${req.params.id} does not exist :(`)
        err.statusCode = 404
        return next(err)
    }

    try {
        
        await game.destroy()
    } catch (error) {
        console.log(error)
    }
    res.json({
        message: `The board game with an id of ${req.params.id} has been deleted`
    })
})

const getPagination = (queryParams) => {
    let { page, size } = queryParams;
    if (!page) page = 1;
    if (!size) size = 5;
    const pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }
    return pagination
}

// Pagination: req.query.page, req.query.size
// Search Params: req.query.gameName, req.query.minPlayers, req.query.genre
    // Check for each param individually
    // Conditionally add each param to query
        // Will need to pre-define query object to conditionally build onto
    // Refactor pagination to add its properties to query object
router.get('/search', async(req, res) => {
    let query = {
        where: {},
        include: []
    }

    // extract page/size 
    let {page, size} = req.query
    // let pagination = {}

    // set default values if none are provided
    if (!page) page = 1
    if (!size) size = 3

    // check if values given are greater than 0
    // if values are 0 or less, query for ALL games
    if (parseInt(page) >= 1 && parseInt(size) >= 1) {
        query.limit = size
        // calculate offset value
        query.offset = size * (page - 1)
    }

    if (req.query.gameName) {
        query.where.gameName = req.query.gameName
    }

    if (req.query.minPlayers) {
        query.where.maxPlayers = {
            [Op.gte]: req.query.minPlayers
        }
    }

    if (req.query.genre) {
        let includeObj = {
            model: Genre,
            where: {
                genre: req.query.genre
            }
        }
        query.include.push(includeObj)
    }


    const games = await Boardgame.findAll(query)
    res.json({games})
})

module.exports = router;