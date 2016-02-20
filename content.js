/*chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse){
	if(msg.text === 'report_back') {
		grabLink();
	}
});*/

var blacklist=["mail","sign","log","edit","delete","remove","pdf","#","jpg","jpeg","png","chrome","itunes","porn","sex","javascript","gif","mp3","xml","rss","acc","zip","mp4"]
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  setInterval(function(){
    window.scrollBy(5, 0);
  },500)
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing
           the web-pages DOM content as argument */

      //  alert("hi from content script"); //DOESN'T WORK ... do we ever get in here?
      grabLink(sendResponse,msg.token)
    }

        //document.body.innerHTML += '<div style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:100;background:url('+chrome.extension.getURL("overlay_right.png")+');background-position:bottom;background-repeat:no-repeat"></div>';

});

function grabLink(sendResponse,token) {

				var as = [].slice.call(document.getElementsByTagName("a"))
				links = as.filter(function(obj){
					for (i in blacklist){
						if(obj.href.toLowerCase().indexOf(blacklist[i])!=-1){
							return false;
						}
					}
					return obj.href!="" && obj.href.indexOf("#")!=0 && obj.href.indexOf("mailto")==-1&& obj.href.indexOf("pdf")==-1 && obj.href.indexOf("jpg")==-1&& obj.href.indexOf("png")==-1
				});
					console.log(links);
					window.removeEventListener('onbeforeunload',true)
					window.removeEventListener('onbeforeunload',false)
					if(links.length<3){
						sendResponse({url:document.referrer,token:token});

						return
					}
        	var randomIndex = Math.floor(Math.random() * links.length);

					console.log(randomIndex);
                sendResponse({url:links[randomIndex].href,token:token});
								links[randomIndex].removeEventListener('click',true)
								links[randomIndex].removeEventListener('click',false)
								//links[randomIndex].click()

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

window.onunload = function() {
   alert('by by Honey')
};
//document.body.innerHTML += '<div style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:100;background:url('+chrome.extension.getURL("overlay_right.png")+');background-position:bottom;background-repeat:no-repeat"></div>';
