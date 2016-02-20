var link = document.getElementById('start');
var info = document.getElementById('overlayButton');
var overlay = document.getElementById('overlay');
function start() {
	chrome.runtime.sendMessage({text: 'start'});
	link.style.backgroundImage = "url('images/on.png')";
}
document.addEventListener('DOMContentLoaded', function(){
	link.addEventListener('click', start);
	info.addEventListener('click', showInfo);
	overlay.addEventListener('click', hideInfo);
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
function showInfo() {
	overlay.style.visibility = 'visible';
}
function hideInfo() {
	overlay.style.visibility = 'hidden';
}
