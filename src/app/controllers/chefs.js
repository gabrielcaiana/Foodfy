const db = require("../../config/db");
const { findRecipe } = require("../models/chefs");
const chefs = require("../models/chefs");

module.exports = {
  index(req, res) {
    db.query(
      `SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY chefs.id
      ORDER BY total_recipes DESC`,
      (err, results) => {
        if (err) throw `Databse error ${err}`;
        return res.render("pages/site/chefs", { chefs: results.rows });
      }
    );
  },
  admin_index(req, res) {
    db.query(`SELECT * FROM chefs`, (err, results) => {
      if (err) throw `Databse error ${err}`;

      return res.render("pages/admin/chefs/chefs", { chefs: results.rows });
    });
  },
  async show(req, res) {
    const { id } = req.params

    let recipes = await  chefs.chefRecipe(id);

    chefs.find(id, (chef) => {
      if(!chef) res.send("Chef not found")
      return res.render("pages/admin/chefs/show", { chef, recipes });
    })

  },
  create(req, res) {
    return res.render("pages/admin/chefs/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    chefs.create(req.body, () => {
      return res.redirect("/admin/chefs");
    });
  },
  edit(req, res) {
    const id = req.params.id;
    chefs.find(id, (chef) => {
      if (!chef) return res.send(`Chef not found!`);

      return res.render("pages/admin/chefs/edit", { chef });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    chefs.update(req.body, () => {
      return res.redirect(`/admin/chefs/${req.body.id}`);
    });
  },
  delete(req, res) {
    chefs.delete(req.body.id, () => {
      return res.redirect("/admin/chefs");
    });
  },
};
