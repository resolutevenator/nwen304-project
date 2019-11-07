const Pool = require('pg').Pool;

console.log(process.env.DATABASE_URL);
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const getCost = async products => {
  // pool.query('SELECT 
  return products.length * 2.5;
}

const makeAccount = (email, passwordHash, address) => pool.query('INSERT INTO site_user (email, password, address, usertype) VALUES ($1, $2, $3, \'user\')',
    [email, passwordHash, address]);

const getId = (email) => pool.query('SELECT userid FROM site_user WHERE email = $1', [email])
  .then(({rows}) => rows[0].userid);

module.exports = {pool, getCost, makeAccount, getId};
