var url = chrome.extension.getURL("options.html");
document.getElementById("settings").innerHTML="<a href='" + url + "' target='_blank'>Settings</a>";