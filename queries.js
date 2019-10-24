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



module.exports = {
    getAllBooks,
    getBookById,
    getBooksByAuthor,
    getBooksByCategory
}