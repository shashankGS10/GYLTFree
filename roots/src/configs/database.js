require('dotenv').config();
const { Sequelize } = require('sequelize');

const isTest = process.env.NODE_ENV === 'test';

const sequelize = isTest
  // in-memory DB for tests
  ? new Sequelize('sqlite::memory:', { logging: false })
  // your Postgres credentials for dev/prod
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,           // set to console.log if you want SQL printed
      }
    );

module.exports = sequelize;