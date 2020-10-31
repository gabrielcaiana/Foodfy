const express = require("express")
const routes = express.Router()
const recipes = require('./app/controllers/recipes')

routes.get('/', recipes.index)

routes.get('/about', (req, res) => {
    res.render('pages/site/about') 
})

routes.get('/recipes', recipes.recipes)
routes.get('/:id', recipes.url_recipe)

routes.get("/admin/recipes", recipes.adm_index);
routes.get("/admin/recipes/create", recipes.create); 
routes.get("/admin/recipes/:id", recipes.show); 
routes.get("/admin/recipes/:id/edit", recipes.edit); 

routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

// routes.get('*', (req, res) => {
//     res.render('pages/page404')
// })

module.exports = routes