import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
      host : '189.84.9.61',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: '250497196'
    },
    migrations:{
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
};