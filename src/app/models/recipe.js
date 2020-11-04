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

    const values = [
      data.title,
      data.image,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database error! ${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    console.log(id)
   db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function (err, results) {
     if(err) throw `Database error ${err}`;
     callback(results.rows[0])
   });
  },
  update(data, callback) {},
  delete(data, callback) {},
};
