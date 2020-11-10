const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  create(data, callback) {
    const query = `
    	INSERT INTO chefs (name, avatar_url, created_at)
  VALUES ($1, $2, $3)
  RETURNING id`;

    const values = [
     data.name,
     data.avatar_url,
     date(Date.now()).iso
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database error! ${err}`;

      callback(results.rows[0]);
    });
  }
};
