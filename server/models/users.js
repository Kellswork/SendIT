import logger from 'winston';
import { Pool } from 'pg';
import config from '../config/config';

let pool;

if (process.env.NODE_ENV === 'development') {
  pool = new Pool({ connectionString: config.development });
}

pool.on('connect', () => {
  logger.info('connection established');
});

const createUsersTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS user(id serial primary key, name varchar(50))`;

  // try {
  //   const res = await client.query(queryText);
  //   client.release();
  //   logger.info(res.rows[0]);
  // } catch (error) {
  //   logger.error(error.message, error.stack);
  // }
  await pool.query(queryText)
    .then((res) => {
      logger.info('users table created', res);
      pool.end();
    })
    .catch((err) => {
      logger.error('An error occured', err);
      pool.end();
    });
};

const dropUserTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS user';
  await pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  // pool.query(queryText)
  //   .then((res) => {
  //     logger.info(res);
  //     pool.end();
  //   })
  //   .catch((err) => {
  //     logger.error(err);
  //     pool.end();
  //   });
};


createUsersTable().then(res => console.log('table created', res));

export default createUsersTable;
