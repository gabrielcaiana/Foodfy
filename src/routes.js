const express = require("express")
const routes = express.Router()
const recipes = require('./app/controllers/recipes')
const chefs = require("./app/controllers/chefs")

routes.get('/', recipes.index);

routes.get('/about', (req, res) => {
    res.render('pages/site/about');
})
routes.get('/recipes', recipes.recipes);
routes.get("/chefs", chefs.index);

routes.get('/:id', recipes.url_recipe);

routes.get("/admin/recipes", recipes.adm_index);
routes.get("/admin/recipes/create", recipes.create); 
routes.get("/admin/recipes/:id", recipes.show); 
routes.get("/admin/recipes/:id/edit", recipes.edit); 
routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

routes.get("/admin/chefs", chefs.admin_index);
routes.get("/admin/chefs/create", chefs.create);
routes.post("/admin/chefs", chefs.post);
// routes.get("admin/chefs/:id", chefs.show);
// routes.get("admin/chefs/:id/edit", chefs.edit);
// routes.put("admin/chefs", chefs.put);
// routes.delete("admin/chefs", chefs.delete);

routes.get('*', (req, res) => {
    // return res.render('pages/404')
    return res.send("404")
})

module.exports = routes