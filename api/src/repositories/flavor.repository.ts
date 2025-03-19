import { Flavor } from '../entity/Flavor'
import { AppDataSource } from '../database/data-source'

export class FlavorRepository {
  private repository = AppDataSource.getRepository(Flavor)

  async findAll(): Promise<Flavor[]> {
    return this.repository.find()
  }

  async create(flavorData: Partial<Flavor>): Promise<Flavor> {
    const flavor = this.repository.create(flavorData)
    return this.repository.save(flavor)
  }
}
