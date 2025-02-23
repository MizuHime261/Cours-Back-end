const mysql=require('mysql2/promise');
let pool=mysql.createPool({
    host: 'Localhost',
    user: 'root',
    password: '123456',
    database: 'mysql2_demo',
    port: 3307
});
module.exports=pool;