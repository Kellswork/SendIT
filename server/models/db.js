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
// const db = new Database();
// const db = ''
// module.exports = db;