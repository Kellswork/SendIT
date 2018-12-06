import db from './db';

const tableQuery = async () => {
  const dropUserTable = await db.query('DROP TABLE IF EXISTS users, parcels CASCADE');

  const dropParcelTable = await db.query('DROP TABLE IF EXISTS parcels;');

  const UserTable = await db.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR(50) NOT NULL, 
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    registered_on DATE DEFAULT CURRENT_TIMESTAMP);`);


  const parcelTable = await db.query(`CREATE TABLE IF NOT EXISTS 
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
    current_location TEXT);`);

  console.log(dropUserTable,
    dropParcelTable,
    UserTable,
    parcelTable);
};

tableQuery();
