exports.up = function (knex) {
    return knex.schema.createTable('Status', (table) => {
        table.increments('id').primary();
        table.string('nama_status');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Status');
};
