/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      {
        id: 1,
        balance: 1000,
      },
      {
        id: 2,
        balance: 2500,
      },
      {
        id: 3,
        balance: 4500,
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};