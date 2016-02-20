function start() {
	chrome.runtime.sendMessage({text: 'start'});
}
document.addEventListener('DOMContentLoaded', function(){
	var link = document.getElementById('start');
	link.addEventListener('click', start);
});
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
	if (msg.text && (msg.text == "logging")) {
		var logList = document.getElementById('log').getElementsByTagName('ul')[0];
		var entry = document.createElement('li');
		var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
		var infoMessage = document.createTextNode( myDate + ":" + msg.info);
		entry.appendChild(infoMessage);
		logList.insertBefore(entry,logList.childNodes[0]);
	}
});
