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
    // recipes.map((item, index) => item.index = index)
    return res.render('home', {recipes})
})

server.get('/recipes', function(req, res){
    res.render('recipes', {recipes})
})

server.get('/about', (req, res) => {
    res.render('about') 
})

server.get('/:id',(req, res) => { 
    const recipeId = req.params.id

    const myRecipe = recipes.find(function(myRecipe){
        if(myRecipe.id == recipeId) {
            return true
        }
    })

    if(!myRecipe) {
        return res.render('page404')
    }

    return res.render('myRecipe', {myRecipe})
})

server.get('*', (req, res) => {
    res.render('page404')
})

server.listen(2000, function () {
    console.log('Server running')
})