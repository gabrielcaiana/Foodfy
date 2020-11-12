const db = require("../../config/db");
const recipe = require("../models/recipe");

module.exports = {
  index(req, res) {
    db.query(`SELECT * FROM recipes`, (err, results) => {
      if (err) throw `Database error! ${err}`;
      return res.render("pages/site/index", { recipes: results.rows });
    });
  },
  recipes(req, res) {
    db.query(`SELECT * FROM recipes`, (err, results) => {
      if (err) throw `Database error! ${err}`;
      return res.render("pages/site/recipes", { recipes: results.rows });
    });
  },
  url_recipe(req, res) {
    const id = req.params.id;
    recipe.find(id, (recipes) => {
      if (!recipes) return res.send("Recipes not found!");

      return res.render("pages/site/myRecipe", { recipes });
    });
  },
  adm_index(req, res) {
    db.query(`SELECT * FROM recipes`, (err, results) => {
      if (err) throw `Database error! ${err}`;
      return res.render("pages/admin/recipes/index", { recipes: results.rows });
    });
  },
  show(req, res) {
    const id = req.params.id;
    recipe.find(id, (recipes) => {
      if (!recipes) return res.send("Recipes not found!");

      return res.render("pages/admin/recipes/show", { recipes });
    });
  },
  create(req, res) {
    recipe.chefsSelectOptions((options) => {
      return res.render("pages/admin/recipes/create", {
        create: true,
        chefsSelectOptions: options,
      });
    });
  },
  edit(req, res) {
    recipe.chefsSelectOptions((options) => {
      recipe.find(req.params.id, (recipe) => {
        if (!recipe) return res.send("Recipes not found!");
        return res.render("pages/admin/recipes/edit", {
          chefsSelectOptions: options,
          recipe,
        });
      });
    });
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

    recipe.update(req.body, () => {
      return res.redirect(`/admin/recipes/${req.body.id}`);
    });
  },
  delete(req, res) {
    recipe.delete(req.body.id, () => {
      res.redirect("/admin/recipes");
    });
    return;
  },
};
