// models/santri.js
const db = require('../db/db.config');

const createSantriModel = () => {
    return db.schema.createTable('Santri', (table) => {
        table.increments('id').primary();
        table.string('nama');
        table.bigInteger('hp');
        table.string('email');
        table.string('gender');
        table.string('alamat');
        table.integer('angkatan');
        table.integer('jurusan');
        table.integer('minat');
        table.integer('status');

        table.foreign('jurusan').references('Jurusan.id');
        table.foreign('minat').references('Minat.id');
        table.foreign('status').references('Status.id');
    });
};

module.exports = createSantriModel;
