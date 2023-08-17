from __future__ import print_function

from datetime import datetime
import os.path
import json
import asyncio
import websockets

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar']

class Tabs2Calendar():
    def __init__(self, googleCalendar):
        self.creds = None # credential authorization
        self.service = None # object that manipulates google calendar API
        self.CALENDAR_ID = None # ID url of google calendar

        # get google calendar id/url
        if googleCalendar.lower().endswith('.json'):
            try:
                file = open(googleCalendar)
                tempJson = json.load(file)
                self.CALENDAR_ID = tempJson["CALENDAR_ID"]
            except KeyError:
                print("File does not contain valid key.")
                print("Please provide json file with key 'CALENDAR_ID'")
            finally:
                file.close()
        else:
            print("Incorrect file type.")
            print("Please provide json file with key 'CALENDAR_ID'")

        # token.json file stores the user's access and refresh tokens
        # created automatically when the authorization flow completes for the first time
        if os.path.exists('token.json'):
            self.creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        # if there are no (valid) credentials available, let the user log in.
        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                self.creds = flow.run_local_server(port=0)
            # save the credentials for the next run
            with open('token.json', 'w') as token:
                token.write(self.creds.to_json())

        try:
            self.service = build('calendar', 'v3', credentials=self.creds)
        except HttpError as error:
            self.service = None
            print('An error occurred: %s' % error)

    def printEvents(self):
        # confirms google api is connected
        if self.service:
            # call the Google Calendar API
            currentTime = datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
            print('Getting the upcoming 10 events')
            events_result = self.service.events().list(calendarId=self.CALENDAR_ID,
                                                  timeMin=currentTime,
                                                  maxResults=10, singleEvents=True,
                                                  orderBy='startTime').execute()
            events = events_result.get('items', [])

            if not events:
                print('No upcoming events found.')
                return

            # Prints the start and name of the next 10 events
            for event in events:
                start = event['start'].get('dateTime', event['start'].get('date'))
                print(start, event['summary'])
        else:
            print("Authentication Error")


    def createEvent(self, message):
        # confirms google api is connected
        if self.service:
            event = {
                'summary': 'Replace with websiteName',
                # 'location': '510 East Peltason Drive',
                # 'description': 'Can maybe put specific website url',
                'start': {
                    'dateTime': '2023-08-09T09:00:00', # replace with startTime "8/16/2023, 7:00:00 PM",
                    'timeZone': 'America/Los_Angeles',
                },
                'end': {
                    'dateTime': '2023-08-09T17:00:00', # replace with endTime "8/16/2023, 10:00:00 PM",
                    'timeZone': 'America/Los_Angeles',
                },
            }
            self.service.events().insert(calendarId=self.CALENDAR_ID, body=event).execute()
            print("Event Added!")

        else:
            print("Authentication Error")

async def messageHandler(websocket):
    while True:
        message = await websocket.recv()
        msgParse = json.loads(message)
        dateObject = datetime.strptime(msgParse["recordedTime"], "%m/%d/%Y, %H:%M:%S %p")
        # tabs.createEvent(msgParse)

async def webServer():
    async with websockets.serve(messageHandler, "localhost", 3000):
        await asyncio.Future()  # run forever

if __name__ == '__main__':
    tabs = Tabs2Calendar("googleCalendar.json")
    # tabs.createEvent(None)
    asyncio.run(webServer())