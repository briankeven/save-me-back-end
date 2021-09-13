import {Knex} from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('duvidas', table => {
        table.string('id').primary();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.integer('subject').notNullable();
        table.integer('format').notNullable();

        table.integer('status').notNullable();
        
        table.string('user_id').notNullable();
        table.foreign('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE');

        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('deleted_at').nullable();

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('duvidas');
}