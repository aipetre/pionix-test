var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Get redis
var redis = require("redis");

// Initialize session and pass it to Redis Store.
var session = require('express-session');
var redisStore = require('connect-redis')(session);

// Initialize Redis client.
var client  = redis.createClient();

var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    secret: 'my_super_secret',
    // create new redis store.
    // Note: Setting 5 minutes time to live for sessions
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  5 * 60}),
    saveUninitialized: false,
    resave: false
}));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dashboard', checkSession, dashboard);
app.use('/projects', checkSession, projects);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/**
 * @function checkSession Checks if an user is associated with this session
 * @param req Request object..
 * @param res Response object.
 * @param next Middleware function.
 * @returns boolean
 */
function checkSession(req, res, next) {
    if (!req.session.username) {
        console.log("No session available");
        req.session.invalid = true;

        // Check if ajax request
        if (req.xhr) {
            // Send unathorized
            res.status(401).send();
        } else {
            // Redirect to page
            res.redirect('/signin');
        }
    } else {
        next();
    }
}


module.exports = app;
