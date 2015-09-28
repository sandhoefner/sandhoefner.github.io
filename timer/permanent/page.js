// AgroMod (Version 1.2.0)
// a Chrome extension for the MMO game Agar.io
// by Evan Sandhoefner
// page.js

// CHANGELOG
// 1.2.0:
// popup with quick instructions and link to options
// 7-w baby!

// 1.1.2:
// backspace doesn't leave page
// various logistics: check for in-game, check for timer-running; can't enter mass before spacebar, etc.
// print mass below timer for reference
// changed name and description
// layout options page

// 1.1.1:
// 'show mass' works for new users

// 1.1.0:
// black/white countdown text, reset timer, buffer timer

// from manifest:

// A dynamic timer to inform your tactics in the crucial moments between split and merge.
var secs = 0;
// is it mass before split or after split?
var k = 7 / 300;

var mass_input = "";
var buffer = "";
var buffered = false;
var reset = false;
var in_game = false;
var timing;

// var x = document.getElementById("overlays").createElement("CANVAS");
// x.id = "fuckled";
// console.log(x);







// http://stackoverflow.com/questions/11816431/how-to-add-a-html5-canvas-within-a-div
function loadCanvas(id) {
    var canvas = document.createElement('canvas');
    div = document.getElementById(id);
    canvas.id = "CursorLayer";
    canvas.width = .2 * window.innerWidth;
    canvas.height = .1 * window.innerHeight;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    // change border here for debugging
    canvas.style.border = "0px solid";
    div.appendChild(canvas)
}

function loadCanvas_2(id) {
    var canvas = document.createElement('canvas');
    div = document.getElementById(id);
    canvas.id = "CursorLayer_2";
    canvas.width = .2 * window.innerWidth;
    canvas.height = .25 * window.innerHeight;
    canvas.style.zIndex = 8;
    canvas.style.top = "50px";
    canvas.style.position = "relative";
    // change border here for debugging
    canvas.style.border = "0px solid";
    div.appendChild(canvas)
}

var canvas;
var ctx;

var canvas_2;
var ctx_2;

window.onload = function() {
    // http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
// Prevent the backspace key from navigating back.
$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && 
             (
                 d.type.toUpperCase() === 'TEXT' ||
                 d.type.toUpperCase() === 'PASSWORD' || 
                 d.type.toUpperCase() === 'FILE' || 
                 d.type.toUpperCase() === 'SEARCH' || 
                 d.type.toUpperCase() === 'EMAIL' || 
                 d.type.toUpperCase() === 'NUMBER' || 
                 d.type.toUpperCase() === 'DATE' )
             ) || 
             d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});





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

    loadCanvas_2("myDiv");


    canvas = document.getElementById("CursorLayer");
    ctx = canvas.getContext("2d");

 canvas_2 = document.getElementById("CursorLayer_2");
    ctx_2 = canvas_2.getContext("2d");

    var x = document.getElementsByTagName("INPUT");
    var y = [];
    var cnt2 = 0;
    for (var cnt = 0; cnt < x.length; cnt++) {
        if (x[cnt].type == "checkbox") y.push(x[cnt]);
    }
    if (y[4].checked) {
        ctx.fillStyle = "white";
        ctx_2.fillStyle = "white";
    }
    ctx.font = "30px Arial";
    ctx_2.font = "30px Arial";
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
        ctx_2.fillStyle = "white";
    } else {
        ctx.fillStyle = "black";
        ctx_2.fillStyle = "black";
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
    if (e.keyCode == 32 /*spacebar*/) {
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

        if (!timing && /*overlay_style == "none"*/in_game) {
            secs = 30;
            timing = true;
            countDown();
        }

    } else if (e.keyCode >= 48 && e.keyCode <= 57/*any number*/) {
        if (in_game && timing) {
            mass_input += (parseInt(e.keyCode) - 48);
        }
    } else if (e.keyCode == 13 /*enter*/) {
        if (in_game && timing) {
        if (buffered) {
            secs -= k * parseInt(buffer);
            secs += k * parseInt(mass_input);   
        } else {
            secs += k * parseInt(mass_input);   
        }
        buffer = mass_input;
        buffered = true;
        // write buffer to canvas
        
        ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);
    
        // if (/*secs > 0*/timing) {
ctx_2.fillText(parseInt(mass_input), 10, 50);
// }
// ctx_2.translate(0,100);
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
    } else if (e.keyCode == 83 /*s*/ ) {
        for (i = 0; i < 8; i++) {
            
            setTimeout(function(){triggerKeyEvent(87);
        triggerKeyEvent(87, "keyup");
        }, i*100);
        
    }
        function triggerKeyEvent(charCode, eventName) {
        eventName = eventName || "keydown";
        var s = document.createElement("script");
        s.textContent = "window.agarioTriggerKey(" + charCode + ", \"" + eventName + "\");";
        (document.head || document.documentElement).appendChild(s);
        s.parentNode.removeChild(s);
    }
    function addTriggerKeyFunction() {
        var s = document.createElement("script");
        s.textContent = "window.agarioTriggerKey = " + function(charCode, eventName) {
            var event = document.createEvent("KeyboardEvents");
            event.initKeyboardEvent(
                eventName
            );
            var getterCode = {
                get: function() {
                    return charCode;
                }
            };
            Object.defineProperties(event, {
                keyCode: getterCode
            });

            window.dispatchEvent(event);
        };
        (document.head || document.documentElement).appendChild(s);
        s.parentNode.removeChild(s);
    }
    addTriggerKeyFunction();
        /*
        console.log('s');
        var oEvent = document.createEvent('KeyboardEvent');
    var k = 87;
    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
        get: function() {
            return this.keyCodeVal;
        }
    });
    Object.defineProperty(oEvent, 'which', {
        get: function() {
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
    console.log(oEvent);
    document.dispatchEvent(oEvent);

    var oEvent = document.createEvent('KeyboardEvent');
    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
        get: function() {
            return this.keyCodeVal;
        }
    });
    Object.defineProperty(oEvent, 'which', {
        get: function() {
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
    console.log(oEvent);
    document.dispatchEvent(oEvent);
    */
    } else if (e.keyCode == 82 /*r*/) {

        if (in_game) {
        secs = 0;
        reset = true;
        timing = false;
        buffered = false;
    }
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
    // != false in case it doesn't exist, for new user
    // don't be a dummy m8. you had the extension running twice
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
        // check status of overlay div or something because t/f changes a million times when game ends so idk if that's robust
        secs = 0;
        buffered = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);

                in_game = !in_game;
// console.log(in_game);
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
                    // ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);


    if (secs > 0) {
        ctx.fillText(rounded(secs), 10, 50);
    } else {
        if (!reset) {
            ctx.fillText("MERGE", 10, 50);
            setTimeout(function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);

            }, 3000)
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);


        }
        buffered = false;
        timing = false;
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