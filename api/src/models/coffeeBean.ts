import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional} from 'sequelize'
import {Models as ModelsType} from './index'

export default class coffeeBean extends Model<InferAttributes<coffeeBean>, InferCreationAttributes<coffeeBean>> {
  public readonly id!: CreationOptional<number>
  public readonly name!: string
  public readonly price!: number
  public readonly storeId?: number
  public readonly countryId?: number
  public readonly farmId?: number
  public readonly minAltitude?: number
  public readonly maxAltitude?: number
  public readonly breedType?: number
  public readonly process?: number
  public readonly roast?: number
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public static associate(models: typeof ModelsType) {
    this.belongsTo(models.Store, {as: 'store', foreignKey: 'storeId', targetKey: 'id'})
    this.belongsTo(models.Country, {as: 'country', foreignKey: 'countryId', targetKey: 'id'})
    this.hasMany(models.UserCoffeeBean, {as: 'userCoffeeBeans', foreignKey: 'coffeeBeanId', sourceKey: 'id'})
  }

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      storeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      countryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      farmId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      minAltitude: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      maxAltitude: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      breedType: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      process: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      roast: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'coffeeBeans',
      modelName: 'CoffeeBean',
      sequelize
    })
    return this
  }
}