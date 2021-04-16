// conscole script to act as chrome extension adding scrobble data to rym site

var autocorrect = "&autocorrect=1";
// var autocorrect = "";

function call(user, artist) {
	var url = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=1cdf9cbf8e7dd2873137483e6cb9ccf5&format=json&autocorrect=" + autocorrect + "&username=" + user;

	// https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function () {
	    // Begin accessing JSON data here
	    var data = JSON.parse(this.response);
	    if (request.status >= 200 && request.status < 400) {
		        var scrobbles = data.artist.stats.userplaycount;
		        var outlink = "https://www.last.fm/user/"+user+"/library/music/"+artist;
		        console.log(user + " has scrobbled " + artist + " " + scrobbles + " times");
	    } else {
	        console.log('api error');
	    }
	}
	request.send();
}

call("sandhoefner","stereolab");