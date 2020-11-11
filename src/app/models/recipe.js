const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  create(data, callback) {
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
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database error ${err}`;

      callback(results.rows[0]);
    });
  },
  update(data, callback) {
    const query = `
  UPDATE recipes SET 
    title= ($1),
    image= ($2),
    ingredients= ($3),
    preparation= ($4),
    information= ($5),
    created_at= ($6)
  WHERE id = $7
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
      data.id,
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
};
