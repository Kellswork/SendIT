import { Pool } from 'pg';
import logger from 'winston';
import dotenv from 'dotenv';

dotenv.load();

let pool;
if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.testDB_URL });
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.localDB_URL });
}

pool.connect().then(() => logger.info('connected to db')).catch(err => logger.error(`not connected ${err.message}`));
console.log(process.env.NODE_ENV);
const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
