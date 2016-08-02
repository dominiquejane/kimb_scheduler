---------------------------------
EVENTRENDER (original instructions)
---------------------------------

Assumptions made/constraints:
- time-slot height >= 4em; (see apptStyle.css)
- slot duration = 15 mins


Instructions to be added to submission:
- add eventRender function and "slotDuration: {minutes: 15}," to fullCalendar code
-add apptStyle.css and app.js files to project, if file not added to root of project then update the paths for html and js below:
- add '<link rel="stylesheet" href="apptStyle.css">' and '<script src="app.js"></script>' to the head of html file




---------------------------------
EVENTRENDER UPDATED + TOOLTIP
---------------------------------


-new links to add to html: <link rel="stylesheet" href="tooltipStyle.css">

-The eventRender function contains everything needed so it should be a simple copy+paste over the original eventRender

-Given the specs in the SOW I needed to update data to contain:
	{
		patient_firstName: "",
		patient_lastName: "",
		doctor_firstName: "",
		doctor_lastName: "",
		reason: "",
		notes: "",
		status: "",
	}

	remove this from data:
	{
		patient_name: "",
		doctor_name: "",
	}



---------------------------------
CHANGES
---------------------------------
-swapped bootstrap css file with flatly css file
-calendarStyle & filterStyle css files
-add jquery ui files









