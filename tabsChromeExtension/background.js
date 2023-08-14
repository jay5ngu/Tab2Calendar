// each tab has their own console log that tracks the lifespan of each individual tab (similar to threads)
console.log("Background code running...")
var previousUrl = null;

// for when you go to new tab different from current tab
chrome.tabs.onActivated.addListener(function (activeInfo)
{
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        var newUrl = new URL(url);
        console.log("Printing from onActivated(): " + newUrl.hostname);
    });
});

// for when you go to new url from current tab
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.status == "complete" && tab.url != 'chrome://newtab/')
    {
        var newUrl = new URL(tab.url);
        console.log("Printing from onUpdated() " + newUrl.hostname);
    }
});