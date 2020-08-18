const express = require("express")
const routes = express.Router()
const data_recipes = require('./data.json')
const recipes = require('./controllers/recipes')

routes.get('/', recipes.index)

routes.get('/about', (req, res) => {
    res.render('pages/site/about') 
})

routes.get('/recipes', recipes.recipes)
routes.get('/:id', recipes.url_recipe)

routes.get("/admin/recipes", recipes.adm_index); // Mostrar a lista de receitas
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
// routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
// routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
// routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita 

// routes.get('*', (req, res) => {
//     res.render('pages/page404')
// })

module.exports = routes