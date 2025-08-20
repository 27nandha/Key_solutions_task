import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // ✅ Required for Neon DB
      rejectUnauthorized: false, // ✅ Avoids self-signed cert issues
    },
  },
  logging: false, // Disable console logs from Sequelize
});

export default sequelize;
