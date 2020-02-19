const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

const recipes = require('./data')

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.use(express.static('public'))

server.get('/', function (req, res) {
    return res.render('layout')
})

server.get('/recipesHome', function(req,res){
    return res.render('recipesHome', {recipes})
})

server.listen(2000, function () {
    console.log('Server running')
})