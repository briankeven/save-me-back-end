import {Knex} from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('duvidas_candidatos', table => {
        table.string('id').primary();

        table.string('duvida_id').notNullable();
        table.foreign('duvida_id')
            .references('id')
            .inTable('duvidas')
            .onUpdate('CASCADE');

        table.string('candidatar_id').notNullable();
        table.foreign('candidatar_id')
            .references('id')
            .inTable('candidatar')
            .onUpdate('CASCADE');

        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('deleted_at').nullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('duvidas_candidatos');
}