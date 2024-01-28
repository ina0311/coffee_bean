import { DataTypes, Model, type Sequelize, type InferCreationAttributes, type InferAttributes, type CreationOptional} from 'sequelize'


export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  public id!: CreationOptional<number>
  public username!: string
  public email!: string
  public password!: string
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>

  public correctPassword(reqPassword: string): boolean {
    return this.password === reqPassword
  }

  // public static associate() {
  //   // associations can be defined here
  // }

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