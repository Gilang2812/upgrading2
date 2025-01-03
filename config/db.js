require("dotenv/config");
const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    TIMEZONE: "+07:00",
    logging: console.log,
  }
);

module.exports = db;
