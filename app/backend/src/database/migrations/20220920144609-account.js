/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      balance: { type: Sequelize.DECIMAL(), allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  },
};