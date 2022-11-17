require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "null",
  database: process.env.DB_DATABASE || "inspection_visit_app",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  dialectModule: require('mysql2'),
  dialectOptions: { port: 5990 },

  seederStorage: "json",
  seederStoragePath: "sequelizeSeeds.json",

  migrationStorage: "sequelize",
  migrationsStorageTableName: "migrations",

  define:{
    timestamps: false
  }
}