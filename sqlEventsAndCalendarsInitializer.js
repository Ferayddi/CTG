// MUST BE RAN TO CREATE THE DATABASE

/* 
id: 'event3',
    calendarId: 'cal2',
    title: 'Vacation',
    start: '2023-01-12',
    end: '2023-01-19',
    isAllday: true,
    category: 'allday',
*/

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite');

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS Events", (error) => {if (error){ console.log("error when dropping table Events if exists")} });

    db.run(`CREATE TABLE IF NOT EXISTS Events(
       id TEXT PRIMARY KEY,
       calendarId TEXT,
       title TEXT NOT NULL, 
       body TEXT DEFAULT '',
       start TEXT NOT NULL,
       end TEXT NOT NULL,
       category TEXT NOT NULL,
       isAllday INTEGER,
       color TEXT DEFAULT ''   
       )`,         // Not sure if Color should have empty default
       (error) => {         //fail to create table!
        if (error) {
            console.log("Failed to create the Events table");
        }
            
       }
       ); 
       
    // CREATING THE CALENDAR DATABASE:
    db.run("DROP TABLE IF EXISTS Calendars", (error) => {if (error) {console.log("error with dropping calendar clause")}});

    db.run(`CREATE TABLE IF NOT EXISTS Calendars(
       id TEXT PRIMARY KEY,
       name TEXT NOT NULL,
       backgroundColor TEXT NOT NULL
       )`,         // 
       (error) => {         //fail to create table!
        if (error) {
            console.log("Failed to create the Calendars table");
        }
            
       }
       );

});

db.close();