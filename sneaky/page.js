function KeyPress(e) {
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 77 && evtobj.ctrlKey) {
        var messages = document.getElementsByClassName("snippet preview");
        console.log(messages);
          myWindow = window.open("", "Messages", "width=400, height=300");
          // this works to clear window but then it doesn't repopulate...
          // myWindow.document.documentElement.innerHTML = "";
        for (i=0; i < messages.length; i++ ) {
            myWindow.document.write("<p>" + messages[i].lastChild.innerText + "</p>");
        }

      
    }
}

document.onkeydown = KeyPress;


