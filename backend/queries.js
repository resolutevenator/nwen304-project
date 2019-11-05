const db = require('./db');
const bcrypt = require('bcryptjs');
const Fuse = require('fuse.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {pool, getCost} = db;

let _ = require('lodash');

const auth = require('./auth');

const searchOptions = {
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 16,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "title",
        "description",
        "authorname",
        "categoryname"
    ]
};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
    }
});

const getAllBooks = (req, res) => {
    pool.query('SELECT bookid, title, author.name as author, description, category.name AS category, stock FROM book INNER JOIN author ON authorid=author INNER JOIN Category ON category=categoryid',
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error);
            }

            return res.status(200).json(result.rows);
        })
}

const getBookById = (req, res) => {
    const bookid = parseInt(req.params.bookid);

    pool.query('SELECT * FROM book WHERE bookid = $1', [bookid], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }

        if (result.rows[0]) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).send('Book with that ID not found');
        }
    })
}

const getBooksByAuthor = (req, res) => {
    const authorid = parseInt(req.params.authorid);

    pool.query('SELECT * FROM book WHERE author = $1', [authorid], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }

        return res.status(200).json(result.rows);
    })
}

const getBooksByCategory = (req, res) => {
    const categoryid = parseInt(req.params.categoryid);

    pool.query('SELECT * FROM book WHERE category = $1', [categoryid], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }

        return res.status(200).json(result.rows);
    })
}

const searchBooks = (req, res) => {
    pool.query('SELECT bookid, title, description, author.name as authorname, category.name as categoryname FROM book INNER JOIN author ON book.author = author.authorid INNER JOIN category ON book.category = category.categoryid', (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }

        const query = req.params.query;

        const fuse = new Fuse(result.rows, searchOptions);
        const searchResults = fuse.search(query);

        return res.status(200).json(searchResults);
    })
}

const getAuthors = (req, res) => {
    pool.query('SELECT * FROM author ORDER BY authorid ASC', (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }

        return res.status(200).json(result.rows);
    })
}

const getCategories = (req, res) => {
    pool.query('SELECT * FROM category ORDER BY categoryid ASC', (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }

        return res.status(200).json(result.rows);
    })
}

const getUserById = (req, res) => {
    const userid = parseInt(req.params.userid);

    pool.query('SELECT * FROM site_user WHERE userid = $1', [userid], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }
        if (result.rows[0]) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).send("User not found");
        }
    })
}

const getPurchaseHistory = (req, res) => {
    const userid = req.body.userid;

    pool.query('SELECT * FROM purchase WHERE userid = $1', [userid], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }
        if (result.rows) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).send("Purchases for this user not found");
        }
    })
}

const postNewUser = (req, res) => {
    const email = req.body.email.toLowerCase();

    const password = bcrypt.hashSync(req.body.password, 8);
    const address = req.body.address;
    var usertype = 'user';
    if (req.body.usertype) {
        usertype = req.body.usertype;
    }

    pool.query('INSERT INTO site_user (email, password, address, usertype) VALUES ($1, $2, $3, $4)',
        [email, password, address, usertype],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error);
            }
            return res.status(201).send(`User added`);
        })

}

const postNewBook = (req, res) => {
    const { title, description, stock, author, category } = req.body;

    pool.query('INSERT INTO book (title, description, stock, author, category) VALUES ($1, $2, $3, $4, $5)',
        [title, description, stock, author, category],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error);
            }

            return res.status(201).send(`Book added`);
        })
}

const postNewEmailReset = (req, res) => {
    const { email } = req.body;

    const timeRequested = new Date();

    const emailLC = email.toLowerCase();

    pool.query('SELECT * FROM site_user WHERE email = $1',
        [emailLC])
        .then(({ rows }) => {
            if (rows[0]) {
                const user = rows[0];
                const code = crypto.randomBytes(20).toString('hex');

                pool.query('INSERT INTO email_reset VALUES ($1, $2, $3)',
                    [user.userid, timeRequested, code],
                    (error) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send(error);
                        }
                    })

                const mailOptions = {
                    from: 'nwen304reset@gmail.com',
                    to: `${emailLC}`,
                    subject: 'NWEN304 Bookstore: Link to Reset Password',
                    text:
                        `You are receiving theis because you (or someone else) has requested the reset of the password for your account with NWEN304 Bookstore. \n\n` +
                        `Please click on the following link, or paste it into your browser, to complete the process. This link will expire within one hour. \n\n` +
                        `insert link ${code}` +
                        `If you did not request this, please ignore this email and your password will remain unchanged. \n`
                }

                transporter.sendMail(mailOptions, function (err, response) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    } else {
                        console.log(response);
                        return res.status(201).send('Accepted and sent email');
                    }
                })
            } else {
                return res.status(404).send("User with that email not found in the database");
            }
            // return res.status(202).send('Accepted');
        }
        );

}

const postNewAuthor = (req, res) => {
    const name = req.body.name;

    pool.query('INSERT INTO author VALUES ($1)',
        [name],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error);
            }

            return res.status(201).send('Author added');
        })
}

const postNewCategory = (req, res) => {
    const name = req.body.name;

    pool.query('INSERT INTO category VALUES ($1)',
        [name],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error);
            }

            return res.status(201).send('Category added');
        })
}

const postNewOrder = async (req, res) => {
  // important, make sure that productid is an array, even if its just one item
  const { token, purchases} = req.body;
  const products = purchases;
  const status = 'processing';
  const time = Date.now();

  const profile = await auth.checkAuth(token);

  const {userid, address} = profile;
  if (profile === null) {
    res.status(403).send({error: 'No Such User'});
  }

  const cost = await getCost(products);

  //start psql transaction
  pool.connect( async (_, client, done) => {
    const shouldAbort = err => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
          if (err) {
            console.error('Error rolling back client', err.stack)
          }
          // release the client back to the pool
          done()
          client = {query: () => null};
        })
      }
      return !!err
    }

    await client.query('BEGIN');
    //stock changes
    
    for (let p of products) {
        console.log(p);
        client.query('UPDATE book SET stock = stock - 1 WHERE bookid = $1',
          [p], err => shouldAbort(err));
    }

    client.query('INSERT INTO purchase (userid, productid, time, address, cost, current_status) VALUES ($1, $2, $3, $4, $5, $6)',
      [userid, products, time, address, cost, status], (err) => {
        if (shouldAbort(err)) {
          return;
        }
        client.query('COMMIT', [], err => {
          if(shouldAbort(err))
            return;
          res.send({status: true});
          done();
        });
      });
  });

}

function postLogin(req, res) {
    const { email, password } = req.body;
    pool.query('SELECT * FROM site_user WHERE email = $1;', [email])
        .then(({ rows }) => {
            const ath = bcrypt.compareSync(req.body.password, rows[0].password);
            if (!ath) {
              res.status(400).send(false);
            }
            return auth.createAuth(email)
        })
        .then(
          token => {
            if (!token)
              return;
            return res.send({token})
          }
        );

}

const updatePassword = (req, res) => {
    const { code, newPassword } = req.body;

    pool.query('SELECT * FROM email_reset WHERE code = $1',
        [code],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error);
            }

            if (result.rows[0]) {
                const userid = result.rows[0].userid;
                const password = bcrypt.hashSync(newPassword, 8);

                pool.query('UPDATE site_user SET password = $1 WHERE userid = $2',
                    [password, userid]).then(() => {
                        return res.status(201).send('Password Updated Successfully');
                    });

                pool.query('DELETE FROM email_reset WHERE code = $1',
                    [code]);

            }
        })
}

const postUserInfo = (req, res) => {
  const {token} = req.body;
  auth.checkAuth(token)
    .then(profile => {
      //fail = skip
      if (profile === null)
        res.send(false);
      res.send(profile);
    });
};

const postUserOrder = async (req, res) => {
  const {token} = req.body;
  const profile = await auth.checkAuth(token);
  if (profile === null) {
    res.status(403).send({error:'No Such User'});
  }
  let purchases = await pool.query('SELECT * FROM purchase WHERE userid = $1', [
    profile.userid
  ]);
  purchases = purchases.rows;
  res.send({purchases});
};

module.exports = {
    postUserOrder,
    postUserInfo,
    getAllBooks,
    getBookById,
    getBooksByAuthor,
    getBooksByCategory,
    searchBooks,
    getAuthors,
    getCategories,
    getUserById,
    postNewUser,
    postNewBook,
    postNewEmailReset,
    postNewAuthor,
    postNewCategory,
    postNewOrder,
    postLogin,
    updatePassword
}
