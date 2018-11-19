import { Pool } from 'pg';
import logger from 'winston';
import config from '../../config/config';

let pool;

if (process.env.NODE_ENV === 'development') {
  pool = new Pool({ connectionString: config.development });
}

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: config.test });
}

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({ connectionString: config.production });
}
logger.info(`${config.development}, ${process.env.NODE_ENV}`);
pool.connect().then(() => logger.info('connected to db')).catch(() => logger.error('Not connected to db...'));


const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
