window.httpOptionsRootUri = 'https://schedule-aggregator.kbi.bcx.zone';

$(document).ready(function() {
    init();

    var init = function () {
        $('#calendar').fullCalendar({
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
            defaultView: 'month',//'agendaDay',
            slotDuration: {minutes: 15}, //required
            slotEventOverlap: false,
            header: {
                left: 'title',
                center: 'prev,next today',
                right:  'month,agendaWeek,agendaDay'
            },
            hiddenDays: [0,6],
            eventLimit: true,
            eventSources: {
                url: window.httpOptionsRootUri + '/api/schedule',
                type: 'GET',
                error: function (error) {
                    console.log('calendar load error', error);
                }
            },
            viewRender: loadView
        });
    };

    var loadView = function () {
        var currentView = $('#calendar').fullCalendar('getView').type;

        switch (currentView) {
            case 'agendaDay':
                console.log("agendaDay");
                break;
            case 'agendaWeek':
                console.log("agendaWeek");
                getWeek();
                break;
            default:
                console.log("month");
                getMonth();
                break;
        }
    };


//001: holden, 002: patel, 003:read
//100: kvf, 200: dsc, 300: frt
// var calendarData ={
//     "appointments": [
//       {
//         "start" : "2016-07-28 06:15:00",
//         "end" : "2016-07-28 06:30:00",
//         "title" : "holden frt",
//         "id": 001,
//         "patient_id": 101,
//         "rescheduled_at": "",
//         "client_id": 300, //location
//         "staff_id": 001,
//         "type" : "Appointment",
//         "status": "exercitation ut enim Duis",
//       },
//       {
//         "start" : "2016-07-28 06:15:00",
//         "end" : "2016-07-28 06:30:00",
//         "title" : "holden dsc",
//         "id": 001,
//         "patient_id": 101,
//         "rescheduled_at": "",
//         "client_id": 200, //location
//         "staff_id": 001,
//         "type" : "Appointment",
//         "status": "exercitation ut enim Duis",
//       },
//       {
//         "title" : "holden kvf",
//         "start" : "2016-07-28 06:15:00",
//         "end" : "2016-07-28 06:30:00",
//         "id": 002,
//         "patient_id": 102,
//         "rescheduled_at": "",
//         "client_id": 100, //location
//         "staff_id": 001,
//         "type" : "Appointment",
//         "status": "exercitation ut enim Duis",
//       },
//       {
//         "title" : "patel dsc",
//         "start" : "2016-07-28 07:15:00",
//         "end" : "2016-07-28 07:45:00",
//         "end" : "",
//         "id": 003,
//         "patient_id": 103,
//         "rescheduled_at": "",
//         "client_id": 200, //location
//         "staff_id": 002,
//         "type" : "Appointment",
//         "status": "exercitation ut enim Duis",
//       },
//       {
//         "title" : "patel frt",
//         "start" : "2016-07-28 08:15:00",
//         "end" : "2016-07-28 08:45:00",
//         "id": 004,
//         "patient_id": 104,
//         "rescheduled_at": "",
//         "client_id": 300, //location
//         "staff_id": 002,
//         "type" : "Appointment",
//         "status": "exercitation ut enim Duis",
//       }
//     ],
//     "classes": [
//       {
//         "attendees": ["parvati", "amanda", "cerie"],
//         "title" : "read dsc",
//         "start" : "2016-07-28 08:15:00",
//         "end" : "2016-07-28 09:30:00",
//         "id": 2.1188895e+07,
//         "client_id": 200, //location
//         "type" : "Class",
//         "staff_id": 003,
//       },
//       {
//         "attendees": ["eliza", "ami", "fairplay", "kathy", "mikey", "chet"],
//         "title" : "read dsc",
//         "start" : "2016-07-28 09:15:00",
//         "end" : "2016-07-28 10:30:00",
//         "id": 2.1188895e+07,
//         "client_id": 200, //location
//         "type" : "Class",
//         "staff_id": 003,
//       },
//       {
//         "attendees": ["ozzy", "james", "jason", "eric"],
//         "title" : "holden anim",
//         "start" : "2016-07-28 10:15:00",
//         "end" : "2016-07-28 11:30:00",
//         "id": 2.1188895e+07,
//         "client_id": 300, //location
//         "type" : "Class",
//         "staff_id": 001,
//       }
//     ],
//     "time-blocks": [
//       {
//         "staff_id": 002,
//         "client_id": 200, //location
//         "title" : "patel dsc",
//         "start" : "2016-07-28 06:45:00",
//         "allDay" : true,
//         "type" : "Time Block",
//         "end" : "2016-07-28 07:00:00",
//       },
//       {
//         "staff_id": 003,
//         "client_id": 100, //location
//         "title" : "read kvf",
//         "start" : "2016-07-28 08:45:00",
//         "allDay" : true,
//         "type" : "Time Block",
//         "end" : "2016-07-28 11:00:00",
//       },
//       {
//         "staff_id": 001,
//         "client_id": 100, //location
//         "title" : "holden kvc",
//         "start" : "2016-07-28 06:45:00",
//         "allDay" : true,
//         "type" : "Time Block",
//         "end" : "2016-07-28 07:00:00",
//       }
//     ], //all data from initial get request, should not be changed except on page reload
//     "staff" : [
//     	{
//     		"id" : 001,
//     		"last_name" : "holden",
//     	},
//     	{
//     		"id" : 002,
//     		"last_name" : "patel",
//     	},
//     	{
//     		"id" : 003,
//     		"last_name" : "read",
//     	}
//     ],
//     "clients" : [
//     	{
//     		"id" : 100,
//     		"name" : "kvf"
//     	},
//     	{
//     		"id" : 200,
//     		"name" : "dsc",
//     	},
//     	{
//     		"id" : 300,
//     		"name" : "frt",
//     	}
//     ]
//   };

var calendarData = {};

var loadCalendarData = function (startDate, endDate) {
    $.get(scheduleGetEndpoint, {
        start: startDate,
        end: endDate
    }).done(function (data) {
        calendarData = data;
    }).fail(function (data) {
        console.log('error getting schedule', data);
    });
};

var currentData = []; //data that is currently on calendar
var availableData = [];
var staff = []; // = calendarData.staff;
var clients = []; //= calendarData.clients;


var year;
var month;
var week;
var day;
var calendarDate;
//get year data
var getYear = function() {
	year = moment().year();
};
// get month data
// -only render timeblocks
var getMonth = function(month) {
	month = (moment().month()) + 1;
	//get data
	//...calendarData = data;

	//temporary data:
	formatTimeblocks();
	availableData = calendarData["time-blocks"];
	currentData = getChecked(availableData, currentData);
	reloadCalendar();
};

var formatTimeblocks = function() {
	staff = calendarData.staff;
	clients = calendarData.clients;
	// var timeblocks = data["time-blocks"]
	// timeblocks.map(function(el, i, arr) {
	calendarData["time-blocks"].map(function(el, i, arr) {
		var time = $.fullCalendar.formatRange(el.start, el.end, 'h(:mm)t');
		var person = getStaffName(el.staff_id);
		var location = getClientName(el.client_id);
		el.title = person + " " + time + " " +  location;
	});

	// return calendarData["time-blocks"];
};


// get week data: send range
// -render timeblocks, appt, classes
var getWeek = function(range1, range2) {
	//get data
	//....calendarData = data;

	//grab data and check through the checkboxes and rerender new

	// formatTimeblocks();
	// availableData = calendarData.appointments.concat(calendarData.classes).concat(calendarData['time-blocks']);
	// currentData = getChecked(availableData, currentData);
	// reloadCalendar();
};

// get day data
// -render appt, classes

//get date on calendar
	var getCalendarDate = function() {
		calendarDate = $('#calendar').fullCalendar('getDate');
		calendarDate = calendarDate.format();
	};

	// getCalendarDate();
	// console.log(calendarDate);

var viewChange = function() {
	//grab data
};



var getStaffName = function(id) {
	var person = "";
  for (var i = 0; i < staff.length; i++) { //get #id
  	// console.log("name", staff[i].last_name, "id", id);
  	if(staff[i].id === id) {
  		person = staff[i].last_name;
  		break;
  	}
  }
  return person;
};

var getClientName = function(id) {
	var client = "";
  for (var i = 0; i < clients.length; i++) { //get #id
  	if(clients[i].id === id) {
  		// console.log("name on client array:", clients[i].name);
  		// console.log("name being compared against clients name: ", id);
  		client = clients[i].name;
  		// console.log("id being assigned to client variable: ", client);

  		break;
  	}
  }
  return client;//not using
};


//physician
  $("input:checkbox.physician-check-group").not('#all-physician').click(function() {
    if($('#all-physician').is(':checked')){
      $('#all-physician').prop('checked', false);
    }
    staff_validator_function();
  });

 	$('#all-physician').click(function() {
    var group = $('.physician-check-group');
 		group.prop('checked', this.checked);

    staff_validator_function();

    group.each(function() {
    	clickFilter($(this));
    });
 	});

//support
  $("input:checkbox.support-check-group").not('#all-support').click(function() {
    if($('#all-support').is(':checked')){
      $('#all-support').prop('checked', false);
    }
    staff_validator_function();
  });

  $('#all-support').click(function() {
    var group = $('.support-check-group');
    group.prop('checked', this.checked);

    staff_validator_function();

    group.each(function() {
    	clickFilter($(this));
    });
  });

//clinical
  $("input:checkbox.clinical-check-group").not('#all-clinical').click(function() {
    if($('#all-clinical').is(':checked')){
      $('#all-clinical').prop('checked', false);
    }
    staff_validator_function();
  });

  $('#all-clinical').click(function() {
    var group = $('.clinical-check-group');
    group.prop('checked', this.checked);

    staff_validator_function();

    group.each(function() {
    	clickFilter($(this));
    });
  });

//location
  $("input:checkbox.location-check-group").not('#all-location').click(function() {
    if($('#all-location').is(':checked')){
      $('#all-location').prop('checked', false);
    }

    // var check = $(this).is(':checked');
    location_validator_function();
    // location_validator_function(check);
  });

  $('#all-location').click(function() {
    var group = $('.location-check-group');

    group.prop('checked', this.checked);

    location_validator_function();
    // var check = $('#all-location').is(':checked');
    // group.each(location_validator_function(check));
    group.each(function() {
    	clickFilter($(this));
    });
  });

var reloadCalendar = function() {
	// var source = $('#calendar').fullCalendar('getEventSources');
	// console.log("event Sources", source )
  $('#calendar').fullCalendar('removeEventSources');
  // var sources = $('#calendar').fullCalendar('getEventSources');
  // console.log("event sources", sources);
  $('#calendar').fullCalendar('addEventSource', currentData);
  var s = $('#calendar').fullCalendar('getEventSources');
	// console.log("event Sources", s )
 //  $('#calendar').fullCalendar('refetchEvents');

  if(rescheduleToggle) {
  	rescheduler();
  }
  console.log("final current", currentData);
  console.log("final available", availableData);

};

var blankCalendar = function() {

  $('#calendar').fullCalendar('removeEvents');
  $('#calendar').fullCalendar('addEventSource', []);
  $('#calendar').fullCalendar('refetchEvents');

};

var staff_validator = "";
var location_validator = "";

var location_validator_function = function() {
  var checkbox = false;
  $('.location-check-group').each(function() {
    if ($(this).prop('checked')){
      checkbox = true;
    }
});
  if (checkbox) {
      location_validator = "1";
    } else {
      location_validator = "";
    } //would it be better to use a counter to track validator, (clicks = i++, unclicks = i-- )?
};

var staff_validator_function = function() {
  var checkbox = false;
  $('.staff-check-group').each(function() {
    if ($(this).prop('checked')){
      checkbox = true;
    }
});
  if (checkbox) {
      staff_validator = "1";
    } else {
      staff_validator = "";
    }
};

var getChecked = function(start, end, id) {
		$('.location-check-group').each(function() {
			if($(this).is(':checked')){
				var l = $(this).context.name;
				if (l === "all") {
					return;
				}
				var client_id = Number(l);
				// console.log($(this));
				// console.log("location", client_id);
				$('.staff-check-group').each(function() {
					if($(this).is(':checked')) {
						var s = $(this).context.name;
						if (s === "all") {
							return;
						}
						var staff_id = Number(s);
						// console.log("staff", staff_id)
						var start_copy = start;
						// console.log("getcheck start", start);

						for (var i = start_copy.length - 1; i >= 0; i--){
							// console.log(start[i].client_id, client_id);
							// console.log(start[i].staff_id, staff_id);
							if ((start[i].client_id === client_id) && (start[i].staff_id === staff_id)){
								var val = start.splice(i, 1);
								// console.log("getcheck spliced item", val);
								// console.log("getcheck spliced array", start);
								end = end.concat(val);
								// console.log("getcheck end array", end);
							}
						}
					}
				});
			}
		});
		availableData = start;
		return end;
	};

var getUnchecked = function(start, end, id) {
	// console.log("getUncheck start", start);
	// console.log("getuncheck id", id);
	var start_copy = start;
	for (var i = start_copy.length -1; i >=0; i--) {
		if (start[i].client_id == id || start[i].staff_id == id) {
			// console.log(start[i], id)
			var val = start.splice(i, 1);
							// console.log("getuncheck spliced array", start);
							// console.log("getuncheck spliced item", val);
			end = end.concat(val);
							// console.log("getuncheck end array", end);
			// console.log(end);
		}
	}
	// console.log(start);
	availableData = end;
	return start;
};

var getRescheduled = function(start, end) {
	var start_copy = start;
	for (var i = start_copy.length -1; i >=0; i--) {
		if (start[i].recheduled_at === "") {
			var val = start.splice(i, 1);
			end = end.concat(val);
		}
	}
	availableData = end;
	return start;
};


var clickFilter = function(checkbox) {
	// console.log("current", currentData);
	// console.log("available", availableData);
	var check = $(checkbox).is(':checked');
	var id = checkbox.context.name;
	// console.log("id", id);

	if(id === "all") {
		// console.log("current", currentData);
		// console.log("available", availableData);
		return;
	}

	if (check) {
		currentData = getChecked(availableData, currentData, id);
	} else {
		currentData = getUnchecked(currentData, availableData, id);
	}
	// console.log("current", currentData);
	// console.log("available", availableData);


	if (staff_validator && location_validator){
    reloadCalendar();
  }
  else {
  	blankCalendar();
  }
};

$("input:checkbox").not(document.getElementsByName('all')).not('#reschedule-checkbox').on('click', function(){
	var that = $(this);
	// console.log(that);
	// console.log("current", currentData);
	// console.log("available", availableData);
	clickFilter(that);
});




    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    defaultView: 'month',//'agendaDay',
    
    slotDuration: {minutes: 15}, //required
    slotEventOverlap: false,
    header: {
        left: 'title',
        center: 'prev,next today',
        right:  'month,agendaWeek,agendaDay'
    },
    hiddenDays: [0,6],
    eventLimit: true,
    eventSources: currentData,
    viewRender: function() {
      var viewNow = $('#calendar').fullCalendar('getView').type;
    	if (viewNow === 'month') {
    		// getMonth();

    	// 	$.getJSON("http://3rp3nqzhyogdimm68-mock.stoplight-proxy.io/api/schedule/2016/01/01", function(data) {
			  // 	//availableData = data;
			  // 	console.log(data);
			  // })
console.log("month");
			// $.getJSON("https://schedule-aggregator.kbi.bcx.zone/api/schedule", function(data) {
			// 		  	//calendarData = data;
			// 		  	console.log(data);
			// 		  })
			// console.log("starting request");
			// 	$.ajax({
			// 		method: "GET",
			// 		dataType: 'json',
			// 		crossDomain: true,
			// 		//data: ,//info specifying which data to get
			// 		headers: {
			// 			"Access-Control-Allow-Origin" : "*"
			// 		},
			// 		// url: "http://3rp3nqzhyogdimm68-mock.stoplight-proxy.io/api/schedule/2016/01/01",
			// 		url: " https://schedule-aggregator.kbi.bcx.zone/api/time-blocks/seed",
			// 	}).done(function(data) {
			// 		console.log("data from ajax", data);
			// 	})

			
    	} else if (viewNow === 'agendaWeek') {
    		console.log("week");
    		// getWeek();
    	} else if (viewNow === 'agendaDay') {
    		console.log("day");
    	}
      
    },
    // eventRender: function() {
      
    // }


	//add datepicker button to calendar
  $('.fc-toolbar .fc-center .fc-today-button').after(
    $('<input type="text" id="date-picker">')
  );

  //show calendar on button click
  $("#date-picker").datepicker({
      showOn: 'button',
      buttonText: '<span class="glyphicon glyphicon-chevron-down"></span>',
      //changes date on fullCalendar when date selected in datepicker
      onSelect: function(dateText) {
        $('#calendar').fullCalendar( 'gotoDate', dateText );
      }
  });



  //add add-appointment button to calendar
  //add rechedule button to calendar
    $('.fc-toolbar .fc-right .fc-button-group')
  	// .after('<div id="reschedule-btn"><img src="./icons/Reschedule.png" id="reschedule-img" /></div>')
  	// .after('<button id="reschedule-btn">Rescheduled</button>')
  	    .after('<div id="add-appt-bg"><img src="./icons/plusButton.png" id="add-appt-btn" /></div>');

    $('#add-appt-bg').on('click', function() {
    $('#dialog').dialog({
      height: 300,
      modal: true,
      buttons:
      [
        {
          text: "Save Appointment",
          click: function() {
            console.log("appointment saved");
            //add code to post appt to db
            //reloadCalendar();
            $(this).dialog("close");
          }
        },
        {
          text: "Cancel",
          click: function() {
            $(this).dialog("close");
          }
        }
      ]
    });
});


  var rescheduleToggle = false;
  //true: user wants to only see rescheduled events ->remove events
  //false: user wants to see all events -> add events back in
  var rescheduleToggleArray = [];
  //array for non-rescheduled events;

  var rescheduler = function() {
  	if (rescheduleToggle) {
  		currentData = getRescheduled(currentData, availableData);
  		reloadCalendar();
  	} else {
  		getChecked(availableData, currentData);
  		reloadCalendar();
  	}
};

  $('#reschedule-checkbox').on('click', function() {
  	console.log("reschedule button clicked");
  	rescheduleToggle = !rescheduleToggle;
  	rescheduler();

});
});








})