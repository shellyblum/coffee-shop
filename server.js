require('rootpath')();
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);

// routes
// app.use('/login', require('./routes/login'));
// app.use('/register', require('./routes/register'));
// app.use('/public', require('./routes/app'));
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/contacts', require('./routes/api/contacts'));

var passport = require('passport');
// require('./config/passport')(passport); // pass passport for configuration
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('./models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

	passport.use('local-login', new LocalStrategy(
	  function(username, password, done) {
	    User.findOne({
	      username: username.toLowerCase()
	    }, function(err, user) {
	      // if there are any errors, return the error before anything else
           if (err)
               return done(err);

           // if no user is found, return the message
           if (!user)
               return done(null, false);

           // if the user is found but the password is wrong
           if (!user.validPassword(password))
               return done(null, false); 

           // all is well, return successful user
           return done(null, user);
	    });
	  }
	));
};

app.use(passport.initialize());
app.use(passport.session());

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/components/views/home/home.html'));
// });

// routes ======================================================================
require('routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport

// start server
app.listen(3000, () => console.log('Listening on port 3000'));