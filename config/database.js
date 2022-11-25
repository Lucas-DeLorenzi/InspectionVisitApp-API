require('dotenv').config();



module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "inspection_visit_app",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  dialectModule: require('mysql2'),
  dialectOptions: {
    //deploy mode
    port: process.env.DB_PORT,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
    // local mode
    // port: 3306,
    // ssl: null
  },

  seederStorage: "json",
  seederStoragePath: "sequelizeSeeds.json",

  migrationStorage: "sequelize",
  migrationsStorageTableName: "migrations",

  define: {
    timestamps: false
  }
}