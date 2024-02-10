import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "postgres",
  username: "testi",
  password: "testi12345",
  database: "fsopen",
  host: "localhost",
  port: 5432,
});

export default db;
