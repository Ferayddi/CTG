var express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite');

var router = express.Router();


router.use(morgan('common'));
router.use(bodyParser.json());


//HELPER
function uniqueID(req, res, next) {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    req.body.id = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    next();
}

//Retrieving all the calendars:
router.get("/", (req, res, next) => {
    db.all(
        `SELECT * FROM Calendars`,
        (error, rows) => {
            if (error) {
                return res.sendStatus(500);
            }
            return res.status(200).send({calendars: rows});
        }
    );
} );

//deleting a calendar
router.delete('/:name', (req, res, next) => {
    db.serialize( () => {
        db.get(`SELECT id FROM Calendars WHERE name=$name `,
        {
            $name:req.params.name
        },
        (error, row) => {
            id = row.id;
            db.run(`DELETE FROM Events WHERE calendarId = $id`,
            {
                $id: id
            },
            (error) => {
                if (error) {
                    console.log(error);
                }
            });
        });
        
        db.run(`DELETE FROM Calendars WHERE name = $name;`,
        {
            $name: req.params.name
        },
        (error) => {
            if (error) {
                return res.sendStatus(500);

            }
            return res.status(200).send();
        }
        );
    });
     
});





//Posting a new calendar
router.post("/", uniqueID,  (req, res, next) => {
    var calendar = req.body.calendar;
    calendar.id = req.body.id;    // attached by the uniqueID middleware

            db.run(
                `
                INSERT INTO Calendars 
                (id, name, backgroundColor)
                VALUES ($id, $name, $backgroundColor)
                `,
                {
                    $id: calendar.id,  // event.id, set by the function uniqueID()
                    $name: calendar.name,
                    $backgroundColor: calendar.backgroundColor
                },
                function(error)  {
                    if (error) {
                        if (error.errno === 19) {  //sqlite constraint
                            uniqueID(req, res, next);   //re run ID assignment middleware  REVIEW HERE, MIGHT NOT WORK
                        }
                        console.log("Error with post calendar db run, which isnt a sqlite constraint error");
                        console.log(error);
                        return res.sendStatus(500);
                    }
                    return res.status(201).send({id: calendar.id});
                    
                }
            ); 
    
});


module.exports = router;