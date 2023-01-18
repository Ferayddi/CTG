



const Calendar = tui.Calendar;
const colorPicker = tui.colorPicker;


function updateDateShown(calendarArray) {
    if (calendarArray.length > 0) {
        var currentRange = calendarArray[0].calendar.getDateRangeStart();
        $(".rangeShown").text("From " +currentRange.getDate() + "/" + currentRange.getMonth() +1 + "/" + currentRange.getFullYear() + " onwards");
    } else {
        $(".rangeShown").text("");
    }
   
    
}

// When document ready then lunch: 
$(document).ready( function() {
    var CALENDARS = getCalendars();
    setUpCalendar(CALENDARS, setUpCreateCalendarModal, setUpDeleteCalendarModal); // the events are created at the end of Set Up calendar    

});



// Settinp up the modal for Delete Calendar ( Written: "Delete Good ")
function setUpDeleteCalendarModal() {
    $("#deleteCaledarToggleButton").on("click", function() {
        var cals = getCalendars();
        $("#deleteCalendarFormSelect").empty();
        cals.forEach((value) => {
            $("#deleteCalendarFormSelect").append(`<option> ${value.name} </option>`);
        });

    });

    $("#deleteCalendarButton").on("click", function() {
        var selected = $("#deleteCalendarFormSelect").val();
        if (selected !== "") {  
            //in database:
            deleteCalendar(selected);
            //visually:
            location.reload();
        }
    });
}

// Settinp up the modal for Create Calendar ( Written: "Create Good ")
function setUpCreateCalendarModal() {
    const container = document.getElementById('tui-color-picker-container');
    const myColorPicker = colorPicker.create({
        container: container,
        usageStatistics: false
    });

    $("#createCalendarButton").on ("click", 
        function () {
            var color = myColorPicker.getColor();
            var name = document.getElementById('calendarNameInput').value;
            //check if name is not unique! If not unique then error!
            var calendars = getCalendars();

            //`problem with forEach is that the loop does not stop and you cant break out of t
            var found = false;
            for (var i = 0; i < calendars.length; i++){
                if (calendars[i].name === name) {
                    found = true;
                }
            }
            if (found) { $("#errorNameNotUniqueModal").modal('toggle'); return;}
            // TO FINISH, SHOW ERROR MODAL!
            
            // post calendar to database:
            var postObj = {
                name: name,
                backgroundColor: color,
            };
            var id = postCalendar(postObj);
            postObj.id = id;  // calendar object
            //now do same as when we load calendars
            location.reload(); 
        });
    

}

function setUpCalendar (CALENDARS, setUpCreateCalendarModal, setUpDeleteCalendarModal) {
    var calendarArray = [];
    OPTIONS= {
        defaultView: 'week',
        calendars: CALENDARS,      // try to remove this, should be useless
        usageStatistics: false,
        useFormPopup: true,
        useDetailPopup: true,
        theme: {
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
        },
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
              },
        },
    };


    ///////////////////////// CREATE ONE CALENDAR INSTANCE FOR EACH CALENDAR //////////////////////////////////////////////////////////////
    CALENDARS.forEach((value, index) => {
        var localArray = [];
        localArray.push(value);
        OPTIONS.calendars = localArray;
        
        OPTIONS.template = {
            alldayTitle() {
              return `<span>${value.name}</span>`;
            },
          };
        $("#CalendarContainer").append(`<div id="calendar${index}" ></div>`); // style="height: 600px"
        if (index != 0) {
            //hiding the title of the valendar which shows the days name, but we only want one, at the top!
            var style = $(`<style> #calendar${index} .toastui-calendar-week-view-day-names { display:none;visibility: hidden; }</style>`);
            $('html > head').append(style);
        }
        //hiding the day view part of the calendar:
        var style = $(`<style> #calendar${index} div.toastui-calendar-panel:nth-child(8) { display:none;visibility: hidden; }</style>`);
        $('html > head').append(style);

        calendarCreated = new Calendar(`#calendar${index}`, OPTIONS);
        calendarArray.push({id: value.id, calendar : calendarCreated} );


    });
    
    //////////////Setting up the master calendar, which function's reside in another js file//////////////////////////////////////////////////////////////////////////////////

    setUpMasterCalendar(calendarArray);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updateDateShown(calendarArray);   // updating the data shown on top of calendar

    //////////////////SETTINP UP THE DELETE CALENDAR LOGIC AND MODAL ///////////////////////////////////////////////////////////////////////////
    setUpDeleteCalendarModal(); // attach the delete event logic to the button


    //////////////////SETTINP UP THE Create CALENDAR LOGIC AND MODAL ///////////////////////////////////////////////////////////////////////////
    setUpCreateCalendarModal(); // attach the delete event logic to the button


    // IMPORTANT
    // IMPLEMENT THE EVENTS OF !!! EACH !!! CALENDARS INSTANCES /////////////////////////////////////////
    calendarArray.forEach( (value) => {
        //CODING THE DELETE EVENT
        value.calendar.on('beforeDeleteEvent', (eventObj) => {
            //Updating visually:
            masterCalendar.deleteEvent(eventObj.id, eventObj.calendarId);
            value.calendar.deleteEvent(eventObj.id, eventObj.calendarId);
            //updating database:
            deleteEvent(eventObj.id);
        });

        // CODING THE UPDATE EVENT:  DONE
        value.calendar.on('beforeUpdateEvent', function ({ event, changes }) {
            //const { id, calendarId } = event;
            // Updating visually:
            masterCalendar.updateEvent(event.id, event.calendarId, changes);
            value.calendar.updateEvent(event.id, event.calendarId, changes);
            //Now updating in server side:
            var object = {
                object: {
                    ...changes  
                }
        };
        //change into the format I am working on
            if (object.object.hasOwnProperty('start')) {  object.object['start'] = object.object.start.d.d.toString(); }
            if (object.object.hasOwnProperty('end')) {  object.object['end'] = object.object.end.d.d.toString(); }
            updateEvent(object, event.id);  
        });
        //CODING THE CREATE EVENT:  DONE
        value.calendar.on('beforeCreateEvent', (eventObj) => {
            //Call the function to post the variable toPost to the dataBase:
            //MUST BE CODED TO RETURN THE ID OF THE EVENT
            var theID=  postEvent(eventObj);
            // Use createEvents method here, to visually update the table:
            eventObj2 = toPost.event;

            masterCalendar.createEvents([
                {
                    ...eventObj2,
                    id: theID,
                },
            ]);
            value.calendar.createEvents([
                {
                    ...eventObj2,
                    id: theID,
                },
            ]);
        });
    }
    );
    
     //attaching the function to the buttons: Must be done after calendar is defined!
     //IMPORTANT ALL OF THIS IS STILL IN THE FUNCTION WHICH IS CALLED WHEN DOCUMENT IS READY
     //HOWEVER IT IS NOT CALLED FOR EACH SINGLE CALENDAR, ONLY DEFINED ONCE!

    $(".todayButton").click(
        function () {
            masterCalendar.today();  // note that the master calendar is defined in other javascript 
            for(var i = 0; i < calendarArray.length; i++) {
                calendarArray[i].calendar.today();
            }
            updateDateShown(calendarArray);
        }
    );
    $(".prevButton").click(
        function () {
            masterCalendar.prev();
            for(var i = 0; i < calendarArray.length; i++) {
                calendarArray[i].calendar.prev();
            }
            updateDateShown(calendarArray);
        }
    );      
    $(".nextButton").click(
        function () {
            masterCalendar.next();
            for(var i = 0; i < calendarArray.length; i++) {
                calendarArray[i].calendar.next();
            }
            updateDateShown(calendarArray);
        }
    ); 

    //Insert the corresponding events within each calendar instances:
    for (var i = 0; i < calendarArray.length; i++) {
        //get array of events with calendarName
        var localArray = getEventsFromCalendarId(calendarArray[i].id);
        calendarArray[i].calendar.createEvents(localArray);  
    }

} 



        


