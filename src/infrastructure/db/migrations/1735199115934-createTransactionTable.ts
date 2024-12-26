import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionTable1735199115934 implements MigrationInterface {
    name = 'CreateTransactionTable1735199115934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_type_enum" RENAME TO "transaction_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('pemasukan', 'pengeluaran')`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "type" TYPE "public"."transaction_type_enum" USING "type"::"text"::"public"."transaction_type_enum"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "type" SET DEFAULT 'pengeluaran'`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "type" SET DEFAULT 'pengeluaran'`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "category" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "category" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum_old" AS ENUM('income', 'expense')`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "type" TYPE "public"."transaction_type_enum_old" USING "type"::"text"::"public"."transaction_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_type_enum_old" RENAME TO "transaction_type_enum"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "name" character varying NOT NULL`);
    }

}
