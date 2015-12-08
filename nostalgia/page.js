window.onload = function() {
    console.log("going");
    console.log(document.getElementById("see_older"));
    for (i=0; i<10; i++) {
        $("#see_older").trigger("click");
        document.getElementById('see_older').click();
    }
}