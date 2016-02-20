// Regex-pattern to check URLs against.
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
//var urlRegex = /^http?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;
var urlRegex = /^http/;
var curtab
var d = new Date();
var lastupdate = d.getTime();
var lasthost = "";
var hostrepeatcounter = 0;

var urls=["https://www.reddit.com/r/cats","http://bing.com/?q=cats","http://boards.4chan.org/an/"]

function getUrl(){
	var randomIndex = Math.floor(Math.random() * urls.length);
	return urls[randomIndex]
}

function getLocation(href) {
	var l = document.createElement("a");
	l.href = href;
	return l;
}

// A function to use as callback
function loadNewPage(newurl) {
	nexthost = getLocation(newurl).hostname;
	console.log(nexthost);
	if (nexthost == lasthost) {
		hostrepeatcounter++;
		if (hostrepeatcounter > 10) {
			restartTrash();
		}
	} else {
		hostrepeatcounter = 0;
		lasthost = nexthost;
	}
    chrome.tabs.update(curtab.id,{url:newurl});
	setTimeout(function(){
		 chrome.tabs.sendMessage(curtab.id, {text: 'report_back'}, loadNewPage);
	 },2000)
	 lastupdate = d.getTime();
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({url: "main.html"});
    // ...check the URL of the active tab against our pattern and...
    //if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        //chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, loadNewPage);
    //}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.text === 'start'){
		doStart();
	}
});
function doStart() {
	chrome.tabs.create({url: getUrl()}, function(t){
		curtab=t
		setTimeout(function(){
			chrome.tabs.sendMessage(t.id, {text: 'report_back'}, loadNewPage);
		},2000)
	});
	setInterval(function(){
		if(lastupdate+5000 <= d.getTime()){
			restartTrash()
		}


	},5000)
	setInterval(restartTrash,60000)
}
function restartTrash(){
	chrome.tabs.update(curtab.id,{url:getUrl()});
	chrome.tabs.sendMessage(curtab.id, {text: 'report_back'}, loadNewPage);
}
