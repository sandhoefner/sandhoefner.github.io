/*
to implement:
    time remaining
    go to certain date
    export all
    fold unseen peek into same 
    should I leverage searching somehow?
    will stop if wifi takes too long, also don't want to go slower than wifi is capable of, also don't want to overwhelm the stack
    this approach is inherently slow
    if I could find the begin date I could try searching common words to find whatever is closest to the begin date and then go from there??
    factor out vis's you've already done like family tree and countdown timer
    pause scroll
*/

// declare function outside of onload!
function scroll(){
        if (want==1) {
        var y = box.scrollTop();
        setTimeout(function(){box.scrollTop(y-150);},1000);
    }
}

want=0;

function peek(){
    console.log("peeking");
}

function scrollit(){
    want =1;
}

window.onload = function() {



    console.log("all set");

    box = $(".uiScrollableAreaWrap.scrollable")

    // scroll();

    messages_remaining = $("._7hx").children()[0].innerText;

    // select the target node
    var target = $("._7hx").children()[0];
     
    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation.type);
        scroll();
      });    
    });
     
    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true };
     
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
}