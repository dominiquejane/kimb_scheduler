$(document).ready(function() {

//001: holden, 002: patel, 003:read
//100: kvf, 200: dsc, 300: frt
var calendarData = [];
var currentData = []; //data that is currently on calendar
var availableData = []; 
var staff = []; // = calendarData.staff;
var clients = []; //= calendarData.clients;



var year;
var month;
var week;
var day;
var calendarDate
//get year data
var getYear = function() {
	year = moment().year();
}
// get month data
// -only render timeblocks
var getMonth = function() {
	month = (moment().month()) + 1;

	//temporary data:
	availableData = calendarData["time-blocks"];
}
$('button .fc-month-button').on('click', function() {
	console.log("click");
	// getMonth();
	// console.log(month);
	$.getJSON(" https://schedule-aggregator.kbi.bcx.zone" + "/api/timeblocks/seed/" + 2016 +  "/" + 8, function(data) {
  	//availableData = data;
  	console.log(data);
  	// staff = data.staff;
  	// clients = data.clients;
  	// var timeblocks = data["time-blocks"];
  	// timeblocks.map(function(el, i, arr) {
  	// 	var time = $.fullCalendar.formatRange(el.start, el.end, 'h(:mm)t');
  	// 	console.log("formatted time", time);
  	// 	var person = getStaffId(el.staff_id);
  	// 	var location = getClientId(el.client_id);
  	// 	el.title = time + " " + person + " " + location;
  	// })
  	// console.log("timeblocks after formatting ", timeblocks);
  	// availableData = timeblocks;
  });
})

// get week data: send range
// -render timeblocks, appt, classes
var getWeek = function() {

}

// get day data
// -render appt, classes

//get date on calendar
	var getCalendarDate = function() {
		calendarDate = $('#calendar').fullCalendar('getDate');
		calendarDate = calendarDate.format();
	}

	// getCalendarDate();
	// console.log(calendarDate);





var getStaffId = function(id) {
	var person = "";
  for (var i = 0; i < staff.length; i++) { //get #id
  	// console.log("name", staff[i].last_name, "id", id);
  	if(staff[i].last_name === id) {
  		person = staff[i].id;
  		break;
  	}
  }
  return person; 
}

var getClientId = function(id) {
	var client = "";
  for (var i = 0; i < clients.length; i++) { //get #id
  	if(clients[i].name === id) {
  		// console.log("name on client array:", clients[i].name);
  		// console.log("name being compared against clients name: ", id);
  		client = clients[i].id;
  		// console.log("id being assigned to client variable: ", client);

  		break;
  	}
  }
  return client;//not using
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

  $('#calendar').fullCalendar('removeEvents');
  $('#calendar').fullCalendar('addEventSource', currentData);
  $('#calendar').fullCalendar('refetchEvents');
  console.log("final current", currentData)
  console.log("final available", availableData)

}

var blankCalendar = function() {

  $('#calendar').fullCalendar('removeEvents');
  $('#calendar').fullCalendar('addEventSource', []);
  $('#calendar').fullCalendar('refetchEvents');

}

var staff_validator = 0;
var location_validator = 0;

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

	function getChecked(start, end, id) {
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


	function getUnchecked(start, end, id) {
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
//breakpoint
	// console.log("check", check);
	// console.log("current", currentData);
	// console.log("available", availableData);
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

$("input:checkbox").not(document.getElementsByName('all')).on('click', function(){
	var that = $(this);
	// console.log(that);
	// console.log("current", currentData);
	// console.log("available", availableData);
	clickFilter(that);
});



$('#calendar').fullCalendar({

    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    defaultView: 'month',//'agendaDay',
    
    slotDuration: {minutes: 15}, //required
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
    		$.getJSON(" https://schedule-aggregator.kbi.bcx.zone" + "/api/time-blocks/seed/", function(data) {
			  	//availableData = data;
			  	console.log(data);
			  })
    	} else if (viewNow === 'agendaWeek') {
    		console.log("week");
    	} else if (viewNow === 'agendaDay') {
    		console.log("day");
    	}
      
    },
    eventAfterAllRender: function() {
      
    }


   })


	



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
  $('.fc-toolbar .fc-right .fc-button-group').after(
    $('<div id="add-appt-bg"><img src="./icons/plusButton.png" id="add-appt-btn" /></div>')
  );

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









})