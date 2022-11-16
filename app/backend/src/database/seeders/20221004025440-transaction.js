/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      {
        id: 1,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 100,
        createdAt: new Date(),
      },
      {
        id: 2,
        debitedAccountId: 2,
        creditedAccountId: 3,
        value: 200,
        createdAt: new Date(),
      },
      {
        id: 3,
        debitedAccountId: 3,
        creditedAccountId: 1,
        value: 500,
        createdAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
