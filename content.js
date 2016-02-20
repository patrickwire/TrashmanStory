/*chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
	if(msg.text === 'report_back') {
		grabLink();
	}
});*/

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing
           the web-pages DOM content as argument */

        alert("hi from content script"); //DOESN'T WORK ... do we ever get in here?
        sendResponse(document.all[0].outerHTML);
    }
});

function grabLink() {
	sendResponse(document.innerHTML);
	alert("grabLink");var links = document.getElementsByTagName("a");
        if (links != null && links.length > 0) {
        	var randomIndex = Math.floor(Math.random() * links.length);
                sendResponse(sender.tab.url + ": " + links[randomIndex].href);
        } else {
                sendResponse(sender.tab.url + ": null");
        }
}
