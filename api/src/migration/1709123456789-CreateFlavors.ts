import { MigrationInterface, QueryRunner } from 'typeorm'
import { FlavorConstants } from '../utils/flavor'

interface FlavorNode {
  name: string
  color: string
  children?: FlavorNode[]
}

export class CreateFlavors1709123456789 implements MigrationInterface {
  private async insertFlavor(
    queryRunner: QueryRunner,
    flavor: FlavorNode,
    parentId?: number
  ): Promise<void> {
    // 現在のフレーバーを挿入
    const result = await queryRunner.query(`
      INSERT INTO flavors (name, color, parentId)
      VALUES (?, ?, ?)
      `, [flavor.name, '#' + flavor.color, parentId])

    const currentId = result.insertId

    // 子フレーバーが存在する場合、再帰的に処理
    if (flavor.children) {
      for (const child of flavor.children) {
        await this.insertFlavor(queryRunner, child, currentId)
      }
    }
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    // テーブル作成
    await queryRunner.query(`
      CREATE TABLE flavors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(7) NOT NULL,
        parentId INT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (parentId) REFERENCES flavors(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    // フレーバーを再帰的に登録
    for (const flavor of FlavorConstants) {
      await this.insertFlavor(queryRunner, flavor)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE flavors')
  }
} 