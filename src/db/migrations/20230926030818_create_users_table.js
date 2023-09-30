exports.up = function (knex) {
    return knex.schema.createTable('User', (table) => {
        table.increments('id').primary();
        table.string('username').unique();
        table.string('password');
        table.integer('as_id').unsigned(); // Menambahkan kolom as_id
        table.string('token')

        table.foreign('as_id').references('Santri.id'); // Menghubungkan ke tabel santri
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('User');
};
