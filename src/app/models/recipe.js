const db = require("../../config/db");
const { date } = require("../../lib/utils");
const recipes = require("../controllers/recipes");

module.exports = {
  create(data, callback) {
    const query = `
  INSERT INTO recipes (
    title,
    image,
    ingredients,
    preparation,
    information,
    created_at,
    chef_id
  )VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id
  `;

    let arrayIngredients = data.ingredients;
    let filteredIngredients = arrayIngredients.filter((ingredient) => {
      return ingredient != "";
    });

    let arrayPreparation = data.preparation;
    let filteredPreparations = arrayPreparation.filter((preparation) => {
      return preparation != "";
    });

    const values = [
      data.title,
      data.image,
      filteredIngredients,
      filteredPreparations,
      data.information,
      date(Date.now()).iso,
      data.chef
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`SELECT chefs.name, recipes.* FROM recipes
    LEFT JOIN chefs on (chefs.id = recipes.chef_id)
    WHERE recipes.id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database error ${err}`;
      console.log(results.rows[0])
      callback(results.rows[0]);
    });
  },
  findBy(params) {
    const { filter, callback} = params

    let query = ''
    let filterQuery = '';

    if(filter) {
      filterQuery = `WHERE recipes.title ILIKE '%${filter}%'`
    }

    query = `SELECT recipes.* FROM recipes
              ${filterQuery}
    `

    db.query(query, (err, results) => {
      if(err) throw `Database error ${err}`
      callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
  UPDATE recipes SET 
    title= ($1),
    image= ($2),
    ingredients= ($3),
    preparation= ($4),
    information= ($5),
    created_at= ($6),
    chef_id= ($7)
  WHERE id = $8
  `;

  let arrayIngredients = data.ingredients;
  let filteredIngredients = arrayIngredients.filter((ingredient) => {
    return ingredient != "";
  });

  let arrayPreparation = data.preparation;
  let filteredPreparations = arrayPreparation.filter((preparation) => {
    return preparation != "";
  });

    const values = [
      data.title,
      data.image,
      filteredIngredients,
      filteredPreparations,
      data.information,
      date(Date.now()).iso,
      data.chef,
      data.id
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database error ${err}`;
      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database error ${err}`;

      callback();
    });
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, (err, results) => {
      if(err) `Database error ${err}`;
      callback(results.rows)
    })
  }
};
