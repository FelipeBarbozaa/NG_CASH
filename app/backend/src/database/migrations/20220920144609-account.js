/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'account_id',
        }
      },
      balance: { type: Sequelize.DECIMAL(), allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  },
};