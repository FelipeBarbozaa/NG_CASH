/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      {
        id: 1,
        debited_account_id: 1,
        credited_account_id: 2,
        value: 100,
        created_at: new Date(),
      },
      {
        id: 2,
        debited_account_id: 2,
        credited_account_id: 3,
        value: 200,
        created_at: new Date(),
      },
      {
        id: 3,
        debited_account_id: 3,
        credited_account_id: 1,
        value: 500,
        created_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
