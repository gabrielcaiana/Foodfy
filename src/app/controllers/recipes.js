const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    db.query(`SELECT * FROM recipes`, function(err, results) {
      if (err) throw `Database error! ${err}`;
      return res.render("pages/site/index", {recipes: results.rows});
    })
  },
  recipes(req, res) {
    res.render("pages/site/recipes");
  },
  url_recipe(req, res) {
    return;
  },
  adm_index(req, res) {
    res.render("pages/admin/index");
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
        return res.send("Please, fill all fields!");
      }
    }

    const {
      title,
      image,
      ingredients,
      preparation,
      information
    } = req.body;

    const query = `
    INSERT INTO recipes (
      title,
      image,
      ingredients,
      preparation,
      information,
      created_at
    )VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `;

    const values = [
      title,
      image,
      ingredients,
      preparation,
      information,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error! ${err}`;

      return res.redirect("pages/admin/index");
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
