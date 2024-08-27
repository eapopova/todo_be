module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('task', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          not: {
            arg: /\s\s+/g,
            msg: 'whitespace string'
          }
        }
      },
      is_сompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
    });
  },
 
  down: (queryInterface) => {
    return queryInterface.dropTable('task');
  }
};