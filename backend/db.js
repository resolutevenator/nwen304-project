const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const getCost = async products => {
  // pool.query('SELECT 
  return products.length * 2.5;
}

const makeAccount = (email, passwordHash, address) => pool.query('INSERT INTO site_user (email, password, address, usertype) VALUES ($1, $2, $3, \'user\')',
    [email, passwordHash, address]);

module.exports = {pool, getCost, makeAccount};
