import { Sequelize, Dialect } from "sequelize";
import config from "../config/config.json" assert { type: "json" };
import { Umzug, SequelizeStorage } from "umzug";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize({
  ...dbConfig,
  dialect: dbConfig.dialect as Dialect,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
  } catch (err) {
    console.log("failed to connect to the database");
    console.log(err);
    return process.exit(1);
  }

  return null;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsPath = join(__dirname, "../migrations");
const migrationsGlob = pathToFileURL(join(migrationsPath, "*.js")).href;

const migrationConf = {
  migrations: {
    glob: migrationsGlob,
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);

  const migrations = await migrator.up();

  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

export { connectToDatabase, sequelize, rollbackMigration };
