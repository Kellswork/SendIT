import db from './db';

const tableQuery = async () => {
  try {
    const dropUserTable = await db.query('DROP TABLE IF EXISTS users, parcels CASCADE');

    const dropParcelTable = await db.query('DROP TABLE IF EXISTS parcels;');

    const UserTable = await db.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(50) NOT NULL, 
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    registeredOn DATE DEFAULT CURRENT_TIMESTAMP);`);


    const parcelTable = await db.query(`CREATE TABLE IF NOT EXISTS 
    parcels(id SERIAL PRIMARY KEY, 
    placedBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    weight NUMERIC NOT NULL,
    weightMetric VARCHAR(5) NOT NULL,
    price NUMERIC NOT NULL,
    pickupAddress TEXT NOT NULL,
    destinationAddress TEXT NOT NULL,
    reciever VARCHAR(50) NOT NULL,
    phoneNumber TEXT NOT NULL,
    sentOn DATE DEFAULT CURRENT_TIMESTAMP,
    deliveredOn DATE,
    status VARCHAR(20) DEFAULT 'placed',
    currentLocation TEXT);`);

    console.log(dropUserTable,
      dropParcelTable,
      UserTable,
      parcelTable);
  } catch (err) {
    console.log(err.name, err.message);
    return err.message;
  }
};

tableQuery();
