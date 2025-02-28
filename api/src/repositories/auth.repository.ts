import { Auth } from '../entity/Auth'
import { AppDataSource } from '../database/data-source'
import { User } from '../entity/User'

export class AuthRepository {
  private repository = AppDataSource.getRepository(Auth)

  async findByUserId(userId: number): Promise<Auth | null> {
    return this.repository.findOne({
      where: { user: { id: userId } },
      relations: ['user']
    })
  }

  async findByEmail(email: string): Promise<Auth | null> {
    return this.repository.findOne({
      where: { user: { email } },
      relations: ['user']
    })
  }

  async findByRefreshToken(refreshToken: string): Promise<Auth | null> {
    return this.repository.findOne({
      where: { refresh_token: refreshToken },
      relations: ['user']
    })
  }

  async create(userData: { name: string; email: string; password: string }): Promise<Auth> {
    const userRepository = AppDataSource.getRepository(User)
    
    const user = userRepository.create({
      name: userData.name,
      email: userData.email
    })
    await userRepository.save(user)

    const auth = this.repository.create({
      password_hash: userData.password,
      user
    })
    return this.repository.save(auth)
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.repository.update(id, {
      last_login_at: new Date()
    })
  }

  async updateRefreshToken(id: number, refreshToken: string | undefined, expiresAt: Date | undefined): Promise<void> {
    await this.repository.update(id, {
      refresh_token: refreshToken,
      refresh_token_expires_at: expiresAt
    })
  }
} 