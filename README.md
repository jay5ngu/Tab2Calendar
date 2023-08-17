# tab2Calendar
A python script that records your day to day habits and what sites you frequently use. This script will track what site you are using and upload them into your google calendar so you can see where you allocate your time each day.

# Files needed to use this code
In order to use this chrome extension, you will need a file called credentials.json that contains the google calendar API client id. 
To create this client id, follow these instructions: https://developers.google.com/calendar/api/quickstart/python

You will also need another file called googleCalendar.json that contains the specific calendarID you wish to add the events to. This will be updated so that it is optional. It will contain a key called "CALENDAR_ID", and you may choose any specific calendar from google calendar.
