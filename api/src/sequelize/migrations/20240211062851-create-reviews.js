'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const STATUS_COLUMNS = {
      type: Sequelize.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
        is: /^(0(\.5)?|1(\.0)?|2(\.0)?|3(\.0)?|4(\.0)?|5(\.0)?)$/
      }
    };

    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userBeanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      coffeeStyle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total: STATUS_COLUMNS,
      acidity: STATUS_COLUMNS,
      bitterness: STATUS_COLUMNS,
      body: STATUS_COLUMNS,
      afterTaste: STATUS_COLUMNS,
      describe: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('reviews');
  }
};