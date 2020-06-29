const express = require("express")
const routes = express.Router()
const data_recipes = require('./data')
const recipes = require('./controllers/recipes')

routes.get('/',function (req, res) {
    return res.render('pages/index', {data_recipes})
})

routes.get('/about', (req, res) => {
    res.render('pages/about') 
})

routes.get('/recipes', recipes.index)
routes.get('/:id', recipes.url_recipe)
// routes.get('/recipes/create', adm_recipes.create)
// routes.get('/recipes/:id', adm_recipes.edit)
// routes.get('/recipes/:id/edit', adm_recipes.edit)

// routes.post('/recipes', adm_recipes.post)
// routes.put('/recipes', adm_recipes.put)
// routes.delete('/recipes', adm_recipes.delete)

routes.get('*', (req, res) => {
    res.render('pages/page404')
})

module.exports = routes