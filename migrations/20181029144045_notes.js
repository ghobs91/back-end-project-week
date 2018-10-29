exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
      tbl.increments();
      tbl.string('title').notNullable();
      tbl.string('contents');
  });
};
 exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};