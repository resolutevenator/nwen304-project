const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const getCost = async products => {
  // pool.query('SELECT 
  return products.length * 2.5;
}

module.exports = {pool, getCost};
