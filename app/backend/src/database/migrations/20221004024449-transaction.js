/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      debitedAccountId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      creditedAccountId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  },
};
