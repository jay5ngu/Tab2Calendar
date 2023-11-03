# tabs2Calendar
A python script that records your day to day habits and what sites you frequently use. This script will track what site you are using and upload them into your google calendar so you can see where you allocate your time each day.

# Files needed to use this code
In order to use this chrome extension, you will need a file called credentials.json that contains the google calendar API client id. 
To create this client id, follow these instructions: https://developers.google.com/calendar/api/quickstart/python

You will also need another file called googleCalendar.json that contains the specific calendarID you wish to add the events to. This will be updated so that it is optional. It will contain a key called "CALENDAR_ID", and you may choose any specific calendar from google calendar.

# How to run Program
As of right now, the python script must be running to host the server necessary to send messages between the chrome extension and the google calendar.

# Future Goals
The next step will be migrating the python script into the javascript code in order to remove the need for a server. This way, one file will be responsible for tracking websites and uploading them into the Google Calendar

Another goal is to give more functions to the user, such as disabling the tracker whenever they like and giving them alerts when they spend too much time on a website.
