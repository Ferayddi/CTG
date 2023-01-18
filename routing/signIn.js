var express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite');

var router = express.Router();


router.use(morgan('common'));
router.use(bodyParser.json());
router.use(express.static('./public/signIn'));


module.exports = router;