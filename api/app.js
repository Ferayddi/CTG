const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
/*
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite'); */


var indexRouter = require('./index');
//var authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', indexRouter);
//app.use('/', authRouter);











app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;