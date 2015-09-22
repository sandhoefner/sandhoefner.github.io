// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var secs = 0;
var k = .02;
  
var mass_input = "";

// var x = document.getElementById("overlays").createElement("CANVAS");
// x.id = "fuckled";
// console.log(x);

// http://stackoverflow.com/questions/11816431/how-to-add-a-html5-canvas-within-a-div
function loadCanvas(id) {
        var canvas = document.createElement('canvas');
        div = document.getElementById(id); 
        canvas.id     = "CursorLayer";
        canvas.width  = .2*window.innerWidth;
        canvas.height = .25*window.innerHeight;
        canvas.style.zIndex   = 8;
        canvas.style.position = "absolute";
        canvas.style.border   = "1px solid";
        div.appendChild(canvas)
    }

    

window.onkeyup = function(e) {
  console.log(e);
    var adder = 0;
    if (e.keyCode == 32) {

      document.body.innerHTML +='<iframe id="injectedCanvas" style="position:absolute;width:100px;height:100px;opacity:0.3;z-index:-11111100;background:#000;"></iframe>';

    loadCanvas("injectedCanvas");

var canvas = document.getElementById("CursorLayer");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World",10,50);
      secs += 30;
      countDown();
      
    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
      
      mass_input += (parseInt(e.keyCode) - 48);

    } else if (e.keyCode == 13) {
   
      
      secs += k*parseInt(mass_input);
      mass_input = "";

//       var margin = {top: 50, bottom: 10, left: 300, right: 40};
// var width = 1650 - margin.left - margin.right;
// var height = 400 - margin.top - margin.bottom;

// var timer_box = d3.select("body").append("svg")
//   .attr("id", "box")
//   .attr("width", width)
//   .attr("height", height);

//   timer_box.append("rect") 
//         .attr("x", 200)
//         .attr("y", 200)
//         .attr("width", 200)
//         .attr("height", 200)
//         .attr("fill", "black")
//         .attr("fill-opacity", .75);

    } else if (e.keyCode == 83 /*s*/) {
       eve = new KeyboardEvent("keyup", {altKey: false,
bubbles: true,
cancelBubble: false,
cancelable: true,
charCode: 0,
ctrlKey: false,
currentTarget: null,
defaultPrevented: false,
detail: 0,
eventPhase: 0,
keyCode: 87,
keyIdentifier: "U+0057",
keyLocation: 0,
location: 0,
metaKey: false,
// path: Array[4],
repeat: false,
returnValue: true,
shiftKey: false,
// srcElement: body,
// target: body,
type: "keyup",
// view: Window,
which: 87});
       console.log(eve);
       eve.keyCode = 87;
       console.log(eve);
       Object.defineProperty(eve, 'keyCode', {'value': 87});
       Object.defineProperty(eve, 'which', {'value': 87});
       console.log(eve);
      document.dispatchEvent(eve);

}
}
    




var x = document.getElementsByTagName("INPUT");
var y = [];
var cnt2 = 0;
for (var cnt = 0; cnt < x.length; cnt++) {
    if (x[cnt].type == "checkbox") y.push(x[cnt]);
}

var modes = {"FFA":"","Teams":":teams","Experimental":":experimental","Party":":party"}

chrome.storage.sync.get(['skins',
'names',
'colors',
'mass',
'theme',
'stats','nick','region','mode'], function(response) {
    if (response.skins) {
      y[0].click();
    }  if (response.names) {
y[1].click();
      }  if (response.colors) {
y[2].click();
      }  if (response.mass) {
y[3].click();
      }  if (response.theme) {
y[4].click();
      }  if (response.stats) {
y[5].click();
      } 

      // textbox and dropdowns
      // I don't think mode or region are working
      document.getElementById('nick').value = response.nick;
    document.getElementById('region').value = response.region;

    document.getElementById('gamemode').value = modes[response.mode];
});



// y[3].dispatchEvent(new Event('change', { 'bubbles': true }))
// console.log("fail");

// console.log(y[3]);

// console.log(y[3].checked);
// y[3].checked = true;
// y[3].checked = false;
// y[3].checked = true;
// console.log(y[3].checked);


// y[3].onchange();

var iframe = document.createElement('iframe');
iframe.frameBorder = 1;
iframe.width = "500px";
iframe.height = "250px";
iframe.id = "iframe";




function countDown() {

    console.log(secs);
    if (secs >= 1) {
    setTimeout(function() {
      secs--;
      countDown(secs);
    }, 1000)
  }
    
  }






// create svg canvas
// window.onload = function() {
//   console.log("loaded");

//         }

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    console.log(msg);
    port.postMessage({counter: msg.counter+1});
  });
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({counter: request.counter+1});
  });





// http://pastie.org/10199526

