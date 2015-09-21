/*var noodle;

window.onkeyup = function(ee) {
  noodle = ee;
  pressW();
}

function pressW() {
    var oEvent = document.createEvent('KeyboardEvent');
    // keyCode for w
    var k = 87;
    //Chromium Hack
    // Object.defineProperty(oEvent, 'keyCode', {
    //     get: function() {
    //         return this.keyCodeVal;
    //     }
    // });
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


    // if (e.keyCode !== k) {
    //     console.log("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    // }
    document.dispatchEvent(oEvent);
}

//window.pressW = pressW;

/*
// do this when any key pressed
document.onkeypress = function(e) {
    // if e isn't defined, set it to window.event
    e = e || window.event;
    // numpad 6
    if (e.keyCode == 102) {
        for (var i = 0; i < 7; i++) {
            // call pressW 7 times, waiting (0,80,160,...,480) between calls
            setTimeout(pressW, i * 80);
        }
        // numpad 7
    } else if (e.keyCode == 103) {
        for (var i = 0; i < 50; i++) {
            // call pressW 50 times, waiting (0,40,80,...,1960) between calls
            setTimeout(pressW, i * 40);
        }
        // numpad 8
    } else if (e.keyCode == 104) {
        // call pressW 400 times, waiting (0,5,10,...,1995) between calls
        for (var i = 0; i < 400; i++) {
            setTimeout(pressW, i * 5);
        }
    }
}
*/
