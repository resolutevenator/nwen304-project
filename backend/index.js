const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bodyParser = require('body-parser');
const db = require('./queries');
const app = express();
var cors = require('cors')
const port = process.env.PORT || 3000;

const GOOGLE_CLIENT_ID = '366847591685-dj320hdl97g04dop53ddb55fvo0mb3d1.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'iPq4dp03vX-CSJg110HnoqaP';

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);



passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
      done(null, profile.emails[0].value);
      // done(profile.emails[0].value, true);
       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
       //   return done(err, user);
       // });
  }
));

app.get('/books', db.getAllBooks);

app.get('/books/:bookid', db.getBookById);

app.get('/books/author/:authorid', db.getBooksByAuthor);

app.get('/books/category/:categoryid', db.getBooksByCategory);

app.get('/books/search/:query', db.searchBooks);

app.get('/authors', db.getAuthors);

app.get('/categories', db.getCategories);

app.get('/user/:userid', db.getUserById);

app.post('/user/newuser', db.postNewUser);

app.post('/user/info', db.postUserInfo);

app.post('/books/newbook', db.postNewBook);

app.post('/user/passwordreset', db.postNewEmailReset);

app.post('/user/orders', db.postUserOrder);

app.post('/authors/new', db.postNewAuthor);

app.post('/categories/new', db.postNewCategory);

app.post('/neworder', db.postNewOrder);

app.post('/login', db.postLogin);

app.put('/user/updatepassword', db.updatePassword);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.email'],
        session : false
  }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',
  session: false}),
  function(req, res) {
    console.log(req.user);
    res.redirect('/');
  });

app.use(express.static('../frontend/build'));

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
