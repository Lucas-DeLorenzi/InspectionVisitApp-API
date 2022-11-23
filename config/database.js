require('dotenv').config();

const sslConfig = process.env.DB_DATABASE ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : null

module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "inspection_visit_app",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  dialectModule: require('mysql2'),
  dialectOptions: {
    port: process.env.DB_PORT, ssl: sslConfig || 3306, ssl: sslConfig
  },

  seederStorage: "json",
  seederStoragePath: "sequelizeSeeds.json",

  migrationStorage: "sequelize",
  migrationsStorageTableName: "migrations",

  define: {
    timestamps: false
  }
}