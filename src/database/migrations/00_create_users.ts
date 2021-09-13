import {Knex} from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('photo').notNullable();

        table.string('city').nullable();
        table.string('country').nullable(); 
        table.string('whats').nullable();
        
        table.integer('like').defaultTo(0).notNullable();

        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('deleted_at').nullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}