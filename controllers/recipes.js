const recipes = require('../data')

exports.index = (req, res) => {
    res.render('pages/recipes', {recipes})
}

exports.url_recipe =  (req, res) => { 
    const recipeId = req.params.id
    
    const myRecipe = recipes.find(function(myRecipe){
        if(myRecipe.id == recipeId) {
            return true
        }
    })
    
    if(!myRecipe) {
        return res.render('./pages/page404')
    }
    
    return res.render('recipes/myRecipe', {myRecipe})
}



    