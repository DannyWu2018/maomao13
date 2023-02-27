const express = require('express')
const app = express()

app.use('/', (req, res, next) => {
    console.log(`path: ${req.path}`)
    next()
})

app.use((req, res, next) => {
    console.log('no path needed')
    next()
})

app.use('/info', (req, res, next) => {
    console.log(`${req.path} starts with "/info"`)
    next()
})
app.use((req, res, next) => {
    console.log(req.path)
    next()
})

app.get('/test', (req, res, next) => {
    res.send('This is a test route')
    // next()
})

app.get('/info/data', (req, res) => {
    res.send('Here is your data')
})
app.use((req, res, next) => {
    console.log('Almost at the end...')
    next()
})

app.get('/test', (req, res) => {
    res.send('You should not be here???')
})

app.listen(8000, () => 'Listening on port 8000...')