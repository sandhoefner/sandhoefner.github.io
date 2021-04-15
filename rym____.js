// https://rateyourmusic.com/customchart

// document += '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">';
var artists = document.getElementsByClassName("artist");
var autocorrect = 1;
var user = "sandhoefner";

for (i = 0; i < artists.length; i++) {
	var artist = artists[i].innerText;
	console.log('iterating');

	var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=1cdf9cbf8e7dd2873137483e6cb9ccf5&format=json&autocorrect=" + autocorrect + "&username=" + user;

		// https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function () {
			console.log('request loaded');
		    // Begin accessing JSON data here
		    var data = JSON.parse(this.response);
		    if (request.status >= 200 && request.status < 400) {
	
			        // gotta buffer to get in order?
			        console.log(data);
			        var scrobbles = data.artist.stats.userplaycount;
			        
			        var outlink = "https://www.last.fm/user/"+user+"/library/music/"+artist;
			        artist.innerHTML += ("<a target='_blank' href='" + outlink + "'> (" + scrobbles + "scrobbles)</a>");
	
		    } else {
		        console.log('api error');
		    }
		}
		request.send();
}