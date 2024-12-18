import { DataSource } from "typeorm";
import { User } from "@/domain/user/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "103.174.114.151",
  port: 5432,
  username: "finance",
  password: "Falestio123",
  database: "finance",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: ['src/migration/*.ts'],
  migrationsTableName: "history",
});
