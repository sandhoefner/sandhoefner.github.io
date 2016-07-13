// Called when the user clicks on the browser action.
	chrome.browserAction.onClicked.addListener(function(tab) {
	  // No tabs or host permissions needed!
	  console.log('Filling form at ' + tab.url);
	  chrome.tabs.executeScript(null, {file: "page.js"});
	});