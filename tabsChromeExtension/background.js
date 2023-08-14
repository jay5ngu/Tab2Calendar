// each tab has their own console log that tracks the lifespan of each individual tab (similar to threads)
console.log("Background code running...")
var previousUrl = null;

// for when you go to new tab different from current tab
chrome.tabs.onActivated.addListener(function (activeInfo)
{
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        if (tabs[0].status == "complete")
        {
            var newUrl = tabs[0].url;
            newUrl = new URL(newUrl);
            newUrl = newUrl.hostname.replace("www.", "");
            console.log("Printing from onActivated(): " + newUrl);
            if (previousUrl == null)
            {
                previousUrl = newUrl;
            }
            else if (previousUrl != newUrl)
            {
                previousUrl = newUrl;
                console.log("URL changed to " + previousUrl);
            }
        }
    });
});

// for when you go to new url from current tab
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.status == "complete") // && tab.url != 'chrome://newtab/'
    {
        var newUrl = new URL(tab.url);
        newUrl = newUrl.hostname.replace("www.", "");
        console.log("Printing from onUpdated() " + newUrl);
        if (previousUrl == null)
        {
            previousUrl = newUrl;
        }
        else if (previousUrl != newUrl)
        {
            previousUrl = newUrl;
            console.log("URL changed to " + previousUrl);
        }
    }
});