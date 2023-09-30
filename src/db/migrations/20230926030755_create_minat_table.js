exports.up = function (knex) {
    return knex.schema.createTable('Minat', (table) => {
        table.increments('id').primary();
        table.string('minat');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Minat');
};
