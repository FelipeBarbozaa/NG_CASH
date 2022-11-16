module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER },
      username: { allowNull: false, unique: true, type: Sequelize.STRING(100) },
      password: { allowNull: false, type: Sequelize.STRING(50) },
      accountId: {
        allowNull: false,
        unique: true, type: Sequelize.INTEGER, field: 'account_id' }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};