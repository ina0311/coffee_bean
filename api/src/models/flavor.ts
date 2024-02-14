import { DataTypes, Model, Sequelize, Op, type InferCreationAttributes, type InferAttributes, type CreationOptional } from "sequelize"
import { Models as ModelsType } from "./index"

export default class Flavor extends Model<InferAttributes<Flavor>, InferCreationAttributes<Flavor>> {
  public readonly id!: CreationOptional<number>
  public readonly level!: string
  public readonly origin!: string
  public readonly ja!: string
  public readonly en!: string
  public readonly parentId?: number
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public static associate(models: typeof ModelsType) {
    // this.belongsToMany(models.UserCoffeeBean, {as: 'userCoffeeBean', through: models.UserBeanFlavor, foreignKey: 'flavorId', otherKey: 'userBeanCoffeeId', sourceKey: 'id'})
  }

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      level: {
        type: DataTypes.ENUM('category', 'subCategory', 'group'),
        allowNull: false
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ja: {
        type: DataTypes.STRING,
        allowNull: false
      },
      en: {
        type: DataTypes.STRING,
        allowNull: false
      },
      parentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      scopes: {
        omit: {
          where: {
            [Op.or]: {
              origin: {
                [Op.notIn]: ['other', 'paperyMusty', 'moldyDamp', 'chemical']
              },
              parentId: {
                [Op.notIn]: [5, 23]
              }
            }
          }
        }
      },
      tableName: 'flavors',
      sequelize
    })
    return this
  }
}