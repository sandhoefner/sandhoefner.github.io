window.onload = function() {

window.onkeyup = function(e) {
    // console.log(e);
    // console.log(e);

    //
    //
    // just wrap the whole thing in if gameOn() dummy
    //
    //
    //
    var adder = 0;
    if (e.keyCode == 32 && gameOn()/*spacebar*/) {
        console.log("you just pressed spacebar");

        console.log("timer currently running: " + (secs > 0));
        console.log("game in progress: " + gameOn());
        if (secs <= 0 && gameOn()/*overlay_style == "none"*/     /*in_game*/) {
            // console.log("you're in-game and you don't already have a timer running, so I'll start one for you now");
            secs = 30;
            timing = true;
            countDown();
        }

    } else if (e.keyCode >= 48 && e.keyCode <= 57 && gameOn()/*any number*/) {
        console.log("you just pressed "+ (parseInt(e.keyCode)-48));
        console.log("game in progress: " + gameOn());
        console.log("timer already running: " + (secs > 0));
        if (gameOn() && secs > 0) {
            console.log("mass_input: ", mass_input);
            mass_input += (parseInt(e.keyCode) - 48);
                        console.log("mass_input: ", mass_input);

        }
    } else if (e.keyCode == 13 && gameOn()/*enter*/) {
        console.log("you just pressed enter");
        if (gameOn() && secs > 0) {
            console.log("you're in game and there's a timer running");
        if (buffered) {
            console.log("you already input a mass for this split so I'll replace it now");
            secs -= k * parseInt(buffer);
            secs += k * parseInt(mass_input);
        } else {
            console.log("this is your first mass input for this split");
            secs += k * parseInt(mass_input);
        }



}
    } else if ((e.keyCode == 83 /*s*/|| e.keyCode == 68 /*d*/  ) && gameOn()){
        numTimes = 0;
        realKey = 0;
        keyName = "";
        if (e.keyCode == 83) {
            numTimes = 7;
            realKey = 87;
            keyName = "s";
        } else {
            numTimes = 4;
            realKey = 32;
            keyName = "d";
        }
        for (i = 0; i <= numTimes; i++) {

            setTimeout(function(){
                triggerKeyEvent(realKey);

        triggerKeyEvent(realKey, "keyup");

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


    } else if (e.keyCode == 82 /*r*/&& gameOn()) {
console.log("you just pressed R so I'm resetting the timer");
        if (gameOn()) {
        secs = 0;
        reset = true;
        timing = false;
        buffered = false;
    }
    }
}