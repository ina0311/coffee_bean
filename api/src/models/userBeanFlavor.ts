import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional } from "sequelize"
import { Models as ModelsType } from "./index"

export default class UserBeanFlavor extends Model<InferAttributes<UserBeanFlavor>, InferCreationAttributes<UserBeanFlavor>> {
  public readonly id!: CreationOptional<number>
  public readonly userBeanId!: number
  public readonly flavorId!: number
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public static associate(models: typeof ModelsType) {
    this.belongsTo(models.UserCoffeeBean, {as: 'userCoffeeBean', foreignKey: 'userBeanId', targetKey: 'id'})
    // this.belongsTo(models.Flavor, {as: 'flavors', foreignKey: 'flavorId', targetKey: 'id'})
  }

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      userBeanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      flavorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      tableName: 'userBeanFlavors',
      sequelize
    })
    return this
  }
}