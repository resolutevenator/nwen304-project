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

var books = {0: {name: "Book 1", description: "this is a book", key: 0}};

app.get('/books', (req, res) => {
    return res.send(books);
});

app.get('/books/:bookId', (req, res) => {
    return res.send(books[req.params.bookId]);
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

app.listen(port, function() {
    console.log('Example app listening on port 8080!');
});