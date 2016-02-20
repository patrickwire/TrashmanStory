chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
	if(msg.text === 'report_back') {
		//sendResponse(document.all[0].outerHTML);
		var links = document.getElementsByTagName("a");
		if (links != null && links.length > 0) {
			var randomIndex = Math.floor(Math.random() * links.length);
			sendResponse(links[randomIndex].href);
		}
	}
});
