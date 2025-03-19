import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User, Auth, Coffee, Flavor } from '../entity'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'mysql',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'coffee_bean_db',
  synchronize: false,
  logging: true,
  entities: [
    User,
    Auth,
    Coffee,
    Flavor,
  ],
  migrations: ['src/migration/**/*.ts'],
  subscribers: []
})

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Data Source has been initialized!')
  } catch (error) {
    console.error('Error during Data Source initialization:', error)
    throw error
  }
} 