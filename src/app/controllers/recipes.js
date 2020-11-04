const db = require("../../config/db");
const recipe = require("../models/recipe");

module.exports = {
  index(req, res) {
    db.query(`SELECT * FROM recipes`, (err, results) => {
      if (err) throw `Database error! ${err}`;
      return res.render("pages/site/index", {recipes: results.rows});
    })
  },
  recipes(req, res) {
    db.query(`SELECT * FROM recipes`, (err, results) => {
      if (err) throw `Database error! ${err}`;
      return res.render("pages/site/recipes", {recipes: results.rows});
    })
  },
  url_recipe(req, res) {
    const id = req.params.id
    recipe.find(id, (recipes) => {
      if(!recipes) return res.send("Recipes not found!")
      
      return res.render("pages/site/myRecipe", {recipes});
    })
  },
  adm_index(req, res) {
    db.query(`SELECT * FROM recipes`, (err, results) =>  {
      if (err) throw `Database error! ${err}`;
      return res.render("pages/admin/index", {recipes: results.rows});
    })
  },
  show(req, res) {
    return;
  },
  edit(req, res) {
    return;
  },
  create(req, res) {
    return res.render("pages/admin/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    recipe.create(req.body, () => {
      return res.redirect("/admin/recipes");
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields!");
      }
    }
  },
  delete(req, res) {
    return;
  },
};
