var express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite');
const bodyParser = require('body-parser');
const morgan = require('morgan');


var router = express.Router();


router.use(morgan('common'));
router.use(bodyParser.json());


router.get("/", (req,res,next) => {
    res.sendFile("./signIn/signIn.html", {root: './public'});
});
router.get("/style.css", (req,res,next) => {
    res.sendFile("./signIn/style.css", {root: './public'});
});
router.get("/signIn.js", (req,res,next) => {
    res.sendFile("./signIn/signIn.js", {root: './public'});
});





module.exports = router;