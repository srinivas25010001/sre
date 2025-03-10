'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("employees", {
      Id: { type: Sequelize.STRING(15), allowNull: false, primaryKey: true },
      firstName: { type: Sequelize.STRING(100) },
      lastName: { type: Sequelize.STRING(100) },
      emailAddress: { type: Sequelize.STRING(150) },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("employees");
  }
};
