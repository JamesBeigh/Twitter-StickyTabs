/**
 * @author James Macdonald
 */
pageInit();
function pageInit()
{
	var stickyTabsExtensionMessagingDiv=document.createElement("div");
	
	stickyTabsExtensionMessagingDiv.id="stickyTabsExtensionMessagingDiv";
	stickyTabsExtensionMessagingDiv.display="none";
	stickyTabsExtensionMessagingDiv.setAttribute("url","");
	stickyTabsExtensionMessagingDiv.addEventListener("stickTabsExtensionOnclick", function(){chrome.extension.connect({name:"linkClick"}).postMessage({url:document.getElementById("stickyTabsExtensionMessagingDiv").getAttribute("url")})},false);
	
	document.body.addEventListener("DOMSubtreeModified",function(){chrome.extension.connect({name:"DOMmodified"}).postMessage({tabUrl:window.location.href,tabTitle:document.title})},false);
	
	document.body.appendChild(stickyTabsExtensionMessagingDiv);
	
	stickyTabsExtensionMessagingDiv=null;
}