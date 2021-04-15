var matches = document.getElementsByClassName("csgo_scoreboard_inner_right");
var gleckties = 0;
var gleckwins = 0;
var glecklosses = 0;
var wonrounds = 0;
var lostrounds = 0;
var kills = {"Belschnickel": 0, "Mare Branza": 0, "Johnny Boy": 0, "SilentGuh": 0, "Bacon Magic": 0};
var killarray = {"Belschnickel": [], "Mare Branza": [], "Johnny Boy": [], "SilentGuh": [], "Bacon Magic": []};
var gleck = ["Belschnickel", "Mare Branza", "Johnny Boy", "SilentGuh", "Bacon Magic"];
gleck.sort();

// https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (var i = 0; i < a.length; ++i) {
		  if (a[i] !== b[i]) return false;
	}
	return true;
}

console.log('gleck\tenemy');

// toggle these for search depth - only recent matches. should be done better, programmatic & gleck-specific
// for (i = 0; i < 50; i++) {
for (i = 0; i < matches.length; i++) {
	// console.log("");
	// console.log('match ' + i);

	var flipper = [1, 0];
	var firstteam = [];
	var secondteam = [];

	for (j = 1; j < 6; j++) {
		firstteam.push(matches[i].rows[j].children[0].firstElementChild.nextSibling.nextElementSibling.innerText);
	}
	// console.log('first team: ');
	// console.log(firstteam);
	firstteam.sort();

	for (j = 7; j < 12; j++) {
		secondteam.push(matches[i].rows[j].children[0].firstElementChild.nextSibling.nextElementSibling.innerText);
	}
	// console.log('second team: ');
	// console.log(secondteam);
	secondteam.sort();

	var score = matches[i].rows[6].innerText;
	// console.log('score: ' + score);



	score = score.split(" : ");

	if (arraysEqual(firstteam, gleck)) {
		// console.log('first team is gleck');
		checkwin(0, score);
		checkkills(0, matches[i]);
	} else if (arraysEqual(secondteam, gleck)) {
		// console.log('second team is gleck');
		checkwin(1, score);
		checkkills(1, matches[i]);
	} else {
		// console.log('neither team is gleck');
	}
}

function checkwin(k, score) {
	wonrounds += parseInt(score[k]);
	lostrounds += parseInt(score[flipper[k]]);
	console.log(score[k] + '\t' + score[flipper[k]]);
	console.log("");
	if (parseInt(score[k]) > parseInt(score[flipper[k]])) {
		// console.log('gleck win');
		gleckwins++;
	} else if (parseInt(score[k]) < parseInt(score[flipper[k]])) {
		// console.log('gleck loss');
		glecklosses++;
	} else {
		// console.log('gleck tie');
		gleckties++;
	}
}




function checkkills(l, match) {
	for (m = 1; m < 6; m++) {
		// much better way of indexing can be used above & in future
		var thisplayer = match.rows[m + l * 6].children[0].innerText;
		var thesekills = match.rows[m + l * 6].children[2].innerText;
		// console.log(thisplayer + ' got ' + thesekills + ' kills');
		kills[thisplayer] += parseInt(thesekills);
		killarray[thisplayer].push(parseInt(thesekills));
	}
}

console.log("");
console.log("summary:");
console.log('gleck WLT: ' + gleckwins + '-' + glecklosses + '-' + gleckties);
console.log('gleck WL rounds: ' + wonrounds + '-' + lostrounds);
console.log('kills:');
console.log(kills);
console.log(killarray);