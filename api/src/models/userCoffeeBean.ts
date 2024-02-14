import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional} from 'sequelize'
import { Models as ModelsType } from './index'

export default class UserCoffeeBean extends Model<InferAttributes<UserCoffeeBean>, InferCreationAttributes<UserCoffeeBean>> {
  public readonly id!: CreationOptional<number>
  public readonly userId!: number
  public readonly coffeeBeanId!: number
  public readonly imageUrls!: JSON
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public static associate(models: typeof ModelsType) {
    this.belongsTo(models.User, {as: 'user', foreignKey: 'userId', targetKey: 'id'})
    this.belongsTo(models.CoffeeBean, {as: 'coffeeBean', foreignKey: 'coffeeBeanId', targetKey: 'id'})
    // this.belongsToMany(models.Flavor, {as: 'flavor', through: models.UserBeanFlavor, foreignKey: 'userBeanId', otherKey: 'flavorId', sourceKey: 'id'})
  }

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      coffeeBeanId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      imageUrls: {
        type: DataTypes.JSON,
        allowNull: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'userCoffeeBeans',
      modelName: 'UserCoffeeBean',
      sequelize
    })
    return this
  }
}