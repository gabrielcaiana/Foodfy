const chefs = require("../models/chefs");

module.exports = {
  index(req, res) {
    return res.render("pages/site/chefs");
  },
  admin_index(req, res) {
    return res.render("pages/admin/chefs/chefs");
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

    console.log(req.body)

    chefs.create(req.body, () => {
      return res.redirect("/admin/chefs")
    })
  },
};
