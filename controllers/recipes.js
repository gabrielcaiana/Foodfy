const recipes = require('../data')

exports.index = (req, res) => {
    res.render('pages/site/recipes', {recipes})
}

exports.url_recipe =  (req, res) => { 
    const recipeId = req.params.id
    
    const myRecipe = recipes.find(function(myRecipe){
        if(myRecipe.id == recipeId) {
            return true
        }
    })
    
    if(!myRecipe) {
        return res.render('404')
    }
    
    return res.render('pages/site/myRecipe', {myRecipe})
}

//ADMIN

exports.adm_index = (req, res) => {
    res.render('pages/admin/index', {recipes})
}



    