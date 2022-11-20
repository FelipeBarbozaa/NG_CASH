/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      {
        id: '034c9c7c-d490-4f4e-8e4e-0921a7410f0f',
        balance: 1000,
      },
      {
        id: '4d80fcf4-ecff-450e-b0a6-ce28389e10f4',
        balance: 2500,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};