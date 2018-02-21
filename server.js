require('rootpath')();
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const expressJwt = require('express-jwt');
// const config = require('config.json');
// var contactService = require('services/contact.service');

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);


// use JWT auth to secure the api
// app.use('/api', expressJwt({ secret: 'secret' }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
// app.use('/login', require('./routes/login'));
// app.use('/register', require('./routes/register'));
// app.use('/public', require('./routes/app'));
// app.use('/api/users', require('./routes/api/users'));
app.use('/api/contacts', require('./routes/api/contacts'));

// router.post('/login', function (req, res) {
//     const username = JSON.stringify(req.body.username);
//     const password = JSON.stringify(req.body.password);
//     const currentUser = JSON.stringify("user");
//     const currentPass = JSON.stringify("pass");

//     if(username === currentUser && password === currentPass){
//         res.send('ok');
//     }else{
//         res.send('error');
//     }
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/components/views/home/home.html'));
});


// start server
app.listen(3000, () => console.log('Listening on port 3000'));