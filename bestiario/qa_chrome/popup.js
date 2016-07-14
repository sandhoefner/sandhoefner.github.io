// when user clicks Fill, inject page.js into the active tab
document.getElementById("fill").onclick = function sendCode() {
    chrome.tabs.executeScript(null, {
        file: "page.js"
    });
}

// when user clicks Save, validate input and save if appropriate
document.getElementById("save").onclick = function save() {
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

// helper function to format date
function readable(date) {
    date = new Date(date);
    return date.toString();
}

// when user clicks Show: fetch metadata, format, display in popup
document.getElementById("show").onclick = function show() {
    chrome.storage.sync.get('meta', function(result) {
        chrome.storage.sync.get('posted', function(hist) {
            var myWindow = window.open("", "Metadata", "width=400,height=400");
            report = "next row: " + result.meta + "<br><br>post history, sorted by ID:<br>";
            inside = hist.posted;
            for (var property in inside) {
                if (inside.hasOwnProperty(property)) {
                    report = report + "posted id " + property + " on " + readable(inside[property]) + "<br>";
                }
            }
            myWindow.document.getElementsByTagName("body")[0].innerHTML = report;
        });
    });
}