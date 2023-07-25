import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    dialect: 'postgres',
  }
);

export default sequelize;
