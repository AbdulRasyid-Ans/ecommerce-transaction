const Joi = require('joi')

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('development', 'test')
        .default('development'),
    PORT: Joi.number()
        .default(4000),
    API_VERSION: Joi.string()
        .default('1.0')
        .description('API Version'),
    DB_NAME: Joi.string()
        .default('ecommerce')
        .description('Postgres database name'),
    DB_NAME_TEST: Joi.string()
        .default('ecommerce-test')
        .description('Postgres database for tests'),
    DB_PORT: Joi.number()
        .default(5432),
    DB_HOST: Joi.string()
        .default('localhost'),
    DB_USER: Joi.string().required()
        .default('postgres')
        .description('Postgres username'),
    DB_PASSWORD: Joi.string().allow('')
        .default('password')
        .description('Postgres password'),
    DB_SSL: Joi.bool()
        .default(false)
        .description('Enable SSL connection to PostgreSQL'),
    DB_CERT_CA: Joi.string()
        .description('SSL certificate CA'), // Certificate itself, not a filename
    REDIS_URL: Joi.string()
        .default('redis://localhost:6379')
        .description('Redis string url: redis[s]://[[username][:password]@][host][:port][/db-number]')
}).unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// if test, use test database
const isTestEnvironment = envVars.NODE_ENV === 'test';

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    apiVersion: envVars.API_VERSION,
    jwtSecret: envVars.JWT_SECRET,
    redisUrl: envVars.REDIS_URL,
    postgres: {
        db: isTestEnvironment ? envVars.DB_NAME_TEST : envVars.DB_NAME,
        port: envVars.DB_PORT,
        host: envVars.DB_HOST,
        user: envVars.DB_USER,
        passwd: envVars.DB_PASSWORD,
        ssl: envVars.DB_SSL,
        ssl_ca_cert: envVars.DB_CERT_CA,
        dialect: 'postgres',
    },
};

module.exports = config;