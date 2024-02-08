import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional} from 'sequelize'
import { Models as ModelsType } from './index'

export default class Country extends Model<InferAttributes<Country>, InferCreationAttributes<Country>> {
  public readonly id!: CreationOptional<number>
  public readonly name!: string
  public readonly japaneseName!: string
  public readonly isoCode!: string
  public readonly flagImage!: string
  public readonly googleMapUrl!: string
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public static associate(models: typeof ModelsType) {
    this.hasMany(models.CoffeeBean, {as: 'coffeeBeans', foreignKey: 'countryId', sourceKey: 'id'})
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
      japaneseName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isoCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      flagImage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      googleMapUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'countries',
      modelName: 'Country',
      sequelize
    })
    return this
  }
}