/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
