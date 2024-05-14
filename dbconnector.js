const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres', // Change this to your PostgreSQL username
    host: 'localhost',
    database: 'postgres', // Change this to your PostgreSQL database name
    password: 'postgres', // Change this to your PostgreSQL password
    port: 5432, // Default PostgreSQL port
  });
 
  
module.exports = pool