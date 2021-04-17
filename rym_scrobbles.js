// console script to act as chrome extension adding scrobble data to rym site

// https://rateyourmusic.com/charts/top/album/1990-2029/g:pop/ge:-video-game-music,-television-music,-film-soundtrack/d:-male-vocals/

/* known issues:
		collab scrobbles get put into the mouseover
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
	    		var score = "(undefined)";
		        try {
		        	scrobbles = data.artist.stats.userplaycount;
		        	if (scrobbles == 0) {
		        		score = "(*)";
		        		console.log(url);
		        	} else if (scrobbles < 10) {
		        		score = "(**)";
		        	} else if (scrobbles < 100) {
		        		score = "(***)";
		        	} else if (scrobbles >= 100) {
		        		score = "(****)";
		        	} 
		        } catch (error) {
		        	console.error(artist + " throws the following error: " + error);
		        	console.log(url);
		        }

		        var outlink = "https://www.last.fm/user/" + user + "/library/music/" + artist;
		        var insert = document.createElement("div");
		        var stuff = "<a target='_blank' style='color:red; text-decoration-line: underline;' href='" + outlink + "'>" + user + "'s artist scrobbles: " + scrobbles + " " + score + "</a>";
		        insert.innerHTML = stuff;
		        artists[index].insertAdjacentElement("afterend", insert);
	    } else {
	        console.log("api error for " + artist);
        	console.log(url);
	    }
	}
	request.send();
}

console.log("\n\n\n\n\n\n\n\n\n\nsome data may be wrong due to e.g. special characters or naming differences between rym & lastfm");

for (i = 0; i < artists.length; i++) {
	// if there are cases where main does work better than sub, i can try both & keep the defined/>0... but thats work
	// perhaps see if such cases advertise themselves as existing before you write it?
	// all failures right now have been confirmed Not My Problem
	// loona's spelling (krn doesn't work either), neko saito's not being a primary artist
	var noodle = artists[i];
	var wheat = artists[i].innerText;
	var chaff;
	if (noodle.children.length > 0) {
		chaff = noodle.children[0].innerText;
		wheat = chaff.substring(1, chaff.length - 1);
	}
	call(username, wheat, i);
}