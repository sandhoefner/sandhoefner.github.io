/*
to implement:
    time remaining
    go to certain date
    export all
    fold unseen peek into same 
    should I leverage searching somehow?
*/

// declare function outside of onload!
function scroll(){
        var y = box.scrollTop();
        setTimeout(function(){box.scrollTop(y-150);},1000);
}

window.onload = function() {
    console.log("all set");

    box = $(".uiScrollableAreaWrap.scrollable")

    scroll();

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