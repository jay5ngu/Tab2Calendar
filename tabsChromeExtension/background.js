console.log("This is a popup!")

//chrome.tabs.onActivated.addListener(function (activeInfo)
//{
//    chrome.tabs.get(activeInfo.tabId, function (tab)
//    {
//        tabUrl = tab.url;
//        var request = new XMLHttpRequest();
//        request.onreadystatechange = function ()
//        {
//            if (this.readyState == 4 && this.status == 200)
//            {
//                console.log(this.responseText);
//            }
//        };
//        request.open("POST", "http://127.0.0.1:3000/tabUrl");
//        request.send("url=" + tabUrl)
//    });
//});
//
//chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//    if (tab.active && change.url) {
//        var request = new XMLHttpRequest();
//        request.onreadystatechange = function () {
//            if (this.readyState == 4 && this.status == 200) {
//                console.log(responseText);
//            }
//        };
//        request.open("POST", "http://127.0.0.1:3000/tabUrl");
//        request.send("url=" + change.url);
//    }
//});