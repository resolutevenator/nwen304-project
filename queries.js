const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nwen304_groupproject',
    password: 'password',
    port: 5432
});

const getBooks = (req, res) => {
    pool.query('SELECT * FROM book ORDER BY id ASC', (error, result) => {
        if(error) {
            throw error;
        }

        res.status(200).json(result.rows);
    })
}

module.exports = {
    getBooks,
}