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

// var books = {
//     0: { name: "Book 1", description: "Book 1 from best selling horror author jim", category: "horror", author: "Jim", key: 0 },
//     1: { name: "Book 2", description: "Book 2 is amazing", category: "comedy", author: "Mike", key: 1 },
//     2: { name: "Book 3", description: "Book 3 is the best", category: "comedy", author: "Mike", key: 2 },
//     3: { name: "Book 4", description: "Book 4 is pretty good", category: "comedy", author: "Mike", key: 3 },
//     4: { name: "Book 5", description: "Book 5", category: "teen drama", author: "Stephanie", key: 4 },
// };

app.get('/books', db.getBooks);

// app.get('/books/:bookId', (req, res) => {
//     return res.send(books[req.params.bookId]);
// });

// app.get('/books/author/:author', (req, res) => {
//     var toSend = {}
//     Object.keys(books).forEach((bookId) => {
//         const book = books[bookId];
//         if(book.author === req.params.author) {
//             toSend[bookId] = book;
//         }
//     });

//     return res.send(toSend);
// });

// app.get('/books/category/:category', (req, res) => {
//     var toSend = {}
//     Object.keys(books).forEach((bookId) => {
//         const book = books[bookId];
//         if(book.category === req.params.category) {
//             toSend[bookId] = book;
//         }
//     });

//     return res.send(toSend);
// });

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});