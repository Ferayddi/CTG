var flash = require('connect-flash');
var express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite');
const morgan = require('morgan');

//FOR PASSPORT: 
const passport = require('passport');
var LocalStrategy = require('passport-local');

var router = express.Router();
router.use(morgan('dev'));



passport.use(new LocalStrategy(function verify(username, password, cb) {
    console.log(username);
    console.log(password);
    // console.log("hello"); works
    db.serialize (() => {
        db.get('SELECT * FROM Users WHERE username = ?', [ username ], function(err, user) {
            if (err) { console.log("error"); console.log(err); cb(err); 
            } else if (user === undefined) { console.log('Incorrect username or password.'); cb(null, false, { message: 'Incorrect username or password.' }); 
            } else if (user.password !== password) {
              console.log('Incorrect username or password.');
                cb(null, false, { message: 'Incorrect username or password.' });
            } else {
                cb(null, user);
            }
          });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});
  
passport.deserializeUser(function(username, done) {
    db.get(
        `SELECT * FROM Users WHERE username = $username `,
        {
            $username: username
        },
        (err, row) => {
            if (err) { console.log("deserialization error");}
            if (row === undefined) {console.log("user not found");}
            else {
                console.log("deserialization succes!")
                done(err, row);
            }
        }
    );
});


router.use(flash());

router.get('/check', (req, res, next) => {
    var checked;
    if (req.user) {
        checked = 1;
        //console.log(checked);
        res.status(200).send({loggedIn: checked});
    } else {
        checked = 0;
        //console.log(checked);
        res.status(200).send({loggedIn: checked});
    }
});

router.post('/password', (req,res,next) => {
    /* note that all the following is still in the stack declaration, and we are just defining what the callback function will do: */
    passport.authenticate('local',  function(err, user, info) {
        if (err) { return next(err);   // res.redirect('/signIn/');
        } else if (!user) {res.redirect('/signIn/'); 
        }   else  { req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/index/');
        });}
    })(req,res,next);
    /* //////////////////////////////////////////////////////////////////////////////////*/
    /*  Now we are in the actual post function:*/
});





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