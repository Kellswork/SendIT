const  Client  = require("pg").Client;
// import logger from "winston";
//import config from "../../config/config";

//let pool;

class Database {

  constructor() {
    this.createUseTableQuery = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(50))`;
    this.createParcelTable = 
    `CREATE TABLE IF NOT EXISTS parcels(id serial ,placed_by INT NOT NULL REFERENCES users(id), weight NUMERIC NOT NULL,
    weightmetric VARCHAR(5) NOT NULL,
    price NUMERIC NOT NULL,
    pickupaddress TEXT NOT NULL )`;
    //console.log(Database.instance)
    this.connect(); 
  }

  connect() { 
    if (!Database.instance) {
         const connectionString = process.env.DATABASE_URL || 'postgresql://kells:kells123@localhost:5432/sendit'
      const instance = new Client (connectionString);
      instance.connect();
      instance.query(this.createUseTableQuery);
      instance.query(this.createParcelTable);
      Database.instance = instance;
    }
}

  query(query){
    return Database.instance.query(query);
  }

  dropUsers(){

  }
  dropParcels(){
    Database.instance.query("DROP TABLE parcels");
  }

}



//test();
const db = new Database();
//db.dropParcels();


export default db;


// if (process.env.NODE_ENV === 'development') {
//   pool = new Pool({ connectionString: config.development });
// }

// if (process.env.NODE_ENV === 'test') {
//   pool = new Pool({ connectionString: config.test });
// }

// if (process.env.NODE_ENV === 'production') {
//   pool = new Pool({ connectionString: config.production });
// }
// logger.info(`${process.env.NODE_ENV}`);
// pool.connect().then(() => logger.info('connected to db')).catch(() => logger.error('Not connected to db...'));

// const db = {
//   query: (text, params) => pool.query(text, params),
// };
