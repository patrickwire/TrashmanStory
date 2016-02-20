function start() {
	chrome.runtime.sendMessage({text: 'start'});
}
document.addEventListener('DOMContentLoaded', function(){
	var link = document.getElementById('start');
	link.addEventListener('click', start);
});
