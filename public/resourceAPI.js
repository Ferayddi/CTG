
//Checking if user is Logged: 
function userIsLogged(setLoggedContent) {
  $.ajax(`/signIn/check`, {
    type: 'GET',
    contentType: 'application/json',
    success: function (data, status, xhr) {
      setLoggedContent(data.loggedIn);
    },
    error: function (jqXhr, textStatus, errorMessage) {
    }
  });


}


//Deleting an event
function deleteEvent(id) {
  $.ajax(`/events/${id}`, {
    type: 'DELETE',
    contentType: 'application/json',
    success: function (data, status, xhr) {
      
    },
    error: function (jqXhr, textStatus, errorMessage) {

      if (errorMessage === "Forbidden") {
        alert("You do not have permission to delete an event");
        setTimeout(() => {location.reload(); }, 100);
      }

    }
  });
}


//Updating an event
function updateEvent(object, id) {
  $.ajax(`/events/${id}`, {
    type: 'PUT',  // http method
    data: JSON.stringify(object),  // data to submit
    datatype : "application/json",
    contentType: "application/json",
    success: function (data, status, xhr) {
        
    },
    error: function (jqXhr, textStatus, errorMessage) {
      if (errorMessage === "Forbidden") {
        alert("You do not have permission to update an event");
        setTimeout(() => {location.reload(); }, 100);
      }
    }
});
}



// Post a single event
function postEvent(eventObj) {

  theID = 0;
  console.log(eventObj);
  toPost =  {
    event: {
        id: 0, //will be set by the database
        calendarId: eventObj.calendarId,
        title: eventObj.title,
        body: eventObj.body,
        start: eventObj.start.d.d.toString(),
        end: eventObj.end.d.d.toString(),
        category: eventObj.category,        // DON't HAVE A WAY TO CHANGE THIS YET
        isAllday: eventObj.isAllday,
        color: eventObj.color             // MIGHT ACTUALLY NOT BE USED, INSTEAD EACH CALENDAR WILL CORRESPOND TO A COLOR
    }
};

  $.ajax('/events', {
    type: 'POST',  // http method
    data:  JSON.stringify(toPost) ,  // data to submit
    contentType: 'application/json',
    async: false,
    dataType: 'json',
    success: function (data, status, xhr) {
      //body = JSON.parse(data);
      theID = data.id;
    },
    error: function (jqXhr, textStatus, errorMessage) {
      if (errorMessage === "Forbidden") {
        alert("You do not have permission to create an event");
        setTimeout(() => {location.reload(); }, 100);
      }
    }
  });
  return theID;
}



function getEventsFromCalendarId(calendarId) {
  var events;
  $.ajax(`/events/${calendarId}`, {
    type: 'GET',  // http method
    async: false,
    dataType: 'json',
    success: function (data, status, xhr) {
      events = data.events;
    },
    error: function (jqXhr, textStatus, errorMessage) {
  
    }
  });
  return events;
}

//retrieve all events
function getEvents () {
  var events;
  $.ajax('/events/', {
    type: 'GET',  // http method
    async: false,
    dataType: 'json',
    success: function (data, status, xhr) {
      events = data.events;
    },
    error: function (jqXhr, textStatus, errorMessage) {
    }
  });
  return events;
  };

//retrieve all calendars:
function getCalendars () {
  var calendars;
  $.ajax('/calendars/', {
    type: 'GET',  // http method
    async: false,
    dataType: 'json',
    success: function (data, status, xhr) {
      calendars = data.calendars;
    },
    error: function (jqXhr, textStatus, errorMessage) {
    }
  });
  return calendars;
  };

  //delete a calendar
  function deleteCalendar (name) {
    $.ajax(`/calendars/${name}`, {
      type: 'DELETE',
      async: false,
      success: function (data, status, xhr) {
        
      },
      error: function (jqXhr, textStatus, errorMessage) {
        if (errorMessage === "Forbidden") {
          alert("You do not have permission to delete a calendar");
          setTimeout(() => {location.reload(); }, 100);
        }
      }
    });
  }


  //create a calendar: 
  function postCalendar(eventObj) {
    var theID;
    toPost = {
      calendar: eventObj
    }
    $.ajax('/calendars', {
      type: 'POST',  // http method
      data:  JSON.stringify(toPost) ,  // data to submit
      contentType: 'application/json',
      dataType: 'json',
      async: false,
      success: function (data, status, xhr) {
        theID = data.id;
      },
      error: function (jqXhr, textStatus, errorMessage) {
        if (errorMessage === "Forbidden") {
          alert("You do not have permission to create a calendar");
          setTimeout(() => {location.reload(); }, 100);
        }
      }
    });
    
    return theID;
  }
