window.onload = function() {
    console.log("page.js is running");

    function pressW() {
        var new_event = new KeyboardEvent("keydown", {
            "key": "w",
            "char": "w",
            shiftKey: true
        });
        Object.defineProperty(new_event, 'keyCodeVal', {
            value: 87
        });
        Object.defineProperty(new_event, 'keyCode', {
            value: 87
        });
        Object.defineProperty(new_event, 'which', {
            value: 87
        });
        Object.defineProperty(new_event, 'bubbles', {
            value: true
        });
        Object.defineProperty(new_event, 'cancelable', {
            value: true
        });
        Object.defineProperty(new_event, 'keyIdentifier', {
            value: 'false'
        });
        Object.defineProperty(new_event, 'metaKey', {
            value: true
        });
        Object.defineProperty(new_event, 'view', {
            value: window
        });

        console.log("dispatching new keydown:");
        console.log(new_event);
        document.dispatchEvent(new_event);

        new_event = new KeyboardEvent("keyup", {
            "key": "w",
            "char": "w",
            shiftKey: true
        });
        Object.defineProperty(new_event, 'keyCodeVal', {
            value: 87
        });
        Object.defineProperty(new_event, 'keyCode', {
            value: 87
        });
        Object.defineProperty(new_event, 'which', {
            value: 87
        });
        Object.defineProperty(new_event, 'bubbles', {
            value: true
        });
        Object.defineProperty(new_event, 'cancelable', {
            value: true
        });
        Object.defineProperty(new_event, 'keyIdentifier', {
            value: 'false'
        });
        Object.defineProperty(new_event, 'metaKey', {
            value: true
        });
        Object.defineProperty(new_event, 'view', {
            value: window
        });

        console.log("dispatching new keyup:");
        console.log(new_event);
        document.dispatchEvent(new_event);
    }

    window.pressW = pressW;

    document.onkeypress = function(e) {
        e = e || window.event;
        if (e.keyCode == 102) {
            console.log("f");
            for (var i = 0; i < 7; i++) {
                setTimeout(pressW, i * 80);
            }
        } else if (e.keyCode == 103) {
            console.log("g");
            for (var i = 0; i < 50; i++) {
                setTimeout(pressW, i * 40);
            }
        } else if (e.keyCode == 104) {
            console.log("h");
            for (var i = 0; i < 400; i++) {
                setTimeout(pressW, i * 5);
            }
        }
    }
}
