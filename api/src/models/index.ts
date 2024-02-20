import {Sequelize} from 'sequelize'
import process from 'process'
import User from './user'
import Store from './store'
import Country from './country'
import Farm from './farm'
import CoffeeBean from './coffeeBean'
import UserCoffeeBean from './userCoffeeBean'
import Flavor from './flavor'
import ReviewFlavor from './reviewFlavor'
import Review from './review'


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
  Store: Store.initialize(sequelize),
  Country: Country.initialize(sequelize),
  Farm: Farm.initialize(sequelize),
  CoffeeBean: CoffeeBean.initialize(sequelize),
  UserCoffeeBean: UserCoffeeBean.initialize(sequelize),
  Flavor: Flavor.initialize(sequelize),
  ReviewFlavor: ReviewFlavor.initialize(sequelize),
  Review: Review.initialize(sequelize),
} as const

Object.values(models).forEach((model) => model.associate(models));

console.log('db connection success')
export default {
  sequelize,
  Sequelize,
  models,
}

export const Models = models
