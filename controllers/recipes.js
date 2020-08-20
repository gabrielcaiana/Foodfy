const recipes = require("../data.json");

//SITE
exports.index = function (req, res) {
  return res.render("pages/site/index", { recipes }.recipes);
};
exports.recipes = (req, res) => {
  res.render("pages/site/recipes", { recipes }.recipes);
};
exports.url_recipe = (req, res) => {
  const recipeId = req.params.id;

  const myRecipe = recipes.recipes.find(function (myRecipe) {
    if (myRecipe.id == recipeId) {
      return true;
    }
  });

  if (!myRecipe) {
    return res.render("404");
  }

  return res.render("pages/site/myRecipe", { myRecipe });
};

//ADMIN
exports.adm_index = (req, res) => {
  res.render("pages/admin/index", { recipes }.recipes);
};

exports.show = (req, res) => {
  const {id} = req.params

  const myRecipe = recipes.recipes.find(function (myRecipe) {
    if (myRecipe.id == id) {
      return true;
    }
});
    if (!myRecipe) {
      return res.render("404");
    }
    return res.render("pages/admin/show", { myRecipe });
};  

exports.edit = (req, res) => {
  // const {id} = req.params

  // const foundRecipe = recipes.recipes.find(function(recipe) {
  //   return recipes.id == id
  // })

  // const recipe = {
  //   ...foundRecipe
  // }

  // if(!foundRecipe) {
  //   return res.render('404')
  // }

  return res.render('pages/admin/edit')
}
