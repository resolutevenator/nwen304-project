var express = require('express');
var app = express();

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow ,
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-ControlAllow-Headers');
    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

// app.use(express.static(__dirname+'/index.html'));

var port = process.env.PORT || 8080;

var books = {
    0: { name: "Book 1", description: "Book 1 from best selling horror author jim", category: "horror", author: "Jim", key: 0 },
    1: { name: "Book 2", description: "Book 2 is amazing", category: "comedy", author: "Mike", key: 1 },
    2: { name: "Book 3", description: "Book 3 is the best", category: "comedy", author: "Mike", key: 2 },
    3: { name: "Book 4", description: "Book 4 is pretty good", category: "comedy", author: "Mike", key: 3 },
    4: { name: "Book 5", description: "Book 5", category: "teen drama", author: "Stephanie", key: 4 },
};

app.get('/books', (req, res) => {
    return res.send(books);
});

app.get('/books/:bookId', (req, res) => {
    return res.send(books[req.params.bookId]);
});

app.get('/books/author/:author', (req, res) => {
    var toSend = {}
    Object.keys(books).forEach((bookId) => {
        const book = books[bookId];
        if(book.author === req.params.author) {
            toSend[bookId] = book;
        }
    });

    return res.send(toSend);
});

app.get('/books/category/:category', (req, res) => {
    var toSend = {}
    Object.keys(books).forEach((bookId) => {
        const book = books[bookId];
        if(book.category === req.params.category) {
            toSend[bookId] = book;
        }
    });

    return res.send(toSend);
});

// app.post('/tasks', (req, res) => {
//     const task = {
//         done: req.body.done,
//         name: req.body.name,
//         id: req.body.id
//     }
//     tasks[req.body.id] = task;
//     return res.send(task);
// });

// app.put('/tasks/:taskId', (req, res) => {
//     if(tasks[req.params.taskId]) {
//         const task = {
//             done: req.body.done,
//             name: req.body.name,
//             id: req.body.id
//         }
//         tasks[req.params.taskId] = task;
//         return res.send(task);
//     }
//     return res.send(null);
// });

// app.delete('/tasks/:taskId', (req, res) => {
//     const task = tasks[req.params.taskId];
//     if(task) {
//         delete tasks[req.params.taskId];
//         return res.send(task);
//     }
//     return res.send(null);;
// });

app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});