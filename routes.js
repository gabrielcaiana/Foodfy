const express = require("express")
const routes = express.Router()
const recipes = require('./data')
const index = require('./controllers')

routes.get('/', index.index)

routes.get('/recipes', function(req, res){
    res.render('pages/recipes', {recipes})
})

routes.get('/about', (req, res) => {
    res.render('pages/about') 
})

routes.get('/:id',(req, res) => { 
    const recipeId = req.params.id

    const myRecipe = recipes.find(function(myRecipe){
        if(myRecipe.id == recipeId) {
            return true
        }
    })

    if(!myRecipe) {
        return res.render('pages/page404')
    }

    return res.render('recipes/myRecipe', {myRecipe})
})

routes.get('*', (req, res) => {
    res.render('pages/page404')
})

module.exports = routes