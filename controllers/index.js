const recipes = require('../data')

exports.index = function (req, res) {
    return res.render('pages/index', {recipes})
}