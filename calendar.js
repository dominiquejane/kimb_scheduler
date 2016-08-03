$(document).ready(function() {

	var calendarData ={
    "appointments": [
      {
        "start" : "2016-07-28 06:15:00",
        "end" : "2016-07-28 06:30:00",
        "title" : "holden frt",
        "id": 001,
        "patient_id": 101,
        "rescheduled_at": "",
        "client_id": "frt", //location
        "staff_id": "holden",
        "status": "exercitation ut enim Duis",
      },
      {
        "start" : "2016-07-28 06:15:00",
        "end" : "2016-07-28 06:30:00",
        "title" : "holden dsc",
        "id": 001,
        "patient_id": 101,
        "rescheduled_at": "",
        "client_id": "dsc", //location
        "staff_id": "holden",
        "status": "exercitation ut enim Duis",
      },
      {
        "title" : "holden kvf",
        "start" : "2016-07-28 06:15:00",
        "end" : "2016-07-28 06:30:00",
        "id": 002,
        "patient_id": 102,
        "rescheduled_at": "",
        "client_id": "kvf", //location
        "staff_id": "holden",
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
        "client_id": "dsc", //location
        "staff_id": "patel",
        "status": "exercitation ut enim Duis",
      },
      {
        "title" : "patel frt",
        "start" : "2016-07-28 08:15:00",
        "end" : "2016-07-28 08:45:00",
        "id": 004,
        "patient_id": 104,
        "rescheduled_at": "",
        "client_id": "frt", //location
        "staff_id": "patel",
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
        "client_id": "dsc", //location
        "staff_id": "read",
      },
      {
        "attendees": ["eliza", "ami", "fairplay", "kathy", "mikey", "chet"],
        "title" : "read dsc",
        "start" : "2016-07-28 09:15:00",
        "end" : "2016-07-28 10:30:00",
        "id": 2.1188895e+07,
        "client_id": "dsc", //location
        "staff_id": "read",
      },
      {
        "attendees": ["ozzy", "james", "jason", "eric"],
        "title" : "holden anim",
        "start" : "2016-07-28 10:15:00",
        "end" : "2016-07-28 11:30:00",
        "id": 2.1188895e+07,
        "client_id": "frt", //location
        "staff_id": "holden",
      }
    ],
    "time-blocks": [
      {
        "staff_id": "patel",
        "client_id": "frt", //location
        "title" : "patel frt",
        "start" : "2016-07-28 06:45:00",
        "allDay" : true,
        "end" : "2016-07-28 07:00:00",
      },
      {
        "staff_id": "read",
        "client_id": "kvf", //location
        "title" : "read kvf",
        "start" : "2016-07-28 08:45:00",
        "allDay" : true,
        "end" : "2016-07-28 11:00:00",
      },
      {
        "staff_id": "holden",
        "client_id": "frt", //location
        "title" : "holden frt",
        "start" : "2016-07-28 06:45:00",
        "allDay" : true,
        "end" : "2016-07-28 07:00:00",
      }
    ] //all data from initial get request, should not be changed except on page reload
  };
  var currentData = []; //data that is currently on calendar
  var availableData = []; 

  // availableData = availableData.concat(calendarData.appointments).concat(calendarData.classes).concat(calendarData['time-blocks']);
  var availableData = calendarData.appointments.concat(calendarData.classes).concat(calendarData['time-blocks']);
  // console.log(data);
  
  //option 2 for filtering: separate by location and pull for separate arrays...
  // var location_array = ['KVF', 'FRT', 'DSC'];
  // var current = [];

  // for (var i = 0; i < location_array.length; i++) {
  //   var counter = 0;
  //   current.push([]);
  //   for (var k = 0; k < data.length; k++) {
  //     // console.log(data[k].client_id);
  //     if (location_array[i] === data[k].client_id) {
  //       current[i][counter] = data[k];
  //       counter++;
  //     }
  //   }
  //   counter = 0;
  // }

 	// $.getJSON("http://3rp3nqzhyogdimm68-mock.stoplight-proxy.io/api/schedule/2016/01/01", function(data) {
  // 	calendarData = data;
  // });
not
  var staff_validator = "";
  var location_validator = "";

//CHECKBOXES

var y;
 // 	$("input:checkbox.location-check-group").click(function() {
	//     if($('#all-location').is(':checked')) {
 // 			var group = "input:checkbox[name='" + $(this).attr("name") + "']";
 //      $(group).prop("checked", false);
 //      $(this).prop('checked', true);
 // 		}
 // 		else {
 // 			if ($(this).is(":checked")) {
 //        var group = "input:checkbox[name='" + $(this).attr("name") + "']";
 //        $(group).prop("checked", false);
 //        $(this).prop("checked", true);
 //    	} else {
 //        $(this).prop("checked", false);
 //    	}
 // 		} 
	// });//do not use, name attr changed

var x;
 // 	$("input:checkbox.staff-check-group").click(function() {
 // 		if($('#all-staff').is(':checked')) {
 // 			var group = "input:checkbox[name='" + $(this).attr("name") + "']";
 //      $(group).prop("checked", false);
 //      $(this).prop('checked', true);
 // 		}
 // 		else {
 // 			if ($(this).is(":checked")) {
 //        var group = "input:checkbox[name='" + $(this).attr("name") + "']";
 //        $(group).prop("checked", false);
 //        $(this).prop("checked", true);
 //    	} else {
 //        $(this).prop("checked", false);
 //    	}
 // 		} 
	// });//do not use, name attr changed

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

    group.each(clickFilter);

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

    group.each(clickFilter);
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

    group.each(clickFilter);
  });

//location
  $("input:checkbox.location-check-group").not('#all-location').click(function() {
    if($('#all-location').is(':checked')){
      $('#all-location').prop('checked', false);
    } 

    location_validator_function();
  });

  $('#all-location').click(function() {
    var group = $('.location-check-group');

    group.prop('checked', this.checked);

    location_validator_function();

    group.each(clickFilter);
  });


//filtering function

var filterStaff = function(start, end, id) {
  var start_copy = start;
  var test = function(arr) {
    if (arr.staff_id === id) {
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

  return start;
}

// var filterStaff = function(current)

var filterLocation = function(start, end, id) {
  var start_copy = start;
  var test = function(arr) {
    if (arr.client_id === id) {
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

  return start;
}

var reloadCalendar = function() {

  $('#calendar').fullCalendar('removeEvents');
  console.log("reloadCalendar", currentData);
  $('#calendar').fullCalendar('addEventSource', currentData);
  $('#calendar').fullCalendar('refetchEvents');

}

var blankCalendar = function() {

  $('#calendar').fullCalendar('removeEvents');
  $('#calendar').fullCalendar('addEventSource', []);
  $('#calendar').fullCalendar('refetchEvents');

}

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

var clickFilter = function() {
    //need to check for location
    // edit filter function to check for location
    // need to check if both validators are truthy,
    // what happens with validators:
    // - if it doesnt have a class .location-check-group then staff valdiator is set to "1".
    // - if it does have a class .location-check-group then location validator is set to "1".

    // when clickFunction is triggered it needs to check 
    // 1. if validators are both truthy
    //   -if both truthy then


    // if($(this).hasClass('location-check-group')){
    //   location_validator = $(this).context.id;
    //   // console.log(location_validator)
    // }
    // else {
    //   staff_validator = $(this).context.id;
    //   // console.log(staff_validator)
    // }
  // console.log("click");
  // console.log("validators", "staff", staff_validator, "location", location_validator)
    // if (staff_validator && location_validator){
      //for each checked checkbox i need to fun the below code, one for staff, one for location
      // var checkbox_id = $(this).context.id;  //id from checkbox
      // console.log(checkbox_id);
      // var checked = $(this).is(':checked');

      // if(checked === true) {
      //   filter(availableData, currentData, checkbox_id);
      //   reloadCalendar();
      // } else {
      //   filter(currentData, availableData, checkbox_id);
      //   reloadCalendar();

        // staff_validator = "";
        // location_validator = "";
      // }
    // }
/////////
    // if (staff_validator && location_validator){
    //   //for each checked checkbox i need to fun the below code, one for staff, one for location
    //   var staff_id = $(this).context.id;
    //   var location_id = $(this).context.client_id;
    //   filterStaff(availableData, currentData, staff_id);
    //   if ($('#all-location').prop('checked', false)) {
    //     filterLocation(currentData, availableData, location_id)
    //   }
    //   reloadCalendar();
    // } else if (!staff_validator && location_validator) {

    // }
////////////
    
      //for each checked checkbox i need to fun the below code, one for staff, one for location
      
      // each time i check a box, update currentData.
      console.log($(this));
    var checkbox_id = $(this).context.id;  //id from checkbox
    var checked = $(this).is(':checked');
    var that = $(this);

    // console.log("current", currentData);
    // console.log("available", availableData);


    var checker1 = function() {
      if ($(this).hasClass('.location-check-group')) {
        if(checked === true) {
          filterLocation(availableData, currentData, checkbox_id);
        } else {
          filterLocation(currentData, availableData, checkbox_id);
        }
      } else {
        if(checked === true) {
          filterStaff(availableData, currentData, checkbox_id);
        } else {
          filterStaff(currentData, availableData, checkbox_id);
        }
      }  
      // console.log("!!!!!!!!!!!!!!", checkbox_id);
      // console.log("currentData", currentData);
      // console.log("availableData", availableData);
      // console.log("staff", staff_validator);
      // console.log("location", location_validator);
    }

    var checker2 = function() {
      if ($(this).hasClass('.location-check-group')) {
        filterLocation(currentData, availableData, checkbox_id);//
      } else {
        filterStaff(currentData, availableData, checkbox_id);// 
      }  
      
    } 
    // if all validators are true, and it is an additional location checkboxes are used i need to filter currentData items that match the current checked staff. if additional staff checkboxes are used I need to filter availableData items that match the current checked locations.

    var filterAll = function(start, end) {
      // console.log("!start", start);
      // console.log("!end", end);
      //or instead of paramaters, grab all the checked staff/locations with jquery selectors
     

      $('.staff-check-group').each(function() {
        if ($(this).prop('checked')){
          var staff_id = $(this).context.id;
          // console.log(staff_id);
          $('.location-check-group').each(function(){
            if ($(this).prop('checked')){
      // console.log("filterAll");
              var location_id = $(this).context.id;
      // console.log("location", location_id);
      // console.log("comparison", staff_id, end);
              for (var i = 0; i < start.length; i++) {
                if (staff_id === start[i].staff_id && location_id === start[i].client_id) {
                  var arrayVal = start.splice(i, 1);
                  // console.log("arrayVal", arrayVal);
                  end.push(arrayVal[0]);
                }
              }
              
            }
            
          })
        }
      })

    /////////


    }

    var filterOut = function(start, end, id, checkbox) {
      var start_copy = start;
      // console.log("that", that);
      console.log(id);
      var k = checkbox.hasClass('location-check-group');
      console.log(k);
      if (checkbox.hasClass('location-check-group')){
        for (var i = start_copy.length - 1; i >= 0; i--) {
          // console.log(start);
          // console.log(id);
          // console.log(start[i].client_id);
          if (start_copy[i].client_id === id) {
            // console.log(start[i].client_id);
            // console.log(id);
            var arrayVal = start.splice(i, 1);
            end.push(arrayVal[0]);
          }
        }
      } else {
        for (var i = start_copy.length - 1; i >= 0; i--) {
          if (start_copy[i].staff_id === id){
            // console.log(id);
            // console.log(start[i].staff_id);
            var arrayVal = start.splice(i, 1);
            end.push(arrayVal[0]);
          }
        }
      }
    }


// should I filter all by location in the beginning???
// have three currentData arrays, and three availableData arrays?

//so first, i select one checkbox, that puts all matched items from aD to cD. then I select another checkbox, now everything is validated and I want to filter through what I just checked with what is on the currentData.
    

    if (staff_validator && location_validator){
      if (checked){
        filterAll(availableData, currentData);
      } else {
        filterOut(currentData, availableData, checkbox_id, that);
      }
      reloadCalendar();
    } else if (!staff_validator && !location_validator) {
      reloadCalendar();
    } else  {
      checker1();
      //blankCalendar();
    }

    // console.log("current", currentData);
    // console.log("available", availableData);

}
  

  $("input:checkbox").on('click', clickFilter);


  $('#calendar').fullCalendar({

    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    defaultView: 'agendaDay',//'month',
    
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
      var viewNow = $('#calendar').fullCalendar('getView');
      if(viewNow.type === "agendaDay") {
        $('tbody.fc-body').css('display', 'none');
        $('tbody.fc-body').before('<table id="dayAgenda-display"><thead id="dayAgenda-display-head"><tr><td>what</td></tr></thead><tbody id="dayAgenda-display-body"></tbody></table>')
      }
    },
    eventAfterAllRender: function() {
      // $('.location-check-group').each(function() {
      //   if($(this).prop('checked')){
      //     $('.staff-check-group').each(function() {
      //     if($(this).prop('checked')) {
      //       // console.log($(this).context.id);
      //       //create a table for this id
      //       var newTable = $('#dayAgenda-display-body').append('<table>new table</table>');
      //       //create a nested table for each location
      //       // newTable = 
      //       //populate appointments from currentData in each nested table
      //     }
      //   })
      //   }
      // })
      
      console.log("after rendered");
      $('.staff-check-group').each(function() {
        if($(this).is('checked')){
          console.log("check");
          console.log($(this))
        }
      })
      
    }


   })


// page loads and all data gets set onto calendarData. 
// user clicks on a checkbox:
// - single checkbox: add function filters through availableData, places matched data onto currentData array then rerenders currentData onto calendar.
//   -uncheck: remove function filters though currentData and moves the data that matches the checkbox''s id from currentData to availableData. rerender currentData onto calendar.
//   -check another box: add function filters through availableData, places matched data onto currentData array then rerenders currentData onto calendar.
// - all checkbox: function filters through availableData, places data onto currentData array then rerenders currentData onto calendar

// click functions must:
// -have a local-file variable that holds the two criteria. These are used in the click function. These are arrays. When a checkbox is clicked 
// - check if there is a location AND a staff local file variables are true
//   - if both are true then continue to regular filter functions, passing in these variables
//   - if only one is clicked then call a 
// // - call a filter function that takes in location and staff parameters, these are in arrays.
// *nothing shows if none of the staff are checked
// *nothing shows if none of the locations are checked 











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