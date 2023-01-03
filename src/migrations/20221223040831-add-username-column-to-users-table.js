/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => Promise.all([
      queryInterface.addColumn('Users', 'username', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction }),
    ]));
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction((transaction) => Promise.all([
      queryInterface.removeColumn('Users', 'username', { transaction }),
    ]));
  },
};
