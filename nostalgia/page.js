window.onload = function() {
    console.log("going");
    console.log(document.getElementsByClassName("touchable primary"));
    
    var button;

    function flurry() {
        for (i=0; i<=10000; i+=100) {
            setTimeout(function(){
                button = document.getElementsByClassName("touchable primary")[7];
                console.log("click");
                button.click();
                if (i >= 10000) {
                    console.log(i,unfinished);
                    if (unfinished) {
                        flurry();
                    }
                }
            }, i);
        }
    }

    var unfinished = function() {
        var noodle;
            setTimeout(function(){
                button = document.getElementsByClassName("touchable primary")[7];
                if (typeof(button) != 'undefined' && button != null) {
                    noodle = true;
                } else {
                    noodle = false;
                }
                return noodle;
            }, 1000);
    }

    flurry();


    function boolfunc() {return true;}
    console.log("boolfunc",boolfunc);
}