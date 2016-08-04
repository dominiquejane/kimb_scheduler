unusedCode.js


//dummy data
var calendarData ={
    "appointments": [
      {
        "start" : "2016-07-28 06:15:00",
        "end" : "2016-07-28 06:30:00",
        "title" : "holden frt",
        "id": 001,
        "patient_id": 101,
        "rescheduled_at": "",
        "client_id": 300, //location
        "staff_id": 001,
        "status": "exercitation ut enim Duis",
      },
      {
        "start" : "2016-07-28 06:15:00",
        "end" : "2016-07-28 06:30:00",
        "title" : "holden dsc",
        "id": 001,
        "patient_id": 101,
        "rescheduled_at": "",
        "client_id": 200, //location
        "staff_id": 001,
        "status": "exercitation ut enim Duis",
      },
      {
        "title" : "holden kvf",
        "start" : "2016-07-28 06:15:00",
        "end" : "2016-07-28 06:30:00",
        "id": 002,
        "patient_id": 102,
        "rescheduled_at": "",
        "client_id": 100, //location
        "staff_id": 001,
        "status": "exercitation ut enim Duis",
      },
      {
        "title" : "patel dsc",
        "start" : "2016-07-28 07:15:00",
        "end" : "2016-07-28 07:45:00",
        "end" : "",
        "id": 003,
        "patient_id": 103,
        "rescheduled_at": "",
        "client_id": 200, //location
        "staff_id": 002,
        "status": "exercitation ut enim Duis",
      },
      {
        "title" : "patel frt",
        "start" : "2016-07-28 08:15:00",
        "end" : "2016-07-28 08:45:00",
        "id": 004,
        "patient_id": 104,
        "rescheduled_at": "",
        "client_id": 300, //location
        "staff_id": 002,
        "status": "exercitation ut enim Duis",
      }
    ],
    "classes": [
      {
        "attendees": ["parvati", "amanda", "cerie"],
        "title" : "read dsc",
        "start" : "2016-07-28 08:15:00",
        "end" : "2016-07-28 09:30:00",
        "id": 2.1188895e+07,
        "client_id": 200, //location
        "staff_id": 003,
      },
      {
        "attendees": ["eliza", "ami", "fairplay", "kathy", "mikey", "chet"],
        "title" : "read dsc",
        "start" : "2016-07-28 09:15:00",
        "end" : "2016-07-28 10:30:00",
        "id": 2.1188895e+07,
        "client_id": 200, //location
        "staff_id": 003,
      },
      {
        "attendees": ["ozzy", "james", "jason", "eric"],
        "title" : "holden anim",
        "start" : "2016-07-28 10:15:00",
        "end" : "2016-07-28 11:30:00",
        "id": 2.1188895e+07,
        "client_id": 300, //location
        "staff_id": 001,
      }
    ],
    "time-blocks": [
      {
        "staff_id": 002,
        "client_id": 200, //location
        "title" : "patel dsc",
        "start" : "2016-07-28 06:45:00",
        "allDay" : true,
        "end" : "2016-07-28 07:00:00",
      },
      {
        "staff_id": 003,
        "client_id": 100, //location
        "title" : "read kvf",
        "start" : "2016-07-28 08:45:00",
        "allDay" : true,
        "end" : "2016-07-28 11:00:00",
      },
      {
        "staff_id": 001,
        "client_id": 100, //location
        "title" : "holden kvc",
        "start" : "2016-07-28 06:45:00",
        "allDay" : true,
        "end" : "2016-07-28 07:00:00",
      }
    ], //all data from initial get request, should not be changed except on page reload
    "staff" : [
    	{
    		"id" : 001,
    		"last_name" : "holden",
    	},
    	{
    		"id" : 002,
    		"last_name" : "patel",
    	},
    	{
    		"id" : 003,
    		"last_name" : "read",
    	}
    ],
    "clients" : [
    	{
    		"id" : 100,
    		"name" : "kvf"
    	},
    	{
    		"id" : 200,
    		"name" : "dsc",
    	},
    	{
    		"id" : 300,
    		"name" : "frt",
    	}
    ]
  };



//first version of validator dunctions
var location_validator_function = function(checkbox) {
	if(checkbox) {
		location_validator++;
	}else {
		location_validator--;
	}
	console.log("location_validator", location_validator)
}

var staff_validator_function = function(checkbox) {
	if(checkbox) {
		location_validator++;
	}else {
		location_validator--;
	}
	console.log("staff_validator", staff_validator)
}




//unused code
var filterStaff = function(start, end, id) {
  var start_copy = start;
  // var person = getStaff(id);
  var person = id;
  var test = function(arr) {
    if (arr.staff_id === person) {
      return true;
    } else {
      return false;
    }
  }
  for(var i = 0; i< start_copy.length;){
    var outcome = test(start_copy[i]);
    if(outcome === true) {
      var arrayVal = start.splice(i, 1);
      end.push(arrayVal[0]);
    } else {
      i++;
    } 
  }

  return start;//not using
}

var filterLocation = function(start, end, id) {  //not using
	// console.log("B E G I N N I N G");
	// console.log("start", start);
	// console.log("end", end);

	// console.log("passed id", id);
  var start_copy = start;
  // var client = getClientId(id);
 	var client = id;
  var test = function(arr) {
  	// console.log("test function executing...")
  	// console.log("array id: ", arr.client_id);
  	// console.log("id being tested against array id: ", client);
    if (arr.client_id === client) {
      return true;
    } else {
      return false;
    }
  }
  for(var i = 0; i< start_copy.length;){
    var outcome = test(start_copy[i]);
    // console.log("array id matches testing id?? : ", outcome);
    if(outcome === true) {
      var arrayVal = start.splice(i, 1);
      end.push(arrayVal[0]);
    } else {
      i++;
    } 
  }
 //  console.log("E N D I N G");
	// console.log("start", start);
	// console.log("end", end);

  return start;
}



var viewNow = $('#calendar').fullCalendar('getView');
      if(viewNow.type === "agendaDay") {
        $('tbody.fc-body').css('display', 'none');
        $('tbody.fc-body').before('<table id="dayAgenda-display"><thead id="dayAgenda-display-head"><tr><td>what</td></tr></thead><tbody id="dayAgenda-display-body"></tbody></table>')
      }



$('.location-check-group').each(function() {
        if($(this).prop('checked')){
          $('.staff-check-group').each(function() {
          if($(this).prop('checked')) {
            // console.log($(this).context.id);
            //create a table for this id
            var newTable = $('#dayAgenda-display-body').append('<table>new table</table>');
            //create a nested table for each location
            // newTable = 
            //populate appointments from currentData in each nested table
          }
        })
        }
      })
      
      console.log("after rendered");
      $('.staff-check-group').each(function() {
        if($(this).is('checked')){
          console.log("check");
          console.log($(this))
        }
      })
      


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
