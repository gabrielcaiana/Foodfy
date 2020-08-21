const recipes = require("../data.json");  
const fs = require('fs')

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
  const {id} = req.params

  const foundRecipe = recipes.recipes.find(function(recipe) {
    return recipe.id == id
  })
      const recipe = {
        ...foundRecipe,
        // ingredients: foundRecipe.ingredients.split(',')
      }

  if(!foundRecipe) {
    return res.render('404')
  }

  return res.render('pages/admin/edit', {recipe})
}

exports.create = (req, res) => {
  return res.render("pages/admin/create")
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body)
  
  for(key of keys) {
    if(req.body[key] == "") {
      return res.send('Por favor preencha todos os campos!')
    }
  }

  let {name, author, image_url, ingredients, preparation_mode, information} = req.body
  let id = 1
  const lastRecipe = recipes.recipes[recipes.recipes.length -1]
  
  if(lastRecipe) {
    id = lastRecipe.id + 1
  }

  recipes.recipes.push({
    id,
    name,
    author,
    image_url,
    ingredients,
    preparation_mode,
    information
  })

  fs.writeFile("data.json", JSON.stringify(recipes, null, 2), function(err){
    if(err) {
      return res.send('Write file error')
    }

    return res.redirect('/admin/recipes')
  })
}

exports.put = (req, res) => {
  const {id} = req.body
  let index = 0

  const foundRecipe = recipes.recipes.find(function(recipe, foundIndex) {
    if(id == recipe.id) {
      index = foundIndex
      return true
    }
  })

  if(!foundRecipe) {
    return res.render('404')
  }

  const recipe = {
    ...foundRecipe,
    ...req.body
  }

  recipes.recipes[index] = recipe

  fs.writeFile("data.json", JSON.stringify(recipes, null, 2), function(err){
    if(err) {
      return res.send("Write error!")
    }

    return res.redirect(`/admin/recipes/${id}`)
  })
  
}
