import {Knex} from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('contatos', table => {
        table.string('id').primary();
        
        table.string('user_id').notNullable();
        table.foreign('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE');

        table.string('duvida_id').notNullable();
        table.foreign('duvida_id')
            .references('id')
            .inTable('duvidas')
            .onUpdate('CASCADE');
        
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('deleted_at').nullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('contatos');
}