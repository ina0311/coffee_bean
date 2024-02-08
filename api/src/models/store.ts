import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional} from 'sequelize'
import { Models as ModelsType } from './index'

export default class Store extends Model<InferAttributes<Store>, InferCreationAttributes<Store>> {
  public readonly id!: CreationOptional<number>
  public readonly name!: string
  public readonly placeId!: string
  public readonly latitude!: number
  public readonly longitude!: number
  public readonly postalCode!: string
  public readonly address!: string
  public readonly siteUrl?: string
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public static associate(models: typeof ModelsType) {
    this.hasMany(models.CoffeeBean, {as: 'coffeeBeans', foreignKey: 'storeId', sourceKey: 'id'})
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
      placeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      siteUrl: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'stores',
      modelName: 'Store',
      sequelize
    })
    return this
  }
}