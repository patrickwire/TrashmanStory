// Regex-pattern to check URLs against.
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
//var urlRegex = /^http?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;
var urlRegex = /^http/;
var curtab
var d = new Date();
var lastupdate = d.getTime();
var lasthost = "";
var hostrepeatcounter = 0;
var counter=0;
var intervalReset;
var intervalStuck;


var urls=["https://www.reddit.com/r/cats","http://amazon.com/","http://bing.com/?q=bagger","http://bing.com/?q=samurai","http://bing.com/?q=ninja","http://bing.com/?q=kran","http://bing.com/?q=cats","http://boards.4chan.org/an/"]

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
	if(newurl.indexOf(chrome.runtime.id)!=-1){

		killThis()
		return
	}
	counter++
	nexthost = getLocation(newurl).hostname;
	console.log(nexthost);
	chrome.runtime.sendMessage({text:"logging", info: nexthost+"..."+newurl});
	if (nexthost == lasthost) {
		hostrepeatcounter++;
		if (hostrepeatcounter > 10) {
			restartTrash();
			return;
		}
	} else {
		hostrepeatcounter = 0;
		lasthost = nexthost;
	}
    chrome.tabs.update(curtab.id,{url:newurl});

	setTimeout(function(){
		 chrome.tabs.sendMessage(curtab.id, {text: 'report_back'}, loadNewPage);
	 },3000)
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
	chrome.browserAction.setIcon({path:"favicon_on.png"})
	chrome.tabs.create({url: getUrl()}, function(t){
		curtab=t
		setTimeout(function(){
			chrome.tabs.sendMessage(t.id, {text: 'report_back'}, loadNewPage);
		},2000)
	});
	intervalStuck=setInterval(function(){
		if(lastupdate+5000 <= d.getTime()){
			restartTrash()
		}


	},5000)
	intervalReset=setInterval(restartTrash,60000)
}
function restartTrash(){
	chrome.tabs.update(curtab.id,{url:getUrl()});
	chrome.tabs.sendMessage(curtab.id, {text: 'report_back'}, loadNewPage);
}


chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
if(tabId==curtab.id){
	killThis()
}

})

function killThis(){
	clearInterval(intervalStuck)
	clearInterval(intervalReset)
	chrome.browserAction.setIcon({path:"favicon_off.png"})
}
