exports.up = function (knex) {
    return knex.schema.createTable('Santri', (table) => {
        table.increments('id').primary();
        table.string('nama');
        table.bigInteger('hp');
        table.string('email');
        table.string('gender');
        table.string('alamat');
        table.integer('angkatan');
        table.integer('jurusan').unsigned();
        table.integer('minat').unsigned();
        table.integer('status').unsigned();

        table.foreign('jurusan').references('Jurusan.id');
        table.foreign('minat').references('Minat.id');
        table.foreign('status').references('Status.id');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('Santri');
};
