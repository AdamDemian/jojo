const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000
const path = require('path')
const fs = require('fs')

const ppm = require('jsonfile')

// const rozvrhJson = '{"rozvrhJson" : "' + ppm.RTPPMDataMsgV1.rozvrhJson + '"}';

// console.log(jsonfile.readFileSync(rozvrhJson))


app.use('/dist', express.static(path.join(__dirname, 'dist')));
const rozvrhJson = app.use('/', express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
    res.send(rozvrhJson);
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