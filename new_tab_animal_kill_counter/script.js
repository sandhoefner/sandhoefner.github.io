console.log("ok");

var period = 0.56321428571;

function increment(total) {
	document.getElementById("counter").innerText = total;
    setTimeout(function() {increment(total + 1);}, period);
}

increment(0);