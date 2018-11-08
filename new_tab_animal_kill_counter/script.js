console.log("ok");

// var period = 0.56321428571;
// above is what it would be for 1, but JS granularity is insufficient
// (using the 56 billion per year)
var period = 18;

function increment(total) {
	document.getElementById("counter").innerText = total;
    setTimeout(function() {increment(total + 32);}, period);
}

increment(0);