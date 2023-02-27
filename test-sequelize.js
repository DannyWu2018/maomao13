require('dotenv').config()
const {Boardgame} = require('./db/models')

let testFunc = async() => {
    let game = Boardgame.build({
        name: "DScythe",
        maxPlayers: 5
    })
    game.validate()
    console.log(game)
    await game.save()
}

testFunc()