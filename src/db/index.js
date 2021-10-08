import { Sequelize } from "sequelize";

const { PGPORT, PGHOST, PGDATABASE, PGPASSWORD, PGUSER } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: PGHOST,
  dialect: "postgres",
});

export const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB is authenticated");
  } catch (error) {
    console.log(error);
  }
};

export const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
