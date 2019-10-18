const Sequelize = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:test@localhost:5432/postgres';
const db = new Sequelize(databaseUrl);

module.exports = db;