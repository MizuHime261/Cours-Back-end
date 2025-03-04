const knex = require("knex")({
	client: "mysql2",
	connection: {
	  host: "localhost",
	  user: "root",
	  password: "123456",
	  database: "BookStore",
	  port: 3306,
	},
	pool: { min: 0, max: 10 },
  });
  
module.exports = knex;
  