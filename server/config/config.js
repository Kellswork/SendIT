import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: process.env.DEV_DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
  production: process.env.PROD_DATABASE_URL,
};

export default config;
