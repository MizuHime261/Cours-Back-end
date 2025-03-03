const knex = require('knex')({
  client: 'mysql2', // Dùng 'mysql2' vì bạn đang dùng mysql2/promise
  connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'ProductDB',
      port: 3306
  },
  pool: { min: 0, max: 10 }
});

module.exports = knex;