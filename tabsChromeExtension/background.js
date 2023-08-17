// global variables used throughout the whole program
const socket = new WebSocket("ws://localhost:3000");
var currentTime = null;
var previousUrl = null;
var newUrl = null;
var message = {
    "timeType": null,
    "url": null,
    "recordedTime": null
};

console.log("Background code running...")

// if the server disconnects
socket.onclose = function (event) {
    // Connection closed.
    socket.close();
    console.log("Websocket disconnected");
}

// for when you go to new tab different from current tab
chrome.tabs.onActivated.addListener(function (activeInfo)
{
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        if (tabs[0].status == "complete")
        {
            currentTime = new Date();
            message["recordedTime"] = currentTime.toLocaleString();

            newUrl = tabs[0].url;
            newUrl = new URL(newUrl);
            newUrl = newUrl.hostname.replace("www.", "");
            message["url"] = newUrl;
            console.log("Printing from onActivated(): " + newUrl);

            processUrlChange();
        }
    });
});

// for when you go to new url from current tab
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.status == "complete") // && tab.url != 'chrome://newtab/'
    {
        currentTime = new Date();
        message["recordedTime"] = currentTime.toLocaleString();

        newUrl = new URL(tab.url);
        newUrl = newUrl.hostname.replace("www.", "");
        message["url"] = newUrl;
        console.log("Printing from onUpdated() " + newUrl);

        processUrlChange();
    }
});

function processUrlChange()
{
    if (previousUrl == null)
    {
        message["timeType"] = "start";
        previousUrl = newUrl;
        console.log("Previous url now set to " + previousUrl);
        sendData();
    }
    else if (previousUrl != newUrl)
    {
        message["timeType"] = "end";
        previousUrl = newUrl;
        console.log("URL changed to " + previousUrl);
        sendData();
    }
    else
    {
        console.log("Same URL. No data will be sent.");
    }
}

function sendData()
{
    if (socket.readyState !== WebSocket.CLOSED)
    {
        socket.send(JSON.stringify(message));
        console.log("URL sent!");
    }
    else
    {
        console.log("Unable to send URL. Websocket Currently Closed");
    }
}