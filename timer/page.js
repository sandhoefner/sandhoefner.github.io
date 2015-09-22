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
        // change border here for debugging
        canvas.style.border   = "0px solid";
        div.appendChild(canvas)
    }

    var canvas;
    var ctx;


window.onload=function(){
var divs = d3.selectAll("div")[0];
// DANGER: some temperamental behavior with getting the correct div. be very cautious with anything that relies on his page architecture being a particular way.
var myDiv;
divs.forEach(function(d) {
  // just make this as descriptive as possible, then pray
  if (d.style.length == 1 && d.style[0] == "font-family") {
    myDiv = d;
  }
  });
// myDiv = divs[divs.length];
      myDiv.id =  "fuckled";
      myDiv.innerText = "fuckled!";
loadCanvas("fuckled");

    

     canvas = document.getElementById("CursorLayer");
 ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
                      }      

// document.body.innerHTML +='<svg width="100" height="100"></svg>';
// document.getElementById("canvas").style.position = "absolute";
    
// document.getElementById("canvas").style.zIndex = "0";

window.onkeyup = function(e) {
  // console.log(e);
    var adder = 0;
    if (e.keyCode == 32) {
      // $("#overlays").after("<div id='fuckle'></div>");
      // document.body.innerHTML +='<div id="fuckle" style="display:inline-block;"></div>';
      
      // console.log(divs[0][72]);
      
// var myWindow = window.open("", "", "top=0, status='no', titlebar='no', left=0, width=200, height=100");


//       document.body.innerHTML +='<iframe id="injectedCanvas" style="position:absolute;width:100px;height:100px;opacity:0.3;z-index:-11111100;background:#000;"></iframe>';



    
// ctx.fillText("Hello World",10,50);

// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// ctx.font = "30px Arial";
// ctx.fillText("Hello World",10,50);

// var canvas = document.getElementById("layer2");
// var ctx = canvas.getContext("2d");
// ctx.font = "30px Arial";
// ctx.fillText("Hello World",10,50);
// var svg = d3.select("body").append("svg")
//   .attr("width", 100)
//   .attr("height", 100)
//   .attr("id","fuckle");
//   // .attr("z-index",5000000000000000);


//   svg.append("rect")
//   .attr("x", 10)
//                              .attr("y", 10)
//                             .attr("width", 500)
//                             .attr("height", 500);
console.log(document.getElementById("overlays").style);
      if (secs == 0) {
      secs += 30;

      countDown();
    }
      
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
       // console.log(eve);
       eve.keyCode = 87;
       // console.log(eve);
       Object.defineProperty(eve, 'keyCode', {'value': 87});
       Object.defineProperty(eve, 'which', {'value': 87});
       // console.log(eve);
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
      if (response.nick /*!= "undefined"*/) {
      document.getElementById('nick').value = response.nick;
    }
    if (response.region /*!= "undefined"*/&& response.region != "Auto") {
    document.getElementById('region').value = response.region;
  }
if (response.mode /*!= "undefined"*/) {
    document.getElementById('gamemode').value = modes[response.mode];
  }
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

// var iframe = document.createElement('iframe');
// // change border here for debugging
// iframe.frameBorder = 0;
// iframe.width = "500px";
// iframe.height = "250px";
// iframe.id = "iframe";

function rounded(s) {
  return Math.round(s*100)/100
}


// console.log(rounded(0));
// console.log(rounded(1));
// console.log(rounded(11));
// console.log(rounded(111));
// console.log(rounded(1.2345888));
// console.log(rounded(12.345888));
// console.log(rounded(123.456888));
// console.log(rounded(1234.5678888));

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        // console.log(mutationRecord);
        secs = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });    
});

var target = document.getElementById('overlays');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });

function countDown() {

    // var canvas = document.getElementById("CursorLayer");
// var ctx = canvas.getContext("2d");
// ctx.font = "30px Arial";

// unexpected behavior if you start the game before the page has finished loading

// erase canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
if (secs > 0) {

ctx.fillText(rounded(secs),10,50);
} else {
ctx.fillText("MERGE",10,50);
setTimeout(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    }, 3000)
  }
    if (secs >= 1) {
    setTimeout(function() {
      secs--;
      countDown(secs);
    }, 1000)
  } else if (secs > 0) {
    setTimeout(function() {
      secs = 0;
      countDown(secs);
    }, secs*1000)
  }
    
  }






// create svg canvas
// window.onload = function() {
//   console.log("loaded");

//         }

// chrome.runtime.onConnect.addListener(function(port) {
//   port.onMessage.addListener(function(msg) {
//     console.log(msg);
//     port.postMessage({counter: msg.counter+1});
//   });
// });

// chrome.extension.onRequest.addListener(
//   function(request, sender, sendResponse) {
//     sendResponse({counter: request.counter+1});
//   });





// http://pastie.org/10199526

