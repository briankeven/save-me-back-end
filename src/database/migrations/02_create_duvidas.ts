import {Knex} from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('duvidas', table => {
        table.increments('id').primary();
        
        table.string('city').notNullable();
        table.string('country').notNullable();
        table.string('whats').notNullable();
        table.string('title').notNullable();
        table.string('query').notNullable();
        table.decimal('subject').notNullable();
        table.decimal('format').notNullable();
        
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer('materia_id')
            .notNullable()
            .references('id')
            .inTable('materias')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('duvidas');
}