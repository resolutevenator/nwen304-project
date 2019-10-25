const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nwen304_groupproject',
    password: 'password',
    port: 5432
});

const getAllBooks = (req, res) => {
    pool.query('SELECT * FROM book ORDER BY bookid ASC', (error, result) => {
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
    const salt = req.body.salt;
    const password = req.body.password;
    const address = req.body.address;
    var usertype = 'user';
    if (req.body.usertype) {
        usertype = req.body.usertype;
    }

    pool.query('INSERT INTO site_user (email, salt, password, address, usertype) VALUES ($1, $2, $3, $4, $5)',
    [email, salt, password, address, usertype],
    (error, result) => {
        if (error) {
            throw error;
        }
        
        res.status(201).send(`User added`);
    })

}

const postNewBook = (req, res) => {
    const {title, description, stock, author, category} = req.body;

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
    const {userid, code} = req.body;

    const timeRequested = new Date();

    pool.query('INSERT INTO email_reset VALUES ($1, $2, $3)',
    [userid, timeRequested, code],
    (error, result) => {
        if (error) {
            throw error;
        }

        res.status(201).send('Email Reset added');
    })
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


module.exports = {
    getAllBooks,
    getBookById,
    getBooksByAuthor,
    getBooksByCategory,
    getAuthors,
    getCategories,
    getUserById,
    postNewUser,
    postNewBook,
    postNewEmailReset,
    postNewAuthor,
    postNewCategory
}