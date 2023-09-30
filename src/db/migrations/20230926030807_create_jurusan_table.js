exports.up = function (knex) {
    return knex.schema.createTable('Jurusan', (table) => {
        table.increments('id').primary();
        table.string('jurusan');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Jurusan');
};
