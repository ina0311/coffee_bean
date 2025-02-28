import { User } from '../entity/User'
import { AppDataSource } from '../database/data-source'

export class UserRepository {
  private repository = AppDataSource.getRepository(User)

  async findAll(): Promise<User[]> {
    return this.repository.find()
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData)
    return this.repository.save(user)
  }
} 