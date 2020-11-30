const db = require("../../config/db");
const recipe = require("../models/recipe");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        if(filter) {
          return res.render("pages/site/search", {recipes, filter, pagination})
        }else {
          return res.render("pages/site/index", {recipes, filter, pagination});
        }
      }
    };
    recipe.pagination(params)
  },
  recipes(req, res) {
    db.query(`SELECT chefs.name, recipes.* FROM recipes
    LEFT JOIN chefs on (chefs.id = recipes.chef_id)`, (err, results) => {
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
