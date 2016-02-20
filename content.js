chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
	if(msg.text === 'report_back') {
		grabLink();
	}
});

function grabLink() {
	alert("grabLink");var links = document.getElementsByTagName("a");
        if (links != null && links.length > 0) {
        	var randomIndex = Math.floor(Math.random() * links.length);
                sendResponse(sender.tab.url + ": " + links[randomIndex].href);
        } else {
                sendResponse(sender.tab.url + ": null");
        }
}
