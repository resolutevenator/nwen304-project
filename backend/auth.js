const Pool = require('pg').Pool;
const crypto = require('crypto');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

//1 hr
const TIME_TO_EXPIRE = 360000;

const generateToken = () => crypto.randomBytes(20).toString('hex');

/*
 * Authorization object
 * Keys = tokens
 * Values = [
 *    email of associated user,
 *    datetime to expire
 * ]
 */
const authorizations = {};

const createAuth = email => {

  //generate new token
  let token;
  do {
    token = generateToken();
  } while (authorizations[token] !== undefined);

  authorizations[token] = [
    email,
    Date.now() + TIME_TO_EXPIRE
  ]

  return token;
}

const checkAuth = async token => {
  const resp = authorizations[token];
  //no such token
  if (resp === undefined)
    return null;
  //expired
  if (resp[1] < Date.now()) {
    delete authorizations[token]
    return null;
  }
  //otherwise OK
  return emailToProfile(resp[0]);
}

const emailToProfile = email => {
    return pool.query('SELECT * FROM site_user WHERE email = $1', [email])
    .then(x => x.rows[0])
};


module.exports = {createAuth, checkAuth, emailToProfile};
