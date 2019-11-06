const admin = require('express').Router();
const fs = require('fs');
const db = require('./db');
const auth = require('./auth');
const {pool} = db;

admin.post('/allOrders', async (req, res) => {
  const { token } = req.body;
  //TODO:
  const profile = await auth.checkAuth(token)
  if (profile === null)
    return res.status(403).send({status: 'no such user'});
  if (profile.usertype !== 'admin')
    return res.status(403).send({status: 'forbidden'});

  const {rows} = await pool.query('SELECT email, productid, p.address as address, '
    + 'cost, current_status, time FROM purchase p INNER JOIN site_user u '
    + 'ON p.userid = u.userid')
  console.log(rows);
  res.send(rows);
  
});

admin.post('/archive', async (req, res) => {
  const {token, email} = req.body;

  const profile = await auth.checkAuth(token)
  if (profile === null)
    return res.status(403).send({status: 'no such user'});
  if (profile.usertype !== 'admin')
    return res.status(403).send({status: 'forbidden'});

  let timestamp = Math.floor((+Date.now())/1000);
  let filename = `dumps/${email} - ${timestamp}.json`
  const {rows} = await pool.query('SELECT email, u.userid as userid, productid, p.address as address, '
    + 'cost, current_status, time FROM purchase p INNER JOIN site_user u '
    + 'ON p.userid = u.userid WHERE email = $1', [email])
  fs.writeFileSync(filename, JSON.stringify(rows));
  await pool.query('DELETE FROM purchase WHERE userid = $1', [rows[0].userid])
  res.send({status: 'OK'});
});

admin.post('/modify', async (req, res) => {
  const {token, email, time, productid, cost} = req.body;

  const profile = await auth.checkAuth(token);
  if (profile === null)
    return res.status(403).send({status: 'no such user'});
  if (profile.usertype !== 'admin')
    return res.status(403).send({status: 'forbidden'});

  const lookup = await db.getId(email);
  console.log(lookup);
  pool.query('UPDATE purchase SET productid = $1, cost = $2 WHERE '
    + 'userid = $3 AND time = $4 RETURNING *', [productid, cost, lookup, time])
  .then(({rows}) => res.send({status: 'OK', modified: rows.length}));

});

module.exports = admin;
