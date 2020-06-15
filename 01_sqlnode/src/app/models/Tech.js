import Sequelize, { Model } from 'sequelize';

class Tech extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'techs',
        freezeTableName: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'tech_id',
      through: 'user_techs',
      as: 'users',
    });
  }
}

export default Tech;
