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
                    (error, result) => {
                        if (error) {
                            throw error;
                        }
                    })

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
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

function postLogin(req, res) {
    const { email, password } = req.body;
    pool.query('SELECT * FROM site_user WHERE email = $1;', [email])
        .then(({ rows }) => {
            const auth = bcrypt.compareSync(req.body.password, rows[0].password);
            res.send(auth);
        });

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
    postLogin
}
