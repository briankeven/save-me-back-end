import {Knex} from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('candidatar', table => {
        table.increments('id').primary();
        
        table.string('text').notNullable();
        
        table.integer('duvida_id')
            .notNullable()
            .references('id')
            .inTable('duvidas')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('candidatar');
}