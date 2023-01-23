const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./assets/db.sqlite');


function addEventToTable (event) {
    db.run(
        `
        INSERT INTO Events 
        (id, calendarId, title, body, start, end, category, isAllday, color)
        VALUES ($id, $calendarId, $title, $body, $start, $end, $category, $isAllday, $color)
        `,
        {
            $id: event.id,
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
            if (error ) {
                console.log("error, the current ID of event is:" + event.id);
                console.log(error);
                
            }
            
            
        }
    );
}


function addCalendarToTable (calendar) {
    db.run(
        `
        INSERT INTO Calendars 
        (id, name, backgroundColor)
        VALUES ($id, $name, $backgroundColor)
        `,
        {
            $id: calendar.id,
            $name: calendar.name,
            $backgroundColor: calendar.backgroundColor,
        },
        function(error)  {
            if (error ) {
                console.log("error, the current ID of Calendar is:" + calendar.id);
                console.log(error);
                
            }
            
            
        }
    );
}

//WILL BE MOVED TO A SQL DATABASE, FOR WHICH BEFORE THE CALENDAR IS INITIATED, AND GET REQUEST WILL INVOKE db.all

    cal1 = {
        id: '0',
        name: 'Personal',
        backgroundColor: '#03bd9e',
    };
    cal2 = {
        id: '1',
        name: 'Work',
        backgroundColor: '#00a9ff',
    };



event1 = {
    id: '0',
    calendarId: '0',
    body: '',
    color: '',
    category: '',
    isAllday: 0,
    title: 'Weekly meeting',
    // start: '2023-01-01T09:00:00',
    // end: '2023-01-04T10:00:00',
    start: '2023-01-01',
    end: '2023-01-04',  
};

event2 = {
    id: '1',
    calendarId: '1',
    title: 'Lunch appointment',
    start: '2023-01-03T12:00:00',
    end: '2023-01-08T13:00:00',
    color: '',
    category: 'time',
    isAllday: 0,
    body: ''
};

event3 = { 
    id: '2',
    calendarId: '2',
    title: 'Vacation',
    start: '2023-01-01T12:00:00',
    end: '2023-01-03T12:00:00',
    isAllday: true,
    category: 'allday',
    color: '', 
    body: ''
};

addEventToTable(event1);
addEventToTable(event2);
addEventToTable(event3);
addCalendarToTable (cal1);
addCalendarToTable (cal2);