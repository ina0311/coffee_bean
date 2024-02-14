import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional } from "sequelize"
import { Models as ModelsType } from "./index"

const STATUS_COLUMNS = {
  type: DataTypes.DECIMAL(2, 1),
  allowNull: false,
  defaultValue: 0,
  validate: {
    min: 0,
    max: 5,
    is: /^(0(\.5)?|1(\.0)?|2(\.0)?|3(\.0)?|4(\.0)?|5(\.0)?)$/
  }
}

export default class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
  public readonly id!: CreationOptional<number>
  public readonly userBeanId!: number
  public readonly coffeeStyle!: number
  public readonly total!: number
  public readonly acidity!: number
  public readonly bitterness!: number
  public readonly body!: number
  public readonly afterTaste!: number
  public readonly describe?: string
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public static associate(models: typeof ModelsType) {
    // this.hasMany(models.CoffeeBean, {as: 'coffeeBeans', foreignKey: 'flavorId', sourceKey: 'id'})
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
      coffeeStyle: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: STATUS_COLUMNS,
      acidity: STATUS_COLUMNS,
      bitterness: STATUS_COLUMNS,
      body: STATUS_COLUMNS,
      afterTaste: STATUS_COLUMNS,
      describe: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      tableName: 'reviews',
      modelName: 'Review',
      sequelize
    })
    return this
  }
}