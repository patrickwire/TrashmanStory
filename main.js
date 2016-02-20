var link = document.getElementById('start');
var info = document.getElementById('overlayButton');
var logButton = document.getElementById('logButton');
var logBox = document.getElementById('log');
var overlay = document.getElementById('overlay');

var on=false;
var logToggle = false;
function start() {
	on=!on
	if(on){
		chrome.runtime.sendMessage({text: 'start'});
		link.style.backgroundImage = "url('images/on.png')";
	}else{
		chrome.runtime.sendMessage({text: 'stop'});
		link.style.backgroundImage = "url('images/off.png')";
	}

}
function stop() {
	chrome.runtime.sendMessage({text: 'stop'});
	link.style.backgroundImage = "url('images/off.png')";
}
document.addEventListener('DOMContentLoaded', function(){
	link.addEventListener('click', start);
	info.addEventListener('click', showInfo);
	overlay.addEventListener('click', hideInfo);
	logButton.addEventListener('click', showLog);
	logBox.addEventListener('click', hideLog);
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
	if (msg.text && (msg.text == "stoped")) {
		link.style.backgroundImage = "url('images/off.png')";
		on=false;
	}
});
function showInfo() {
	overlay.style.visibility = 'visible';
}
function hideInfo() {
	overlay.style.visibility = 'hidden';
}
function showLog() {
	logBox.style.visibility = 'visible';
}
function hideLog() {
	logBox.style.visibility = 'hidden';
}
