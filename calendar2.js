window.httpOptionsRootUri = 'https://schedule-aggregator.kbi.bcx.zone';

$(document).ready(function() {
    var calendarData = {};

    var getSchedule = function (startDate, endDate, timezone, setCalendarEvents) {
        var calendarData = loadSchedule(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
        var appointments = getTimeblocks(calendarData);
        var filteredAppointments = getFilteredAppointments(appointments);

        setCalendarEvents(filteredAppointments);
    };

    var loadSchedule = function (startDate, endDate) {
        var results;

        $.get({
            async: false,
            url: window.httpOptionsRootUri + '/api/schedule'
        }, {
            start: startDate,
            end: endDate
        }).done(function (data) {
            calendarData = data;
            results = data;
        }).fail(function (data) {
            console.log('error loading schedules', data);
        });

        return results;
    };

    var getTimeblocks = function (calendarData) {
        return _.map(calendarData['time-blocks'], function (timeBlock) {
            var time = $.fullCalendar.formatRange(timeBlock.start, timeBlock.end, 'h(:mm)t');
            var staff = getStaff(calendarData, timeBlock.staff_id);
            var client = getClient(calendarData, timeBlock.client_id);

            timeBlock.title = staff.last_name + " " + time + " " +  client.name;

            return timeBlock;
        });
    };

    var getStaff = function (calendarData, staffId) {
        staff = _.findWhere(calendarData.staff, {id: staffId});
        staff = (staff === undefined) ? {last_name: ''} : staff;

        return staff;
    };

    var getClient = function (calendarData, clientId) {
        client = _.findWhere(calendarData.clients, {id: clientId});
        client = (client === undefined) ? {name: ''} : client;

        return client;
    };

    var getCheckedIdsFor = function (type) {
        var itemIds = [];

        $('.' + type + '-check-group input').each(function () {
            if (! $(this).prop('checked')) {
                return;
            }

            var itemId = $(this).data('id');

            if (! isNaN(parseFloat(itemId)) && isFinite(itemId)) {
                itemIds.push(Number(itemId));
            }
        });

        return itemIds;
    };

    var getFilteredAppointments = function (appointments) {
        var staffIds = getCheckedIdsFor('staff');
        var clientIds = getCheckedIdsFor('location');

        filteredAppointments = _.filter(appointments, function (appointment) {
            return ((_.contains(staffIds, appointment.staff_id))
                && (_.contains(clientIds, appointment.client_id)));
        });

        return filteredAppointments;
    };

    var filterCalendarAppointments = function () {
        var appointments = getTimeblocks(calendarData);
        var filteredAppointments = getFilteredAppointments(appointments);

        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', filteredAppointments);
        $('#calendar').fullCalendar('refetchEvents');
    };

    var toggleFilter = function ($target) {
        var $checkbox = $target.find('input');
        var isChecked = $checkbox.prop('checked');

        $target.find('input').prop('checked', ! isChecked);
        filterCalendarAppointments();
    };

    var toggleAllFilters = function ($target) {
        var type = $target.find('input').attr('data-id');
        var $checkbox = $target.find('input');
        var isChecked = $checkbox.prop('checked');

        $('#' + type + ' input').prop('checked', !isChecked);
        filterCalendarAppointments();
    };

    var evaluateFilter = function (event) {
        if ($(event.target).hasClass('form-group')) {
            $allFilters = $(event.target).children('input[data-name="ALL"]');

            if ($allFilters.length > 0) {
                toggleAllFilters($(event.target));

                return;
            }

            toggleFilter($(event.target));
        }
    };



    var getFilterHtml = function (id, name, type, color, backgroundcolor) {
        return '        <div class="form-group ' + type + '-check-group">' +
        '            <input type="checkbox" id="' + id + '-' + name + '" data-id="' + id + '" data-name="' + name + '" autocomplete="off">' +
        '            <div class="filter btn-group">' +
        '                <label for="' + id + '-' + name + '" class="btn" style="color: ' + color + '; background-color: ' + backgroundcolor + ';">' +
        '                    <span class="glyphicon glyphicon-ok" style="color: ' + color + ';"></span>' +
        '                    <span>&nbsp;</span>' +
        '                </label>' +
        '                <label for="all-physician" class="btn checkbox-label">' +
        '                    ' + name +
        '                </label>' +
        '            </div>' +
        '        </div>';
    };

    var renderClientFilters = function () {
        var allHtml = getFilterHtml('location', 'ALL', 'location', '#333', '#fff');

        $('#location').append(allHtml);

        _.map(calendarData.clients, function (client) {
            var color = (client.color === undefined) ? '#333' : '#fff';
            var html = getFilterHtml(client.id, client.name, 'location', color, client.color);

            $('#location').append(html);
        });
    };

    var renderStaffFilters = function () {
        var allHtml = getFilterHtml('staff', 'ALL', 'staff', '#333', '#fff');

        $('#staff').append(allHtml);

        _.map(calendarData.staff, function (staff) {
            var color = (staff.color === undefined) ? '#333' : '#fff';
            var html = getFilterHtml(staff.id, staff.last_name, 'staff', color, staff.color);

            $('#staff').append(html);
        });
    };

    $('#calendar').fullCalendar({
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        defaultView: 'month',
        slotDuration: {minutes: 15},
        slotEventOverlap: false,
        header: {
            left: 'title',
            center: 'prev,next today',
            right:  'month,agendaWeek,agendaDay'
        },
        hiddenDays: [0,6],
        eventLimit: true,
        eventSources: getSchedule
    });

    renderClientFilters();
    renderStaffFilters();

    $('.staff-check-group').on('click', evaluateFilter);
    $('.location-check-group').on('click', evaluateFilter);





/*

var year;
var month;
var week;
var day;
var calendarDate;





//get year data
var getYear = function() {
	year = moment().year();
}
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
}

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
}

// get day data
// -render appt, classes

//get date on calendar
	var getCalendarDate = function() {
		calendarDate = $('#calendar').fullCalendar('getDate');
		calendarDate = calendarDate.format();
	}

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
  console.log("final current", currentData)
  console.log("final available", availableData)

}

var blankCalendar = function() {

  $('#calendar').fullCalendar('removeEvents');
  $('#calendar').fullCalendar('addEventSource', []);
  $('#calendar').fullCalendar('refetchEvents');

}

var staff_validator = "";
var location_validator = "";

var location_validator_function = function() {
  var checkbox = false;
  $('.location-check-group').each(function() {
    if ($(this).prop('checked')){
      checkbox = true;
    }
  })
  if (checkbox) {
      location_validator = "1";
    } else {
      location_validator = "";
    } //would it be better to use a counter to track validator, (clicks = i++, unclicks = i-- )?
}

var staff_validator_function = function() {
  var checkbox = false;
  $('.staff-check-group').each(function() {
    if ($(this).prop('checked')){
      checkbox = true;
    }
  })
  if (checkbox) {
      staff_validator = "1";
    } else {
      staff_validator = "";
    }
}

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
				})
			}
		})
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
}

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
}


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
}

$("input:checkbox").not(document.getElementsByName('all')).not('#reschedule-checkbox').on('click', function(){
	var that = $(this);
	// console.log(that);
	// console.log("current", currentData);
	// console.log("available", availableData);
	clickFilter(that);
});



// $('#calendar').fullCalendar({
//
//     schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
//     defaultView: 'month',//'agendaDay',
//
//     slotDuration: {minutes: 15}, //required
//     slotEventOverlap: false,
//     header: {
//         left: 'title',
//         center: 'prev,next today',
//         right:  'month,agendaWeek,agendaDay'
//     },
//     hiddenDays: [0,6],
//     eventLimit: true,
//     eventSources: getSchedule,
//     viewRender: function() {
//       var viewNow = $('#calendar').fullCalendar('getView').type;
//     	if (viewNow === 'month') {
//     		// getMonth();
//
//     	// 	$.getJSON("http://3rp3nqzhyogdimm68-mock.stoplight-proxy.io/api/schedule/2016/01/01", function(data) {
// 			  // 	//availableData = data;
// 			  // 	console.log(data);
// 			  // })
// console.log("month");
// 			// $.getJSON("https://schedule-aggregator.kbi.bcx.zone/api/schedule", function(data) {
// 			// 		  	//calendarData = data;
// 			// 		  	console.log(data);
// 			// 		  })
// 			// console.log("starting request");
// 			// 	$.ajax({
// 			// 		method: "GET",
// 			// 		dataType: 'json',
// 			// 		crossDomain: true,
// 			// 		//data: ,//info specifying which data to get
// 			// 		headers: {
// 			// 			"Access-Control-Allow-Origin" : "*"
// 			// 		},
// 			// 		// url: "http://3rp3nqzhyogdimm68-mock.stoplight-proxy.io/api/schedule/2016/01/01",
// 			// 		url: " https://schedule-aggregator.kbi.bcx.zone/api/time-blocks/seed",
// 			// 	}).done(function(data) {
// 			// 		console.log("data from ajax", data);
// 			// 	})
//
//
//     	} else if (viewNow === 'agendaWeek') {
//     		console.log("week");
//     		// getWeek();
//     	} else if (viewNow === 'agendaDay') {
//     		console.log("day");
//     	}
//
//     },
    // eventRender: function() {

    // }


   // })






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
        $('#calendar').fullCalendar( 'gotoDate', dateText )
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
  })


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
  		reloadCalendar
  	}
  }

  $('#reschedule-checkbox').on('click', function() {
  	console.log("reschedule button clicked");
  	rescheduleToggle = !rescheduleToggle;
  	rescheduler();

  })






*/

});
