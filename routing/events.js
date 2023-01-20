var express = require('express');
//const bodyParser = require('body-parser');
const morgan = require('morgan');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite');

var router = express.Router();


router.use(morgan('common'));
//router.use(bodyParser.json());
router.use(require('body-parser').json());

// HELPER:
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

function updateSingleKey(id, key, value,callback) {
    task = `UPDATE Events SET ${key} = $value WHERE id = $id`
    db.serialize(() => {
        db.run(
            task,
            {
                $value: value,
                $id: id
            },
            (error) => {
                if (error) {
                    console.log(error);
                    callback(false);
                    
                } else {
                    callback(true);
                    
                }
            }
        );
    });
}

const processEvent = (req, res, next) => {
    if (req.body.event.body === undefined) {
        req.body.event.body = "";
    }
    if (req.body.event.category === undefined) {
        req.body.event.category = "time";
    }
    if (req.body.event.color === undefined) {
        req.body.event.color = "";
    }
    if(req.body.event.isAllday === true || req.body.event.isAllday === 1 ) {
        req.body.event.category = "allday"
    }
    
    next();

};

checkRights = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(403).send();
    }
}


//Deleteting an event:
router.delete('/:id',checkRights, (req, res,next) => {
    db.run(
        `DELETE FROM Events WHERE id = $id;`,
        {
            $id: req.params.id
        },
        (error) => {
            if (error) {
                return res.sendStatus(500);
            }
            return res.status(200).send();
        }
    );
  })

//updating an event
router.put('/:id',checkRights, (req, res, next) => {
    var id = req.params.id;
    var bool;

    var object = req.body.object;
    for (const [key, value] of Object.entries(object)) {
        //console.log(`${key}: ${value}`);
        bool = updateSingleKey(id, key, value, (bool) =>{
            if (bool === 0) {
                return res.sendStatus(500);
            }
            
        });
        
      }
      return res.status(202).send();

});

//Retrieving all the events:
router.get("/", (req, res, next) => {
    db.all(
        `SELECT * FROM Events`,
        (error, rows) => {
            if (error) {
                return res.sendStatus(500);
            }
            return res.status(200).send({events: rows});
        }
    );
} );

//Retrieving events from calendarId:
router.get("/:calendarId", (req, res, next) => {
    db.all(
        `
            SELECT * FROM Events
            WHERE calendarId=$calendarId
        `,
        {
            $calendarId: req.params.calendarId
        },
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.sendStatus(500);
            }
            return res.status(200).send({events: rows});
        }
    );
} );



//Posting a new event
router.post("/",checkRights, processEvent, uniqueID,  (req, res, next) => {
    var event = req.body.event;
    event.id = req.body.id;
            db.run(
                `
                INSERT INTO Events 
                (id, calendarId, title, body, start, end, category, isAllday, color)
                VALUES ($id, $calendarId, $title, $body, $start, $end, $category, $isAllday, $color)
                `,
                {
                    $id: event.id,  // event.id, set by the function uniqueID()
                    $calendarId: event.calendarId,
                    $title: event.title,
                    $body: event.body,
                    $start: event.start,
                    $end: event.end,
                    $category: event.category,
                    $isAllday: event.isAllday,
                    $color: event.color
                },
                function(error)  {
                    if (error) {
                        if (error.errno === 19) {  //sqlite constraint
                            uniqueID(req, res, next);   //re run ID assignment middleware
                        }
                        console.log("Error with post db run, which isnt a sqlite constraint error");
                        console.log(error);
                        return res.sendStatus(500);
                    }
                    return res.status(201).send({id: event.id});
                    
                }
            ); 
    
});


module.exports = router;