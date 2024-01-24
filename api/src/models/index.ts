import {Sequelize} from 'sequelize'
import process from 'process'
import User from './user'

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD!,
  {
    dialect: 'mysql',
    timezone: '+09:00',
    port: +process.env.MYSQL_PORT!,
    host: process.env.MYSQL_HOST!,
  }
)

const models = {
  User: User.initialize(sequelize),
} as const

// Associateを定義することになったら書く
// Object.keys(models).forEach((tableName: string) => {
//   if (models[tableName].associate) {
//     models[tableName].associate(models)
//   }
// })

console.log('db connection success')
export default {
  sequelize,
  Sequelize,
  models,
}

export const Models = models
