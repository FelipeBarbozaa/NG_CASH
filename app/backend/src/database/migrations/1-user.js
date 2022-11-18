module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50) },
      username: { allowNull: false, unique: true, type: Sequelize.STRING(100) },
      password: { allowNull: false, type: Sequelize.STRING(50) },
      account_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50),
        references: {
          model: 'accounts',
          key: 'id'
        },
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};