import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.load();

let pool;
if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.testDB_URL });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.localDB_URL,
    ssl: true,
  });
}
console.log(process.env.NODE_ENV);
pool.connect().then(() => console.log('connected')).catch(error => console.log(error.message));
const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
