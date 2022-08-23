import knex from 'knex';


const db = knex({
    client: 'pg',
    connection: {
        host : '189.84.9.61',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: '250497196'
      },
    useNullAsDefault: true,
});

export default db;