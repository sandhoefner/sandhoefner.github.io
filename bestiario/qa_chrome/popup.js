document.getElementById("fill").onclick = function sendCode() {
    chrome.tabs.executeScript(null, {
        file: "page.js"
    });
}

document.getElementById("save").onclick = function save() {
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

// may update later to include time
function readable(date) {
	date = new Date(date);
	return date.toDateString();
}

document.getElementById("show").onclick = function show() {
    chrome.storage.sync.get('meta', function(result) {
    	chrome.storage.sync.get('posted', function(hist) {
    		console.log(result);
    		console.log(hist);

    		var myWindow = window.open("", "Metadata", "width=400,height=400");
    		report = "next row: " + result.meta + "<br><br>post history:<br>";
    		inside = hist.posted;
    		for (var property in inside) {
    if (inside.hasOwnProperty(property)) {
    	console.log(typeof(inside[property]));
        report = report + "posted id " + property + " on " + readable(inside[property]) + "<br>";
    }
}
myWindow.document.write(report);
        });
    });
}