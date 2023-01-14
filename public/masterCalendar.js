
// When document ready then lunch: 
function setUpMasterCalendar(calendarArray) {
    var CALENDARS = getCalendars();
    createCalendar(CALENDARS,calendarArray);
    EVENTS = getEvents();
    masterCalendar.createEvents(EVENTS);
}





function createCalendar (CALENDARS,calendarArray) {
    masterCalendar = new Calendar('#calendar', {
        defaultView: 'week',
        calendars: CALENDARS,
        usageStatistics: false,
        useFormPopup: true,
        useDetailPopup: true,
        template: {
            monthGridHeader: function (data) {
                var date = parseInt(data.date.split('-')[2], 10);
    
                return (
                  date +
                  '/' +
                  '<span class="calendar-month-header" style="margin-left: 4px;">' +
                  (data.month + 1)+
                  '</span>'
                );
              }
        },
    });

    
    
    masterCalendar.setTheme({
        common: {
            gridSelection: {
            backgroundColor: 'rgba(81, 230, 92, 0.05)',
            border: '1px dotted #515ce6',
            },
        },
        month: {
            weekend: {
              
            },
          },
    });

    //Coding the delete event: DONE
    masterCalendar.on('beforeDeleteEvent', (eventObj) => {
        //Updating visually:
        var i = CALENDARS.findIndex( (value) => value.id === eventObj.calendarId);
        calendarArray[i].calendar.deleteEvent(eventObj.id, eventObj.calendarId);

        masterCalendar.deleteEvent(eventObj.id, eventObj.calendarId);
        //updating database:
        deleteEvent(eventObj.id);
    });


    // CODING THE UPDATE EVENT:  DONE
    masterCalendar.on('beforeUpdateEvent', function ({ event, changes }) {
        const { id, calendarId } = event;
        // Updating visually:
        var i = CALENDARS.findIndex( (value) => value.id === calendarId);
        calendarArray[i].calendar.updateEvent(id, calendarId, changes);

        masterCalendar.updateEvent(id, calendarId, changes);

        //Now updating in server side:
        var object = {
            object: {
                ...changes
                
            }
        };
        //change into the format I am working on
        if (object.object.hasOwnProperty('start')) {  object.object['start'] = object.object.start.d.d.toString(); }
        if (object.object.hasOwnProperty('end')) {  object.object['end'] = object.object.end.d.d.toString(); }
        updateEvent(object, id);  // own function for database update
    });



    //CODING THE CREATE EVENT:  DONE
    masterCalendar.on('beforeCreateEvent', (eventObj) => {
        //Call the function to post the variable toPost to the dataBase:
        //MUST BE CODED TO RETURN THE ID OF THE EVENT
        var theID=  postEvent(eventObj);
        // Use createEvents method here, to visually update the table:
        eventObj2 = toPost.event;

        var i = CALENDARS.findIndex( (value) => value.id === eventObj.calendarId);

        calendarArray[i].calendar.createEvents([
            {
                ...eventObj2,
                id: theID,
            },
        ]);

        masterCalendar.createEvents([
            {
                ...eventObj2,
                id: theID,
            },
        ]);
    });

     //attaching the function to the buttons: Must be done after calendar is defined!
     //IMPORTANT ALL OF THIS IS STILL IN THE FUNCTION WHICH IS CALLED WHEN DOCUMENT IS READY

     $("#switchMonthWeekButton").on("click", function() {
        var currentView = masterCalendar.getViewName();
        if (currentView === "week") {
            masterCalendar.changeView('month');
           
        }
        if (currentView === "month") {
            masterCalendar.changeView('week');
           
        }
     });

} 



        


