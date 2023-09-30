// models/user.js
const db = require('../db/db.config');

const createUserModel = () => {
    return db.schema.createTable('Users', (table) => {
        table.increments('id').primary();
        table.string('username', 100).unique();
        table.string('password', 100);
        table.integer('as_id').notNullable();
        table.string('token', 255);


        table.foreign('as_id').references('Santri.id');
    });
};

module.exports = createUserModel;


