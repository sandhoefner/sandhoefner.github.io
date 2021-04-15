/*

https://steamcommunity.com/profiles/76561198080952390/gcpd/730?tab=matchhistorycompetitive

*/

function scrolldown() {
	window.scrollTo(0, document.body.scrollHeight);
}

waittime = 2000;

function loadmore() {
	scrolldown();
	if (document.getElementById("load_more_button").style.display != "none") {
		document.getElementById("load_more_button").click();
		setTimeout(loadmore, waittime);
	} else {
			setTimeout(scrolldown, waittime);
			// not sure about this
			setTimeout(scrolldown, waittime+100);
			scrolldown();
			stats();
	}
}

loadmore();

function stats() {
	summaries = document.getElementsByClassName("csgo_scoreboard_inner_left");
	total = summaries.length;
	maps = [];

	for (i = 0; i < total; i++) {
		maps.push(summaries[i].rows[0].innerText);
	}

	unique = Array.from(new Set(maps));

	console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nTotal:\t\t\t\t\t" + total + " = 100%");

	for (i = 0; i < unique.length; i++) {
		count = maps.filter(x => x == unique[i]).length;
		percent = Math.round(100 * count / total);
		if (unique[i].length <= 14) {
			tabs = "\t\t\t";
		} else if (unique[i].length <= 18) {
			tabs = "\t\t";
		} else {
			tabs = "\t";
		}
		console.log(unique[i] + ":" + tabs + count + "\t= " + percent + "%");
	}

	console.log("\nyou can enter 'loadmore()' if it didn't finish\n\n")
}