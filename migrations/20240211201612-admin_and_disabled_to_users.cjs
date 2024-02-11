"use strict";

const { DataTypes } = require("sequelize");

/**
 * @param {import('sequelize').QueryInterface} queryInterface - The QueryInterface provided by Sequelize.
 * @param {import('sequelize').Sequelize} Sequelize - The Sequelize library (including DataTypes).
 */
module.exports.up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn("Users", "admin", {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
  });
  await queryInterface.addColumn("Users", "disabled", {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
  });
};

/**
 * @param {import('sequelize').QueryInterface} queryInterface - The QueryInterface provided by Sequelize.
 */
module.exports.down = async (queryInterface) => {
  await queryInterface.removeColumn("Users", "admin");
  await queryInterface.removeColumn("Users", "disabled");
};
