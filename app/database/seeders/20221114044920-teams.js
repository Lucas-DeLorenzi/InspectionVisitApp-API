'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let teams = [{ name: "Microinformática" }, { name: "Telecomunicaciones" }]

    let roles = [{ name: "ADMIN" }, { name: "EMPLOYEE" }]

    let users = [
      { firstName: "Administrador", lastName: "Administrador", email: "administrador@administrador.com", password: bcrypt.hashSync("123qwe", Number.parseInt(authConfig.rounds)), roleId: "1" },
      { firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), password: bcrypt.hashSync("123qwe", Number.parseInt(authConfig.rounds)), roleId: "2", TeamId: "1" },
      { firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), password: bcrypt.hashSync("123qwe", Number.parseInt(authConfig.rounds)), roleId: "2", TeamId: "2" },
      { firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), password: bcrypt.hashSync("123qwe", Number.parseInt(authConfig.rounds)), roleId: "2", TeamId: "1" }
    ]

    let categories = [{ name: "Casa Principal" },
    { name: "Ex Agroinsumos" },
    { name: "Taller" },
    { name: "Hangar" },
    { name: "Hangar Oficina" },
    { name: "Balanza" },
    { name: "Agroinsumos" },
    { name: "Camara" }
    ]

    let subCategories = [{ name: "Rack Principal (limpieza)", categoryId: "1" },
    { name: "Rack Principal (limpieza)", categoryId: "2" },
    { name: "Rack Principal (limpieza)", categoryId: "3" },
    { name: "Rack Principal (limpieza)", categoryId: "4" },
    { name: "Rack Principal (limpieza)", categoryId: "6" },
    { name: "Rack Principal (orden)", categoryId: "1" },
    { name: "Rack Principal (orden)", categoryId: "2" },
    { name: "Rack Principal (orden)", categoryId: "3" },
    { name: "Rack Principal (orden)", categoryId: "4" },
    { name: "Rack Principal (orden)", categoryId: "6" },
    { name: "Funcionamiento AP", categoryId: "1" },
    { name: "Funcionamiento AP", categoryId: "2" },
    { name: "Funcionamiento AP", categoryId: "3" },
    { name: "Funcionamiento AP", categoryId: "4" },
    { name: "Funcionamiento AP", categoryId: "6" },
    { name: "Funcionamiento AP", categoryId: "7" },
    { name: "Funcionamiento Teléfono",categoryId: "1" },
    { name: "Funcionamiento Teléfono",categoryId: "3" },
    { name: "Funcionamiento Teléfono",categoryId: "4" },
    { name: "Funcionamiento Teléfono",categoryId: "5" },
    { name: "Funcionamiento Teléfono",categoryId: "6" },
    { name: "UPS", categoryId: "1" },
    { name: "UPS", categoryId: "6" },
    { name: "Limpiar PC", categoryId: "5" },
    { name: "Limpiar PC", categoryId: "6" },
    { name: "Acomodar cables", categoryId: "5" },
    { name: "Chequear visualización", categoryId: "8" }
    ]

    await queryInterface.bulkInsert('Roles', roles, {});
    await queryInterface.bulkInsert('Teams', teams, {});
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('categories', categories, {});
    await queryInterface.bulkInsert('subCategories', subCategories, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Teams', null, {});
    await queryInterface.bulkDelete('subCategories', null, {});
    await queryInterface.bulkDelete('categories', null, {});

  }
};
