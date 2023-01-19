const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
/*
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite'); */


var indexRouter = require('./index.js');
var signInRouter = require('./signIn.js');
var eventsRouter = require('./events.js');
var calendarRouter = require('./calendar.js');
var aboutRouter = require('./about.js');
//var authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/node_modules", express.static('./node_modules'));
app.use("/resourceAPI.js",express.static('./public/resourceAPI.js'));
app.use('/calendars', calendarRouter);
app.use('/events', eventsRouter);
app.use('/index', indexRouter);
app.use('/about', aboutRouter);
app.use('/signIn', signInRouter);
//app.use('/', authRouter);


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;