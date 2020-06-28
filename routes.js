const express = require("express")
const routes = express.Router()
const recipes = require('./data')
const adm_recipes = require('./controllers/recipes')

routes.get('/',function (req, res) {
    return res.render('pages/index', {recipes})
})

routes.get('/about', (req, res) => {
    res.render('pages/about') 
})

routes.get('/recipes', adm_recipes.index)
routes.get('/:id', adm_recipes.url_recipe)

routes.get('*', (req, res) => {
    res.render('pages/page404')
})

module.exports = routes