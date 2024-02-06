'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coffeeBeans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      storeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      farmId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      breedType: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      process: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      roast: {
        type: Sequelize.ENUM('light', 'cinnamon', 'Medium', 'high', 'city', 'fullCity', 'french', 'italian'),
        allowNull: true,
      },
      minAltitude: {
        type: Sequelize.INTEGER,
        validate: {
          len: [1, 9999]
        },
        allowNull: true,
      },
      maxAltitude: {
        type: Sequelize.INTEGER,
        validate: {
          len: [1, 9999]
        },
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('coffeeBeans');
  }
};