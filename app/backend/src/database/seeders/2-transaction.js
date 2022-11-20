/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('transactions', [
      {
        id: '338a4a2f-62c3-45ac-83d7-91c0c8bee3f8',
        debited_account_id: '034c9c7c-d490-4f4e-8e4e-0921a7410f0f',
        credited_account_id: '4d80fcf4-ecff-450e-b0a6-ce28389e10f4',
        value: 100,
        created_at: new Date(),
      },
      {
        id: 'a2026438-ce3d-407a-ad85-96bf7db246ec',
        debited_account_id: '4d80fcf4-ecff-450e-b0a6-ce28389e10f4',
        credited_account_id: '034c9c7c-d490-4f4e-8e4e-0921a7410f0f',
        value: 200,
        created_at: new Date(),
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
