import bcrypt from 'bcrypt';
import db from './db';

const seedTables = async () => {
  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash('12345', salt);
  let queryText = `INSERT INTO users 
    ("firstname", "lastname", "username", "email", "password", "phone_number")
     VALUES
    ('kelechi','ogbonna','kellswork','kells@gmail.com','${password}','08035085824'
    );`;
  password = await bcrypt.hash('12345', salt);
  queryText += `INSERT INTO users 
    ("firstname", "lastname", "username", "email", "password", "phone_number")
     VALUES
    ('mary','ngozi','maryam','mary@gmail.com','${password}','08035085824'
    );`;

  password = await bcrypt.hash('12345', salt);
  queryText += `INSERT INTO users 
    ("firstname", "lastname", "username", "email", "password", "phone_number", "is_admin")
     VALUES
    ('stella','mauada','stellb','stella@gmail.com','${password}','08035085824', true
    );`;
  // queryText = `INSERT INTO parcels
  //   ( placed_by, weight, weightmetric, price, pickup_address,
  //      destination_address, reciever, phone_number)
  //   VALUES(20, 'kg','20000','No 3 douglas road oshi lagos',
  // 'No 20 fidelia street off illupeju lagos','johson', '07036342277');`;
  // const result =
  await db.query(queryText);
  // (result);
};

const migrate = async () => {
  await db.dropParcels();
  await db.dropUsers();
  await db.query(db.createUserTableQuery);
  await db.query(db.createParcelTableQuery);
  seedTables();
};

migrate();
