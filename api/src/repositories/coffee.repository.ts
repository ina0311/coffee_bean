import { Coffee } from '../entity/Coffee'
import { AppDataSource } from '../database/data-source'

export class CoffeeRepository {
  private repository = AppDataSource.getRepository(Coffee)

  async findAll(): Promise<Coffee[]> {
    return this.repository.find()
  }

  async create(coffeeData: Partial<Coffee>): Promise<Coffee> {
    const coffee = this.repository.create(coffeeData)
    return this.repository.save(coffee)
  }
} 