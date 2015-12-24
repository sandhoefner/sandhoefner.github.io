// window.onload = function() {
//     console.log("going");
//     $(".messagesContent").mouseover(function() {
//         console.log("mouseover");
//     });

//     $(".snippet preview").mouseover(function() {
//         console.log("mouseover");
//     });


//     var pills = document.getElementsByClassName("messagesContent");

//     // pills[0].addEventListener("mouseover", function() {console.log("balls");});

//     chrome.commands.onCommand.addListener(function(command) {
//         console.log('Command:', command);
//       });


//     function KeyPress(e) {
//       var evtobj = window.event? event : e
//       if (evtobj.keyCode == 77 && evtobj.ctrlKey) alert("Ctrl+z");
// }

// document.onkeydown = KeyPress;
// }

function KeyPress(e) {
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 77 && evtobj.ctrlKey) {
        alert("Ctrl+z");
    }
}

document.onkeydown = KeyPress;


