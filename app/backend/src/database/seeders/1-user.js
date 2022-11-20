/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (QueryInterface) => {
    await QueryInterface.bulkInsert('users', [
      {
        id: '1f7804f7-9f05-461a-8b85-78d80af1df23',
        username: 'felipe',
        password: 'bcc67d8524948bbd873e4df12c89b182', // 12345678A
        account_id: '034c9c7c-d490-4f4e-8e4e-0921a7410f0f'
      },
      {
        id: 'e396c983-3e8b-43ac-8643-2247704b4abf',
        username: 'felipe1',
        password: 'bcc67d8524948bbd873e4df12c89b182', // 12345678A
        account_id: '4d80fcf4-ecff-450e-b0a6-ce28389e10f4'
      },
    ],
    {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};