const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

var indexRouter = require('./index.js');
var signInRouter = require('./signIn.js');
var eventsRouter = require('./events.js');
var calendarRouter = require('./calendar.js');
var aboutRouter = require('./about.js');
//var authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('common'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.authenticate('session'));


app.use("/node_modules", express.static('./node_modules'));
app.use("/resourceAPI.js",express.static('./public/resourceAPI.js'));
app.use("/common.css", express.static('./public/common.css'));
app.use("/photos", express.static("./public/photos/"));
app.use('/calendars', calendarRouter);
app.use('/events', eventsRouter);
app.use('/index', indexRouter);
app.use('/about', aboutRouter);
app.use('/signIn', signInRouter);
//app.use('/', authRouter);

/*
app.use(passport.initialize());
app.use(passport.session());
*/


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;