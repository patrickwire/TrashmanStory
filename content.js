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

      //  alert("hi from content script"); //DOESN'T WORK ... do we ever get in here?
      grabLink(sendResponse)
    }
});

function grabLink(sendResponse) {

				var as = [].slice.call(document.getElementsByTagName("a"))
				links = as.filter(function(obj){
					return obj.href!="" && obj.href.indexOf("#")!=0
				});
					console.log(links);
					window.removeEventListener('onbeforeunload')
					if(links.length<3){
						sendResponse(document.referrer);
						window.history.back();
						return
					}
        	var randomIndex = Math.floor(Math.random() * links.length);

					console.log(randomIndex);
                sendResponse(links[randomIndex].href);
								links[randomIndex].removeEventListener('click')
								links[randomIndex].click()

}


function replaceSrc()
{
	[]
	 .forEach
	 .call(document.querySelectorAll('a[target="_blank"]'),
	  function(link) {
	   link.removeAttribute('target');
	 });
    var images = document.getElementsByTagName('img');

    for(var i = 0; i < images.length; i++)
    {
        var img = images[i];


          //  img.src = 'https://i.imgur.com/7hxzUvX.jpg';

    }
}

replaceSrc();
