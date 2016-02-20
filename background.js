// Regex-pattern to check URLs against.
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
//var urlRegex = /^http?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;
var urlRegex = /^http/;
var curtab
// A function to use as callback
function doStuffWithDom(domContent) {
    //console.log('I received the following DOM content:\n' + domContent);
	//alert("bg.js: " + domContent);
	chrome.tabs.update(curtab.id,{url:domContent});
	setTimeout(function(){
		 chrome.tabs.sendMessage(curtab.id, {text: 'report_back'}, doStuffWithDom);
	 },2000)
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({url: "main.html"});
    // ...check the URL of the active tab against our pattern and...
    //if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        //chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    //}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.text === 'start'){
		doStart();
	}
});
function doStart() {
	chrome.tabs.create({url: "http://de.wikipedia.org"}, function(t){
		curtab=t
		setTimeout(function(){
			chrome.tabs.sendMessage(t.id, {text: 'report_back'}, doStuffWithDom);
		},2000)
	});
}
