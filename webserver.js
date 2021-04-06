const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000
const path = require('path')
const fs = require('fs')

rozvrhJson = path.join('C:/HTML/jojo/views')

app.locals.rozvrhdata = require('./views/rozvrh.json')

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/json', express.static(path.join(__dirname, 'views')));


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/rozvrh', (req, res) => {
    res.render('rozvrh')
})

app.get('/ulohy', (req, res) => {
    res.render('ulohy')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})