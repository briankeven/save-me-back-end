import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
      host : 'localhost',
      port: 5432,
      database: 'saveme',
      user: 'postgres',
      password: 'postgres'
    },
    migrations:{
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
};