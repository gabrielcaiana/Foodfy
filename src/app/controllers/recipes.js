module.exports = {
  index(req, res) {
    return res.render("pages/site/index");
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
