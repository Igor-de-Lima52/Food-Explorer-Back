exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
  // table.integer("roles").references("id").inTable("users");
  table.text("image");
  table.text("category");
  table.decimal("price", 10, 2);
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
