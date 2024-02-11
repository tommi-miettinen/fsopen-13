"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Blogs", "year", {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 1991,
        max: new Date().getFullYear(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Blogs", "year");
  },
};
