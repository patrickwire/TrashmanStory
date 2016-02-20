chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
	if(msg.text === 'report_back') {
		//sendResponse(document.all[0].outerHTML);
		var randomLink = Math.floor(Math.random() * document.getElementsByTagName("a").length);
		sendResponse(document.getElementsByTagName("a")[randomLink].href);
	}
});
