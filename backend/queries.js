const Pool = require('pg').Pool;
const bcrypt = require('bcryptjs');
const Fuse = require('fuse.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
    }
});

const getAllBooks = (req, res) => {
    pool.query('SELECT bookid, title, author.name as author, description, category.name AS category, stock FROM book INNER JOIN author ON authorid=author INNER JOIN Category ON category=categoryid', (error, result) => {
        if (error) {
            throw error;
        }

        res.status(200).json(result.rows);
    })
}

const getBookById = (req, res) => {
    const bookid = parseInt(req.params.bookid);

    pool.query('SELECT * FROM book WHERE bookid = $1', [bookid], (error, result) => {
        if (error) {
            throw error;
        }

        res.status(200).json(result.rows);
    })
}

const getBooksByAuthor = (req, res) => {
    const authorid = parseInt(req.params.authorid);

    pool.query('SELECT * FROM book WHERE author = $1', [authorid], (error, result) => {
        if (error) {
            throw error;
        }

        res.status(200).json(result.rows);
    })
}

const getBooksByCategory = (req, res) => {
    const categoryid = parseInt(req.params.categoryid);

    pool.query('SELECT * FROM book WHERE category = $1', [categoryid], (error, result) => {
        if (error) {
            throw error;
        }

        res.status(200).json(result.rows);
    })
}

const searchBooks = (req, res) => {
    pool.query('SELECT bookid, title, description, author.name as authorname, category.name as categoryname FROM book INNER JOIN author ON book.author = author.authorid INNER JOIN category ON book.category = category.categoryid', (error, result) => {
        if (error) {
            throw error;
        }

        const query = req.params.query;

        const fuse = new Fuse(result.rows, searchOptions);
        const searchResults = fuse.search(query);

        res.status(200).json(searchResults);
    })
}

const getAuthors = (req, res) => {
    pool.query('SELECT * FROM author ORDER BY authorid ASC', (error, result) => {
        if (error) {
            throw error;
        }

        res.status(200).json(result.rows);
    })
}

const getCategories = (req, res) => {
    pool.query('SELECT * FROM category ORDER BY categoryid ASC', (error, result) => {
        if (error) {
            throw error;
        }

        res.status(200).json(result.rows);
    })
}

const getUserById = (req, res) => {
    const userid = parseInt(req.params.userid);

    pool.query('SELECT * FROM site_user WHERE userid = $1', [userid], (error, result) => {
        if (error) {
            throw error;
        }

        res.status(200).json(result.rows);
    })
}

const postNewUser = (req, res) => {
    const email = req.body.email;

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
                throw error;
            }
            res.status(201).send(`User added`);
        })

}

const postNewBook = (req, res) => {
    const { title, description, stock, author, category } = req.body;

    pool.query('INSERT INTO book (title, description, stock, author, category) VALUES ($1, $2, $3, $4, $5)',
        [title, description, stock, author, category],
        (error, result) => {
            if (error) {
                throw error;
            }

            res.status(201).send(`Book added`);
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
                            throw error;
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
                    } else {
                        console.log(response);
                    }
                })
            } else {
                console.log("email not in database");
            }
        }
        );
    res.status(200).send('okay');

}

const postNewAuthor = (req, res) => {
    const name = req.body.name;

    pool.query('INSERT INTO author VALUES ($1)',
        [name],
        (error, result) => {
            if (error) {
                throw error;
            }

            res.status(201).send('Author added');
        })
}

const postNewCategory = (req, res) => {
    const name = req.body.name;

    pool.query('INSERT INTO category VALUES ($1)',
        [name],
        (error, result) => {
            if (error) {
                throw error;
            }

            res.status(201).send('Category added');
        })
}

const postNewOrder = (req, res) => {
    // important, make sure that productid is an array, even if its just one item
    const { userToken, productid, cost } = req.body;
    var address = req.body.address;
    const status = 'processing';
    const time = new Date();

    // TODO: get user
    const email = null;

    // get the user's information
    pool.query('SELECT userid, address, FROM site_user WHERE email = $1',
        [email],
        (error, result) => {
            if(error) {
                console.log(error);
            }
            if (result.rows[0]) {
                const userid = result.rows[0].userid;
                if (!address) {
                    // address should be null if the user selected to ship to a saved address
                    // this could be removed, and have the front end get, then send, the saved address
                    address = result.rows[0].address;
                }

                pool.query('INSERT INTO purchase VALUES ($1, $2, $3, $4, $5, $6)',
                    [userid, productid, time, address, cost, status],
                    (error, result) => {
                        if(error) {
                            //todo: decide how to handle error
                            //do we need a check that each item exists?
                            //do we need a check that each item has stock?
                        }

                        productid.foreach(product => {
                            pool.query('UPDATE book SET stock = stock - 1 WHERE bookid = $1',
                            [product]);
                        })

                        res.status(201).send('Purchased :)');
                        return;
                    })
            } else {
                console.log("no user");
            }
        })
        res.status(500).send('error');
}

function postLogin(req, res) {
    const { email, password } = req.body;
    pool.query('SELECT * FROM site_user WHERE email = $1;', [email])
        .then(({ rows }) => {
            const auth = bcrypt.compareSync(req.body.password, rows[0].password);
            res.send(auth);
        });

}

const updatePassword = (req, res) => {
    const { code, newPassword } = req.body;

    pool.query('SELECT * FROM email_reset WHERE code = $1',
        [code],
        (error, result) => {
            if (error) {
                throw error;
            }

            if (result.rows[0]) {
                const userid = result.rows[0].userid;
                const password = bcrypt.hashSync(newPassword, 8);

                pool.query('UPDATE site_user SET password = $1 WHERE userid = $2',
                    [password, userid]);

                pool.query('DELETE FROM email_reset WHERE code = $1',
                    [code]);

                res.status(201).send('Password Updated Successfully');
            }
        })
}

module.exports = {
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
