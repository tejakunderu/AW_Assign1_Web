var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');


mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'aw_tejakunderu',
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: false },
    name: 'aw_tejakunderu',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Launched on port ' + port);
