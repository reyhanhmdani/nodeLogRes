// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// knexfile.js
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Pastibisa',
      database: 'sequelize',
    },
    migrations: {
      directory: './db/migrations', // Sesuaikan dengan direktori migrations Anda
    },
    seeds: {
      directory: './db/seeds', // Opsional, jika Anda menggunakan seeding data
    },
  },
};
