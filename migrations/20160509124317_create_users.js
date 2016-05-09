exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('email').unique().notNullable();
    table.string('password');
    table.boolean('admin').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
