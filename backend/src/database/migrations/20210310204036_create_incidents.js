
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
      table.increments(); //criando chave primária auto increment
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();
      
      table.string('ong_id').notNullable(); //relacionamento com a tabela ong - de qual ong é o caso

      table.foreign('ong_id').references('id').inTable('ongs'); 
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
