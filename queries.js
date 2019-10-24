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
        if(error) {
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
    var address = null;
    var usertype = 'user';
    if (req.body.address) {
        address = req.body.address;
    }
    if (req.body.usertype) {
        usertype = req.body.usertype;
    }

    pool.query('INSERT INTO site_user (email, salt, password, address, usertype) VALUES ($1, $2, $3, $4, $5)',
        [email, salt, password, address, usertype],
        (error, result) => {
            if (error) {
                throw error;
            }

            res.status(201).send(`User added with ID: ${result.userid}`);
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
    postNewUser
}