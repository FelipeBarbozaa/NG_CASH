/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      balance: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  },
};