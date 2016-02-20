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
var token;


var urls=["https://www.reddit.com/r/cats","http://amazon.com/","http://bing.com/?q=bagger","http://bing.com/?q=samurai","http://bing.com/?q=ninja","http://bing.com/?q=kran","http://bing.com/?q=cats","http://boards.4chan.org/an/"]
var urlcat={hiphop:["http://bing.com/?q=hiphop", "http://bing.com/?q=rap", "http://bing.com/?q=breakdance", "http://bing.com/?q=graffiti", "http://bing.com/?q=djing", "http://bing.com/?q=gangstarap", "http://bing.com/?q=hiphop%20releases", "http://bing.com/?q=deutschrap", "http://bing.com/?q=sprechgesang", "http://bing.com/?q=hiphop%20tourdates", "http://bing.com/?q=hiphop%20release"],
						japan:["http://bing.com/?q=japan", "http://bing.com/?q=sushi%20bestellen", "http://bing.com/?q=japanisch%20lernen", "http://bing.com/?q=sumoringen", "http://bing.com/?q=samurei", "http://bing.com/?q=roher%20fisch", "http://bing.com/?q=kois%20zuechten", "http://bing.com/?q=fruehlingsfest", "http://bing.com/?q=japanisch", "http://bing.com/?q=hokkaido", "http://bing.com/?q=okinawa"],
					detective:["http://bing.com/?q=detektivbedarf", "http://bing.com/?q=sicherheitsbedarf", "http://bing.com/?q=überwachungskamera%20kaufen", "http://bing.com/?q=was%20soll%20ich%20mit%20meinem%20leben%20anstellen???", "http://bing.com/?q=abhörtechnik", "http://bing.com/?q=detektivbedarf", "http://bing.com/?q=nachtsichtgeräte", "http://bing.com/?q=teleobjektive", "http://bing.com/?q=undercover", "http://bing.com/?q=abhörschutz"
]}

urls=urlcat.hiphop;

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
function loadNewPage(data) {
	newurl=data.url
	if(token!=data.token){
		chrome.runtime.sendMessage({text:"logging", info: nexthost+"...OLDER THAN DINOS..."+newurl});

		return
	}
	if(newurl.indexOf(chrome.runtime.id)!=-1){

		killThis()
		return
	}
	counter++
	nexthost = getLocation(newurl).hostname;
	if(nexthost.indexOf(chrome.runtime.id)!=-1){

		return;
	}
	console.log(nexthost);
	chrome.runtime.sendMessage({text:"logging", info: nexthost+"..."+newurl});
	if (nexthost == lasthost) {
		hostrepeatcounter++;
		if (hostrepeatcounter > 10) {
			restartTrash();
			hostrepeatcounter=0;
			return;
		}
	} else {
		hostrepeatcounter = 0;
		lasthost = nexthost;
	}
    chrome.tabs.update(curtab.id,{url:newurl});
		setTimeout(function(){

			 chrome.tabs.sendMessage(curtab.id, {text: 'scroll'});
		 },500)
	setTimeout(function(){
		token=Date.now()
		 chrome.tabs.sendMessage(curtab.id, {text: 'report_back',token:token}, loadNewPage);
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
	if(request.text === 'stop'){
		 chrome.tabs.remove(curtab.id, function() { });
		killThis();
	}

});
function doStart() {
	chrome.browserAction.setIcon({path:"favicon_on.png"})
	chrome.tabs.create({url: getUrl()}, function(t){
		curtab=t
		setTimeout(function(){

			 chrome.tabs.sendMessage(curtab.id, {text: 'scroll'});
		 },500)
		setTimeout(function(){
			token=Date.now()
			chrome.tabs.sendMessage(t.id, {text: 'report_back',token:token}, loadNewPage);
		},2000)
	});
	intervalStuck=setInterval(function(){
		if(lastupdate+10000 <= d.getTime()){
			restartTrash()
			;
		}


	},10000)
	intervalReset=setInterval(restartTrash,60000)
}
function restartTrash(){
	lastupdate = d.getTime();
	chrome.runtime.sendMessage({text:"logging", info: "restart"});
	var newlink=getUrl()
	chrome.runtime.sendMessage({text:"logging", info: newlink});
	chrome.tabs.update(curtab.id,{url:newlink});
	setTimeout(function(){

		 chrome.tabs.sendMessage(curtab.id, {text: 'scroll'});
	 },500)

	setTimeout(function(){
	token=Date.now();
		chrome.tabs.sendMessage(curtab.id, {text: 'report_back',token:token}, loadNewPage);

	 },3000)
}


chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
if(tabId==curtab.id){
	killThis()
}

})

function killThis(){
		chrome.runtime.sendMessage({text:"stoped"});
	clearInterval(intervalStuck)
	clearInterval(intervalReset)
	chrome.browserAction.setIcon({path:"favicon_off.png"})
}
