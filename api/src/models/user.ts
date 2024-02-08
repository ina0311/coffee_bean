import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional} from 'sequelize'
import { Models as ModelTypes } from '../models'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  public readonly id!: CreationOptional<number>
  public readonly username!: string
  public readonly email!: string
  public readonly password!: string
  public readonly createdAt!: CreationOptional<Date>
  public readonly updatedAt!: CreationOptional<Date>

  public correctPassword(reqPassword: string): boolean {
    return this.password === reqPassword
  }

  public generateToken(): string {
    return jwt.sign({id: this.id}, JWT_SECRET!, {algorithm: 'HS256', expiresIn: JWT_EXPIRES_IN!})
  }

  public static associate(models: typeof ModelTypes) {
    this.hasMany(models.UserCoffeeBean, {as: 'userCoffeeBeans', foreignKey: 'userId', sourceKey: 'id'})
    this.belongsToMany(models.CoffeeBean, {as: 'coffeeBeans', through: models.UserCoffeeBean, foreignKey: 'userId', otherKey: 'coffeeBeanId', sourceKey: 'id'})
  }

  public static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'users',
      modelName: 'User',
      sequelize
    })
    return this
  }
}