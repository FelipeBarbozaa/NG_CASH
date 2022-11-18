/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (QueryInterface) => {
    await QueryInterface.bulkInsert('users', [
      {
        id: 1,
        username: 'teste@gmail.com',
        password: '25d55ad283aa400af464c76d713c07ad', // 12345678
        account_id: 1
      },
      {
        id: 2,
        username: 'teste2@gmail.com',
        password: '25d55ad283aa400af464c76d713c07ad', // 12345678
        account_id: 2
      },
      {
        id: 3,
        username: 'teste3@gmail.com',
        password: '25d55ad283aa400af464c76d713c07ad', // 12345678
        account_id: 3
      },
    ],
    {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};