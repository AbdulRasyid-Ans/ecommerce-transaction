const config = require('./config');

module.exports = {
    development: {
        database: config.postgres.db,
        host: config.postgres.host,
        username: config.postgres.user,
        password: config.postgres.passwd,
        dialect: 'postgres',
    },
    test: {
        database: config.postgres.db,
        host: config.postgres.host,
        username: config.postgres.user,
        password: config.postgres.passwd,
        dialect: 'postgres',
    },
};