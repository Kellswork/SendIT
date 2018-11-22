 import { Pool } from 'pg';
import logger from 'winston';
//import config from '../config/config';

let pool;

//if (process.env.DATABASE_URL) {

 // pool.coonect();
//}
/*
else if (process.env.NODE_ENV === 'development') {
  pool = new Pool({ connectionString: config.development });
}

else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: config.test });
}
*/
//logger.info(`${process.env.NODE_ENV}`);
//process.env.NODE_ENV
pool = new Pool(process.env.DATABASE_URL);
/*
pool.connect().then(() => logger.info('connected to db')).catch(() => logger.error('Not connected to db...'));
*/


const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;


/*
const { Client } = require('pg');

class Database {
  constructor() {
    this.createUserTableQuery = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(50) NOT NULL, 
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    registered_on DATE DEFAULT CURRENT_TIMESTAMP)`;

    this.createParcelTableQuery = `CREATE TABLE IF NOT EXISTS 
    parcels(id SERIAL PRIMARY KEY, 
    placed_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    weight NUMERIC NOT NULL,
    weightmetric VARCHAR(5) NOT NULL,
    price NUMERIC NOT NULL,
    pickup_address TEXT NOT NULL,
    destination_address TEXT NOT NULL,
    reciever VARCHAR(50) NOT NULL,
    phone_number TEXT NOT NULL,
    sent_on DATE DEFAULT CURRENT_TIMESTAMP,
    delivered_on DATE,
    status VARCHAR(20) DEFAULT 'placed',
    current_location TEXT)`;
    // console.log(Database.instance)
    this.connect();
  }

  connect() {
    if (!Database.instance) {
      const connectionString = process.env.DATABASE_URL || 'postgresql://kells:kells123@localhost:5432/sendit';
      const instance = new Client({ connectionString });
      // console.log(instance);
      instance.connect();
      // instance.query(this.createUserTableQuery);
      // instance.query(this.createParcelTableQuery);
      Database.instance = instance;//
    }
  }

  async query(query) {
    const result = await Database.instance.query(query);
    return result;
  }

  dropUsers() {
    this.query('DROP TABLE users CASCADE');
  }

  dropParcels() {
    this.query('DROP TABLE parcels');
  }
}


// // test();
const db = new Database();
 export default db;
*/