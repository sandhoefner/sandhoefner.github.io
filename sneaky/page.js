/*  problems:
    can't close popup window/clear its contents (without making it unwritable for future)
    emoji, mobile authors
*/

function KeyPress(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 77 && evtobj.ctrlKey) {
        var messages = document.getElementsByClassName("snippet preview");
        var authors = document.getElementsByClassName("author");
        if (typeof(myWindow) != "undefined") {
            if (myWindow.self != null) {
                var daddy = myWindow.self;
                daddy.opener = myWindow.self;
                daddy.close();
            }
        }
        myWindow = window.open("", "Messages", "width=400, height=300");
        for (i = 0; i < messages.length; i++) {
            myWindow.document.write("<p>" + authors[i].innerText + ": " + messages[i].lastChild.innerHTML + "</p>");
        }
    }
}

document.onkeydown = KeyPress;