/**
 * @author James Macdonald
 */
getLinksAndSetEvents();
function getLinksAndSetEvents()
{
	var links=document.getElementsByTagName("a")
	
	for(b=0,numLinks=links.length; b<numLinks; b++)
	{
		var currentLink=links[b];
		
		if(currentLink.target=="_blank")
		{
			currentLink.setAttribute("originalURL", currentLink.href);
			currentLink.setAttribute("onclick",'/*STICKYTABS WAS HERE*/document.getElementById("stickyTabsExtensionMessagingDiv").setAttribute("url", "'+currentLink.href+'"');
			var onclick = document.createEvent("Event"); 
			onclick.initEvent("stickTabsExtensionOnclick", true, true);
			document.getElementById("stickyTabsExtensionMessagingDiv").dispatchEvent(onclick);
			currentLink.removeAttribute("target"),
			currentLink.removeAttribute("href"))
	}
}