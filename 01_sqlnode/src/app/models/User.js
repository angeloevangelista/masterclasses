import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'users',
        freezeTableName: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });

    this.belongsToMany(models.Tech, {
      through: 'user_techs',
      foreignKey: 'user_id',
      as: 'techs',
    });
  }
}

export default User;
