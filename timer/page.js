// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var secs = 0;
var k = .02;

var mass_input = "";

window.onkeyup = function(e) {
    var adder = 0;
    if (e.keyCode == 32) {
      
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

    }
    
  }



var x = document.getElementsByTagName("INPUT");
var y = [];
var cnt2 = 0;
for (var cnt = 0; cnt < x.length; cnt++) {
    if (x[cnt].type == "checkbox") y.push(x[cnt]);
}

y[3].click();

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
