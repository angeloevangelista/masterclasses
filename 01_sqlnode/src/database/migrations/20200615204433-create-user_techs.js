module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_techs', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      allowNull: false,
    },
    tech_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'techs',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('user_techs'),
};
