$(document).ready(function() {

    events_array= [
			        {
			            title: "",
			            start: '2016-07-09 06:15:00',
			            end: '2016-07-09 06:30:00',
			            resourceId:'e',
			            doctor_name: "Kim",
									patient_name: "S. Dean",
									icon: 'icons/heart-checkup.png',
									office: "F",
									procedure: "Lap-band",
					        color: "grey",
			        },
			        {
			            title: "",
			            start: '2016-07-09 06:15:00',
			            end: '2016-07-09 06:30:00',
			            resourceId:'b',
			            doctor_name: "Kim",
									patient_name: "S. Dean",
									icon: 'icons/heart-checkup.png',
									office: "F",
									procedure: "Lap-band",
					        color: "gold",
			        },
			        {
			            title: "",
			            start: '2016-07-09 06:15:00',
			            end: '2016-07-09 06:30:00',
			            resourceId:'d',
			            doctor_name: "Kim",
									patient_name: "S. Stefanopoulis",
									icon: 'icons/heart-checkup.png',
									office: "F",
									procedure: "Lap-band",
					        color: "green",
			        },			        
			        {
			            title: "",
			            start: '2016-07-09 09:00:00',
			            end: '2016-07-09 09:30:00',
			            resourceId:'c',
			            doctor_name: "Kim",
									patient_name: "S. Dean",
									icon: 'icons/heart-checkup.png',
									office: "B",
									procedure: "Lap-band",
					        color: "red",
			        },
			        {
			            title: "",
			            start: '2016-07-09 09:00:00',
			            end: '2016-07-09 09:30:00',
			            resourceId:'d',
			            doctor_name: "Kim",
									patient_name: "S. Dean",
									icon: 'icons/heart-checkup.png',
									office: "B",
									procedure: "Lap-band",
					        color: "green",
			        },
			        {
			            title: "",
			            start: '2016-07-09 07:00:00',
			            end: '2016-07-09 07:15:00',
			            resourceId:'e',
			            doctor_name: "Kim",
									patient_name: "S. Dean",
									icon: 'icons/heart-checkup.png',
									office: "F",
									procedure: "Lap-band",
					        color: "orange",
			        },
			        {
			            title: "",
			            start: '2016-07-09 06:00:00',
			            end: '2016-07-09 06:30:00',
			            resourceId:'a',
			            doctor_name: "Kim",
									patient_name: "S. Dean",
									icon: 'icons/heart-checkup.png',
									office: "F",
									procedure: "Lap-band",
					        color: "yellow",
			        },
			        {
			            title: "",
			            start: '2016-07-09 06:00:00',
			            end: '2016-07-09 06:30:00',
			            resourceId:'c',
			            doctor_name: "Kim",
									patient_name: "S. Dean",
									icon: 'icons/heart-checkup.png',
									office: "B",
									procedure: "Lap-band",
					        color: "royalblue",
			        },
			        {
			            title: "",
			            start: '2016-07-09 06:45:00',
			            end: '2016-07-09 07:00:00',
			            resourceId: 'e',
			            doctor_name: "Lee",
									patient_name: "D. Sean",
									icon: "",
									office: "B",
									procedure: "Braces",
					        color: "mediumorchid",
			        } ]



    $('#calendar').fullCalendar({

      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      defaultView: 'agendaDay',
      resources: [
      	{ id: 'a', title: 'O1' },
        { id: 'b', title: 'O2' },
        { id: 'c', title: 'O3' },
        { id: 'd', title: 'P1' },
        { id: 'e', title: 'P2' }
      ],
      // resources: [
      // 	{ id: 'a', title: 'O1' },
      //   { id: 'b', title: 'O2' },
      //   { id: 'c', title: 'O3' },
      //   { id: 'd', title: 'P1' },
      //   { id: 'e', title: 'P1' },
      //   { id: 'f', title: 'P1' },
      //   { id: 'g', title: 'P1' },
      //   { id: 'h', title: 'P1' },
      //   { id: 'i', title: 'P1' },
      //   { id: 'j', title: 'P1' },
      //   { id: 'k', title: 'P1' },
      //   { id: 'l', title: 'P1' },
      //   { id: 'm', title: 'P1' },
      //   { id: 'n', title: 'P2' }
      // ],
      slotDuration: {minutes: 15}, //required
      header: {
      	left: 'prev, next today',
      	center: 'title',
      	right: 'month, agendaWeek, agendaDay'
      },
      events: events_array,
  
	    eventRender: function(event, element) {

	    	//get the # of rooms so css classes will be applied accordingly
	    	var res = $('#calendar').fullCalendar('getResources').length; 
	    	
	    	event.patient_name = event.patient_name.toUpperCase();
	    	
	    	//give appts the room name if in week agenda
	    	var view = $('#calendar').fullCalendar('getView'); 
	    	if (view.name === "agendaWeek") { 

	    		switch(event.resourceId){
	    			case "a" :
	    				event.title = "O1";
	    				break;
    				case "b" :
    					event.title = "O2";
    					break;
    				case "c" :
    					event.title = "O3";
    					break;
    				case "d" :
    					event.title = "P1";
    					break;
    				case "e" :
    					event.title = "P2";
    					break;   					    					
	    		}

	    		element.html("<div class='col-week'>" + event.title + "</div>")

	    	}else if(res > 6) { //html for calendars with less than 6 rooms
    			element.html("<div><div class='col-1-day-7'><div class='main-day'><div class='name-day'>" + event.patient_name + "</div><div class='procedure-day'>" + event.procedure + "</div></div><div class='doctor-day'>" + event.doctor_name + "</div></div><div class='col-2-day-7'><div class='office-day-7'>" + event.office + "</div><img class='icon-day-7' src='icons/heart-checkup.png' alt='img' ></div></div>")
	    	}else { //html for calendars with more than 6 rooms
	    		element.html("<div><div class='col-1-day'><div class='main-day'><div class='name-day'>" + event.patient_name + "</div><div class='procedure-day'>" + event.procedure + "</div></div><div class='doctor-day'>" + event.doctor_name + "</div></div><div class='col-2-day'><div class='office-day'>" + event.office + "</div><img class='icon-day' src='icons/heart-checkup.png' alt='img' ></div></div>")
	    	}

	    },


    })

});



