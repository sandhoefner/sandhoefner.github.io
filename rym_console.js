https://rateyourmusic.com/customchart

artists_raw = document.getElementsByClassName("artist");
artists = [];
for (i = 0; i < artists_raw.length; i++) {
	artists.push(artists_raw[i].innerText);
}
console.log(artists);