var express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite');
//const bodyParser = require('body-parser');
const morgan = require('morgan');


var router = express.Router();


router.use(morgan('common'));
//router.use(bodyParser.json());
router.use(express.static('./public/index'));





module.exports = router;