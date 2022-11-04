const db = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
});

module.exports = db;