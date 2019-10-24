const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({info: 'Node.js, Express, Postgres'})
});

app.get('/books', db.getAllBooks);

app.get('/books/:bookid', db.getBookById);

app.get('/books/author/:authorid', db.getBooksByAuthor);

app.get('/books/category/:categoryid', db.getBooksByCategory);

app.get('/authors', db.getAuthors);

app.get('/categories', db.getCategories);

app.get('/user/:userid', db.getUserById);

app.post('/user/newuser', db.postNewUser);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});