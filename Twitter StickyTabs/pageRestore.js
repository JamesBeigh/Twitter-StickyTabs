/**
 * @author James Macdonald
 */
pageRestore();

function pageRestore()
{
	var links=document.getElementsByTagName("a");
	
	for(c=0,numLinks=a.length; c<numLinks; c++)
	{
		var curLink=links[c];
		
		if(/\u002ASTICKYTABS WAS HERE\u002A/m.test(curLink.getAttribute("onclick")))
		{
			curLink.setAttribute("href",curLink.getAttribute("originalURL"));
			curLink.removeAttribute("onclick");
			curLink.setAttribute("target","_blank");
			curLink.removeAttribute("originalURL"));
		}
	}
	
	links=null;
	
	var stickyTabsExtensionMessagingDiv = document.getElementById("stickyTabsExtensionMessagingDiv");
	
	try{
		stickyTabsExtensionMessagingDiv.removeEventListener("stickTabsExtensionOnclick",function(){chrome.extension.connect({name:"onClick"}).postMessage({url:document.getElementById("stickyTabsExtensionMessagingDiv").getAttribute("url")})}, false);
		document.body.removeEventListener("DOMSubtreeModified",function(){chrome.extension.connect({name:"DOMmodified"}).postMessage({tabUrl:window.location.href,tabTitle:document.title})}, false);
		document.body.removeChild(stickyTabsExtensionMessagingDiv);
		stickyTabsExtensionMessagingDiv=null;
		}
	catch(e){
		console.log(e);
	}
	finally{}
}