document.getElementById("fill").onclick = function sendCode() {
chrome.tabs.executeScript(null, {file: "page.js"});
}

document.getElementById("save").onclick = function save() {
	alert("Save");
	// check integer between 1 and whatever inclusive
	input = document.getElementById("row").value;
	input = Number(input);
	if (Number.isInteger(input) && input >= 1) {
chrome.storage.sync.set({
                            'meta': input
                        }, function() {
                            alert("saved metadata row " + input);
                        });
} else {
	alert("invalid row");
}
}

document.getElementById("show").onclick = function show() {
		chrome.storage.sync.get('meta', function(result) {
			
			alert("metadata dummy");
		});
	}