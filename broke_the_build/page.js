// Agar.io Mod (Version 1.1.0)
// a Chrome extension for the MMO game Agar.io
// by Evan Sandhoefner
// page.js

// CHANGELOG
// 1.1.0:
// black/white countdown text, reset timer, buffer timer

// from manifest:
// "browser_action": {
//   "default_title": "Agar.io Mod",
//   "default_icon": "doge-16-.png",
//   "default_popup": "popup.html"
// },
// A dynamic timer to inform your tactics in the crucial moments between split and merge.
var secs = 0;
// is it mass before split or after split?
var k = 7 / 300;

var mass_input = "";
var buffer = "";
var buffered = false;
var reset = false;

// var x = document.getElementById("overlays").createElement("CANVAS");
// x.id = "fuckled";
// console.log(x);

// http://stackoverflow.com/questions/11816431/how-to-add-a-html5-canvas-within-a-div
function loadCanvas(id) {
    var canvas = document.createElement('canvas');
    div = document.getElementById(id);
    canvas.id = "CursorLayer";
    canvas.width = .2 * window.innerWidth;
    canvas.height = .25 * window.innerHeight;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    // change border here for debugging
    canvas.style.border = "0px solid";
    div.appendChild(canvas)
}

var canvas;
var ctx;


window.onload = function() {
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
    myDiv.id = "myDiv";
    // myDiv.innerText = "fuckled!";
    loadCanvas("myDiv");



    canvas = document.getElementById("CursorLayer");
    ctx = canvas.getContext("2d");
    var x = document.getElementsByTagName("INPUT");
    var y = [];
    var cnt2 = 0;
    for (var cnt = 0; cnt < x.length; cnt++) {
        if (x[cnt].type == "checkbox") y.push(x[cnt]);
    }
    if (y[4].checked) {
        ctx.fillStyle = "white";
    }
    ctx.font = "30px Arial";













    function pressW() {
    var oEvent = document.createEvent('KeyboardEvent');
    var k = 87;
    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        console.log("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }
    document.dispatchEvent(oEvent);

    var oEvent = document.createEvent('KeyboardEvent');
    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keyup", true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keyup", true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        console.log("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }   
    document.dispatchEvent(oEvent);
}
window.pressW = pressW;
document.onkeypress = function(e) {
    e = e || window.event;
    if (e.keyCode == 102) {
        for (var i = 0; i<7; i++) {
            setTimeout(pressW, i * 80);
        }
    } else if (e.keyCode == 103) {
        for (var i = 0; i<50; i++) {
            setTimeout(pressW, i * 40);
        }
    } else if (e.keyCode == 104) {
        for (var i = 0; i<400; i++) {
            setTimeout(pressW, i * 5);
        }
    }
}
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
}

// probably shouldn't just do this 3 times
var x = document.getElementsByTagName("INPUT");
var y = [];
var cnt2 = 0;
for (var cnt = 0; cnt < x.length; cnt++) {
    if (x[cnt].type == "checkbox") y.push(x[cnt]);
}

y[4].id = "dark_mode_evan";
y[4].onclick = function() {
    if (y[4].checked) {
        ctx.fillStyle = "white";
    } else {
        ctx.fillStyle = "black";
    }
}

// document.onload = function() {
// $('input[type=checkbox]').change(
//     function(){
//         console.log("f");
//         if (this.checked && this.id == "dark_mode_evan") {
//             console.log("white");
//             ctx.fillStyle = "white";
//         } else if (this.id == "dark_mode_evan") {
//             console.log("black");
//             ctx.fillStyle = "black";
//         }
//     });
// }


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

        overlay_style = $("#overlays").css("display");

        if (secs <= 0 && overlay_style == "none") {
            secs = 30;
            countDown();
        }

    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
            mass_input += (parseInt(e.keyCode) - 48);
    } else if (e.keyCode == 13) {

        if (buffered) {
            secs -= k * parseInt(buffer);
            secs += k * parseInt(mass_input);   
        } else {
            secs += k * parseInt(mass_input);   
        }
        buffer = mass_input;
        buffered = true;
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

    } else if (e.keyCode == 83 /*s*/ ) {
        /*eve = new KeyboardEvent("keyup", {
            altKey: false,
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
            which: 87
        });
        // console.log(eve);
        eve.keyCode = 87;
        // console.log(eve);
        Object.defineProperty(eve, 'keyCode', {
            'value': 87
        });
        Object.defineProperty(eve, 'which', {
            'value': 87
        });
        // console.log(eve);
        document.dispatchEvent(eve);
        */
    } else if (e.keyCode == 82 /*r*/) {
        secs = 0;
        reset = true;
        buffered = false;
    }
}




var x = document.getElementsByTagName("INPUT");
var y = [];
var cnt2 = 0;
for (var cnt = 0; cnt < x.length; cnt++) {
    if (x[cnt].type == "checkbox") y.push(x[cnt]);
}

var modes = {
    "FFA": "",
    "Teams": ":teams",
    "Experimental": ":experimental",
    "Party": ":party"
}

chrome.storage.sync.get(['skins',
    'names',
    'colors',
    'mass',
    'theme',
    'stats', 'nick'//, 'region', 'mode'
], function(response) {
    if (response.skins) {
        y[0].click();
    }
    if (response.names) {
        y[1].click();
    }
    if (response.colors) {
        y[2].click();
    }
    // != false in case it doesn't exist, which would be the case if the user hadn't saved options
    if (response.mass != false) {
        y[3].click();
    }
    if (response.theme) {
        y[4].click();
    }
    if (response.stats) {
        y[5].click();
    }

    // "kill" hotkey could be useful
    // toggle extension is probably good practice

    // textbox and dropdowns
    // I don't think mode or region are working
    if (response.nick /*!= "undefined"*/ ) {
        document.getElementById('nick').value = response.nick;
    }
    if (response.region /*!= "undefined"*/ && response.region != "Auto") {
        document.getElementById('region').value = response.region;
    }
    if (response.mode /*!= "undefined"*/ ) {
        document.getElementById('gamemode').value = modes[response.mode];
        // console.log(document.getElementById('gamemode'));
        // console.log(document.getElementById("helloContainer"));
        $("#helloContainer").attr("data-gamemode", modes[response.mode]);
        // console.log(document.getElementById("helloContainer"));

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
    return Math.round(s * 100) / 100
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
        buffered = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});

var target = document.getElementById('overlays');
observer.observe(target, {
    attributes: true,
    attributeFilter: ['style']
});

function countDown() {

    // var canvas = document.getElementById("CursorLayer");
    // var ctx = canvas.getContext("2d");
    // ctx.font = "30px Arial";

    // unexpected behavior if you start the game before the page has finished loading

    // erase canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (secs > 0) {
        ctx.fillText(rounded(secs), 10, 50);
    } else {
        if (!reset) {
            ctx.fillText("MERGE", 10, 50);
            setTimeout(function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 3000)
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        buffered = false;
        reset = false;
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
        }, secs * 1000)
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




