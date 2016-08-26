// TODO:
// specify number of posts to grab
// pre-download top 10 subreddits to circumvent load time
// improve CSV quality
// improve viewport responsiveness

// THANKS TO:
// jason davies for word cloud
// tagcrowd for stop list

var pages = [];
var subreddit = 'worldnews';
var alreadyGot = false;
var underway = false;
var worldPages;

function submit() {
	if (underway) {
		return;
	}

	$("#subName").text("...");

	underway = true;
	progress = 0;
	subreddit = "";
	subreddit = $("#subreddit").val();

	$("#vis").html('<img src="spinner.gif" alt="Loading" style="width:50px;height:50px;">');
	$("#pct").html("Fetching data from " + subreddit + ": " + progress + "%");

	if (subreddit.substring(0, 3) == "/r/") {
		subreddit = subreddit.substring(3, subreddit.length);
	}

	var url = "https://www.reddit.com/r/" + subreddit + "/top/.json";
	$.get(url, {
		limit: '100',
		t: 'all'
	}, function(data) {

		data.data.children.forEach(function(post) {
			pages.push(post.data);
		});
		next(data.data.after, url);
	}).fail(function(e) {
		if (e.status == 404) {
			alert("Oops, there's nothing there! Please check that you've requested a valid subreddit.");
		} else {
			alert("Sorry, something went wrong! Please try again a little later, or try a different subreddit.");
		}
		$("#vis").html("Pick a subreddit to see its 250 favorite words!");
		$("#pct").html("");
		underway = false;
	});;
}

window.onkeyup = function(e) {
	if (e.keyCode == 13 /*enter*/ ) {
		submit();
	}
}

function next(after, url) {
	progress += 10;

	$("#pct").html("Fetching data from " + subreddit + ": " + progress + "%");

	if (!after) {
		ajaxDone();
	} else {
		$.get(url, {
			limit: '100',
			t: 'all',
			after: after
		}, function(data) {
			data.data.children.forEach(function(post) {
				pages.push(post.data);
			});
			next(data.data.after, url);
		});
	}
}

function ajaxDone() {
	underway = false;

	$("#pct").html("");

	var hugeText = "";

	pages.forEach(function(post) {
		hugeText += (post.title + " ");
	});

	processed = processText(hugeText);

	genCloud(processed, subreddit);

	$("#subName").text(subreddit);
}

function convertArrayOfObjectsToCSV(args) {
	var result, ctr, keys, columnDelimiter, lineDelimiter, data;

	data = args.data || null;
	if (data == null || !data.length) {
		return null;
	}

	columnDelimiter = args.columnDelimiter || '\t';
	lineDelimiter = args.lineDelimiter || '\n';

	keys = Object.keys(data[0]);

	// console.log(keys);

	// keepKeys = ["domain","subreddit","link_flair_text","id","gilded","archived","author","score","over_18","num_comments","thumbnail","subreddit_id","edited","downs","post_hint","stickied","is_self","permalink","created","name","url","author_flair_text","title","ups"];

	// for (var i=keys.length-1; i>=0; i--) {
	// 	if (keepKeys.indexOf(keys[i]) < 0) {
	// 		keys.splice(i, 1);
	// 	}
	// }

	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	data.forEach(function(item) {
		ctr = 0;
		keys.forEach(function(key) {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}

function downloadCSV() {
	var data, filename, link;

	var csv = convertArrayOfObjectsToCSV({
		data: pages
	});

	if (csv == null) {
		csv = convertArrayOfObjectsToCSV({
			data: worldPages.data
		});
	}

	filename = (subreddit + ".csv") || 'export.csv';

	if (!csv.match(/^data:text\/csv/i)) {
		csv = 'data:text/csv;charset=utf-8,' + csv;
	}
	data = encodeURI(csv);

	link = document.createElement('a');
	link.setAttribute('href', data);
	link.setAttribute('download', filename);
	link.click();
}

function processText(raw) {
	// inconsistency: this here below removes all numerals but worldnews hard copy has a few numerals
	return raw.replace(/\n/g, " ").replace(/\//g, " ").toLowerCase() /*.replace(/[^0-9a-z ]/gi, '')*/ .replace(/[^a-z ]/gi, '').split(" ");
}

function genCloud(list, ref) {
	// empty container div
	$("#vis").html("");

	// remove common words, format, sort, slice, build cloud
	var tags = {};

	function isUncommon(value) {
		return (commonWords.indexOf(value) < 0);
	}

	list = list.filter(isUncommon);

	list.forEach(function(word) {
		if (tags[word]) {
			tags[word] += 1;
		} else {
			tags[word] = 1;
		}
	});

	formatted = [];

	for (var key in tags) {
		if (tags.hasOwnProperty(key)) {
			var newObj = {};
			newObj.value = tags[key];
			newObj.key = key;
			formatted.push(newObj);
		}
	}

	function compare(a, b) {
		if (a.value < b.value) {
			return 1;
		} else if (a.value > b.value) {
			return -1;
		} else {
			return 0;
		}
	}

	formatted.sort(compare);

	var sliced = formatted.slice(0, 250);

	runCloud(sliced);
}

function reloadScrollBars() {
	document.documentElement.style.overflow = 'auto'; // firefox, chrome
	document.body.scroll = "yes"; // ie only
}

function unloadScrollBars() {
	document.documentElement.style.overflow = 'hidden'; // firefox, chrome
	document.body.scroll = "no"; // ie only
}

window.onload = function() {
	unloadScrollBars();

	Papa.parse("https://raw.githubusercontent.com/sandhoefner/sandhoefner.github.io/master/reddit/worldnews.csv", {
		download: true,
		complete: function(data) {
			worldPages = data;
		}
	});

	runCloud(worldNews);
}