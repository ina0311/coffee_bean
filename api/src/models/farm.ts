import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional} from 'sequelize'
import { Models as ModelsType } from './index'

export default class Farm extends Model<InferAttributes<Farm>, InferCreationAttributes<Farm>> {
  public readonly id!: CreationOptional<number>
  public readonly name!: string
  public readonly placeId!: string
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public static associate(models: typeof ModelsType) {
    this.hasMany(models.CoffeeBean, {as: 'coffeeBeans', foreignKey: 'farmId', sourceKey: 'id'})
    this.belongsToMany(models.Country, {as: 'countries', through: models.CoffeeBean, foreignKey: 'farmId', otherKey: 'countryId', sourceKey: 'id'})
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'farms',
      modelName: 'Farm',
      sequelize
    })
    return this
  }
}