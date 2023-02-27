require('dotenv').config()  
const express = require('express');
const app = express();
const boardgamesRouter = require('./routes/boardgames')


app.use(express.json())  // this gives us req.body
const data = require('./data')

// app.use((req, res, next) => {
    // console.log(process.env.SECRET_MESSAGE)
//     next()
// })


// app.use(express.static('assets'))
// app.use(express.static('assets/css')) // /css/css/styling.css
app.use('/banana', express.static('assets/css')) // /styling.css

app.use('/boardgames', boardgamesRouter)

app.get('/test', (req, res) => {
    res.send('Your app is live') // res.json
})


app.use('/', (req, res, next) => {
    const err = new Error('We could not find the requested page')
    err.statusCode = 404
    next(err)
})

app.use((err, req, res, next) => {
    console.log(err)
    let status = err.statusCode || 500
    res.status(status)
    res.json({
        status: status,
        message: err.message,
        errors: err.errors || 'See error message'
    })
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))

module.exports = data