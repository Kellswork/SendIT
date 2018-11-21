import logger from 'winston';
import db from './db/index';

const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  parcels(
  id integer SERIAL PRIMARY KEY,
  firstname character varying(250) NOT NULL,
  lastname character varying(250) NOT NULL,
  username character varying(250) NOT NULL,
  email character varying(250) NOT NULL,
  phonenumber interger NOT NULL,
  password character varying(1000) NOT NULL,
  isAdmin boolean DEFAULT false,
  registered date DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT users_email_key UNIQUE (email)
)`;

  db.query(queryText)
    .then((res) => {
      logger.info(res);
      db.end();
    })
    .catch((err) => {
      logger.error(err);
      db.end();
    });
};

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parcels';
  db.query(queryText)
    .then((res) => {
      logger.info(res);
      db.end();
    })
    .catch((err) => {
      logger.error(err);
      db.end();
    });
};

db.on('remove', () => {
  logger.info('client removed');
  process.exit(0);
});

module.exports = {
  createUsersTable,
  dropUsersTable,
};
