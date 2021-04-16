// console script to act as chrome extension adding scrobble data to rym site

// https://rateyourmusic.com/charts/top/album/1990-2029/g:pop/d:-male-vocals/

/* known issues:
		collab scrobbles get put into the mouseover
		remove either bracketed romanization or original characters to give lastfm a chance to autocorrect
*/

var artists = document.getElementsByClassName("artist");

var username = "sandhoefner";

var autocorrect = "&autocorrect=1";
// var autocorrect = "";

function call(user, artist, index) {
	var url = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=1cdf9cbf8e7dd2873137483e6cb9ccf5&format=json&autocorrect=" + autocorrect + "&username=" + user;

	// https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function () {
	    // Begin accessing JSON data here
	    var data = JSON.parse(this.response);
	    if (request.status >= 200 && request.status < 400) {
	    		var scrobbles;
		        try {
		        	scrobbles = data.artist.stats.userplaycount;
		        } catch (error) {
		        	console.error(artist + " throws the following error: " + error);
		        }

		        var outlink = "https://www.last.fm/user/" + user + "/library/music/" + artist;
		        var insert = document.createElement("div");
		        var stuff = "<a target='_blank' style='color:red; text-decoration-line: underline;' href='" + outlink + "'>" + user + "'s artist scrobbles: " + scrobbles + "</a>";
		        insert.innerHTML = stuff;
		        artists[index].insertAdjacentElement("afterend", insert);
	    } else {
	        console.log("api error for " + artist);
	    }
	}
	request.send();
}

console.log("\n\n\n\n\n\n\n\n\n\nsome data may be wrong due to e.g. special characters or naming differences between rym & lastfm");

for (i = 0; i < artists.length; i++) {
	call(username, artists[i].innerText, i);
}