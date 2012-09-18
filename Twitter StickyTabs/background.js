/**
 * @author James Macdonald
 */
    
var tabsToStickOn,locked,domUpdateBlock;   
                
chrome.app.runtime.onLaunched.addListener(function(launchData){ 
	chrome.browserAction.onClicked.addListener(function(a){toggleStickTabs(a)});
});
                  
tabsToStickOn=[];                   
domUpdateBlock=locked=0;  
                 
chrome.extension.onConnect.addListener(
	function(a){
		if("linkClick"==a.name)
		{
			a.onMessage.addListener(stickyTabsOnclickHandler);                   
			return;
		}
		else if("DOMmodified"==a.name)
		{
			a.onMessage.addListener(DOMmodifiedEventHandler);  
			return;                 
		}
		console.log("unknown event, from content scripts.");
	}
	);        
		           
chrome.tabs.onUpdated.addListener(
	function(tab){
		if(inStickTabs(tab))
		{
			activateStickyTabs(tab);
			return;
		}
		else
		{
			return;
		}
		
	}
	);   
		                
chrome.tabs.onActiveChanged.addListener(
	function(a){
		if(inStickTabs(a))
		tabsToStickOn[inStickTabs(a)].domUpdateBlock=!1,
		chrome.tabs.executeScript(a,{file:"eventEditor.js"});  
                 
		else if(inStickTabs(a))
		for(a=0;a<tabsToStickOn.length;a++)tabsToStickOn[a].domUpdateBlock=!0
		}
	);
	
function toggleStickTabs(a){
	
	if(locked)
	{
		wait(500)
	}
	else if(tabsToStickOn.length==0)
	{
		checkAndShowHideDonatePopup(a);
		activateStickyTabs(a);
	}
	else if(inStickTabs(a))
	{
		checkAndShowHideDonatePopup(a);
		deactivateStickyTabs(a);
	}
	else
	{
		checkAndShowHideDonatePopup(a);
		activateStickyTabs(a);
	}
}
	
function removeStickTab(a){
	for(var b=0,c=[];b<tabsToStickOn.length;b++)
	tabsToStickOn[b].id!=a&&c.push(tabsToStickOn[b]);
	tabsToStickOn=null;                   
	tabsToStickOn=c
	}
	
function inStickTabs(a){
	if(typeof a == "number")
	{
		for(var b=0;b<tabsToStickOn.length;b++)
		{
			if(tabsToStickOn[b].id==a)
			return b
		}
	}
	
	else 
	{
		for(b=0;b<tabsToStickOn.length;b++)
		{
			if(tabsToStickOn[b].id==a.id)
			return b;                   
		}
	}
	return -1;
	}
	
function wait(a){
	setTimeout("toggleStickTabs()",a)
}
	
function changeEvents(a){
	var b=new Date;   
	                
	if(-1==a.lastUpdate)
	{
		a.lastUpdate=b.getTime()
		chrome.tabs.executeScript(a.id,{file:"eventEditor.js"})   
	}                
	else if(1E3<b.getTime()-a.lastUpdate)
	{
		a.lastUpdate=b.getTime()
		chrome.tabs.executeScript(a.id,{file:"eventEditor.js"})
	}	
}
	
function activateStickyTabs(a){
	locked=!0;                   
	imageDetails={path:"images/iconOnClick.png"};                   
	imageDetails.tabId=a.id;                   
	chrome.browserAction.setIcon(imageDetails);                   
	imageDetails=null;                   
	textDetails={title:"Twitter StickyTabs is active on this tab."};                   
	textDetails.tabId=a.id;                   
	chrome.browserAction.setTitle(textDetails);                   
	textDetails=null;                   
	chrome.tabs.executeScript(a.id,{file:"pagePreparerAndEventHandler.js"});                   
	chrome.tabs.executeScript(a.id,{file:"eventEditor.js"});                   
	a.lastUpdate=-1;                   
	a.domUpdateBlocked=!1;                   
	tabsToStickOn.push(a);                   
	locked=!1
}
function deactivateStickyTabs(a){
	locked=!0;                   
	imageDetails={path:"images/icon.png"};                   
	imageDetails.tabId=a.id;                   
	chrome.browserAction.setIcon(imageDetails);                   
	imageDetails=null;                   
	textDetails={title:"Click here to activate Twitter StickyTabs on this tab"};                   
	textDetails.tabId=a.id;                   
	chrome.browserAction.setTitle(textDetails);                   
	textDetails=null;                   
	chrome.tabs.executeScript(a.id,{file:"pageRestore.js"});                   
	removeStickTab(a.id);                   
	locked=!1
}
function checkAndShowHideDonatePopup(a){
	var b=new Date;                   
	if(15==b.getDate()&&localStorage.lastMonthShownDonate!=b.getMonth()){var c={};                   
	c.index=a.index+1;                   
	c.url=chrome.extension.getURL("donate.html");                   
	c.active=!0;                   
	localStorage.lastMonthShownDonate=b.getMonth();                   
	typeof("undefined"==localStorage.numberOfDonationRequests)?localStorage.numberOfDonationRequests=1:localStorage.numberOfDonationRequests++;                   
	chrome.tabs.create(c)
	}
}
function stickyTabsOnclickHandler(a){
	var b={};                   
	""!=a.url&&chrome.windows.getCurrent(function(c){chrome.tabs.getSelected(c.id,function(c){b.index=c.index+1;                   
		b.url=a.url;                   
		b.active=!1;                   
		chrome.tabs.create(b)})})
}
		
function DOMmodifiedEventHandler(){
	for(var a=0;a<tabsToStickOn.length;a++)
	!0!=tabsToStickOn[a].domUpdateBlock&&changeEvents(tabsToStickOn[a])
}                   