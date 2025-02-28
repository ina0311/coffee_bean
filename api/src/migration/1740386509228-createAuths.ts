import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuths1740386509228 implements MigrationInterface {
    name = 'CreateAuths1740386509228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`auths\` (\`id\` int NOT NULL AUTO_INCREMENT, \`password_hash\` varchar(255) NOT NULL, \`last_login_at\` datetime NULL, \`refresh_token\` varchar(255) NULL, \`refresh_token_expires_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_3e65bf4e56bde80b7b5e5b9e13\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`auths\` ADD CONSTRAINT \`FK_3e65bf4e56bde80b7b5e5b9e133\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auths\` DROP FOREIGN KEY \`FK_3e65bf4e56bde80b7b5e5b9e133\``);
        await queryRunner.query(`DROP INDEX \`REL_3e65bf4e56bde80b7b5e5b9e13\` ON \`auths\``);
        await queryRunner.query(`DROP TABLE \`auths\``);
    }

}
