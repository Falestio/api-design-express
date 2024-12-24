import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

let connectionOptions: DataSourceOptions = {
  type: "postgres",
  host: "103.174.114.151",
  port: 5432,
  username: "finance",
  password: "Falestio123",
  database: "finance",
  synchronize: false,
  logging: true,
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["dist/infrastructure/db/migrations/*{.ts,.js}"],
};

export default new DataSource({
  ...connectionOptions,
});