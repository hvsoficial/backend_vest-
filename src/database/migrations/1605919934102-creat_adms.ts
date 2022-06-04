import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class creatAdms1605913957900 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'adms',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'telephone',
					type: 'varchar'
				},
				{
					name: 'email',
					type: 'varchar'
				},
				{
					name: 'senha',
					type: 'varchar'
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('adms')
	}

}
