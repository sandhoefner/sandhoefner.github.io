window.onload = function() {
    console.log("going");
    
    var button;

    for (i=0; i<10000; i+=100) {
        setTimeout(function(){
            button = document.getElementsByClassName("touchable primary")[7];
            console.log("click");
            button.click();
        }, i);
    }
}