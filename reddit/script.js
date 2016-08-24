/*

here's the vision:
put away your personal curiosities for now
the product is input subreddit, view wordcloud, download csv and go to quadrigram to play


*/




// thanks to jason davies for word cloud and tagcrowd for stop list, among others probably


function auth() {
	// oh I don't need to authorize right now
	// I just needed to send get arguments with jquery rather than in url
	// but I'll keep this code in case
	//
	// do something(?) with this for security and stuff
	var state = Math.random().toString(36).substring(7);
	console.log(state);
	var redir = "http://sandhoefner.github.io/reddit/";
	var dur = "temporary";
	var id = "ia-iJ1_SO36ooA";
	var scope = "read";
	window.open('https://www.reddit.com/api/v1/authorize?client_id='+id+'&response_type=code&' +
				'state='+state+'&redirect_uri='+redir+'&duration='+dur+'&scope='+scope);
}

// $("#csv").hide();

var pages = [];

var alreadyGot = false;

//  pressing this button multiple tiems needs to be handled differently
function submit() {
	// pages = [];


		// $("#getData").hide();
		subreddit = $("#subreddit").val();
		var url = "https://www.reddit.com/r/" + subreddit + "/top/.json";
		$.get(url, { limit: '100', t: 'all' }, function(data) {
			data.data.children.forEach(function(post) {
				pages.push(post.data);
			});
			next(data.data.after, url);
		});

}

function next(after, url) {
	if (!after) {
		ajaxDone();
	} else {
		$.get(url, { limit: '100', t: 'all', after: after }, function(data) {
			data.data.children.forEach(function(post) {
				pages.push(post.data);
			});
			next(data.data.after, url);
		});
	}
}

function ajaxDone() {
	console.log("no more posts");
	$("#csv").css({"display": "block"});

	// console.log(pages);
	var hugeText = "";
	pages.forEach(function(post) {
		hugeText += (post.title + " ");
	});
	// console.log(hugeText);
	processed = processText(hugeText);
	// console.log(processed);
	complexity(processed, subreddit);
}

function convertArrayOfObjectsToCSV(args) {
	var result, ctr, keys, columnDelimiter, lineDelimiter, data;

	data = args.data || null;
	if (data == null || !data.length) {
		return null;
	}

	columnDelimiter = args.columnDelimiter || ',';
	lineDelimiter = args.lineDelimiter || '\n';

	keys = Object.keys(data[0]);

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
	if (csv == null) return;

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
	return raw.replace( /\n/g, " " ).replace( /\//g, " " ).toLowerCase().replace(/[^0-9a-z ]/gi, '').split(" ");
}

// should probably be median
// smart or not to weight by number of times a word is used? seems smart
// hm wait how does that interact with corpus length
// control for repetition and length or neither
function complexity(list, ref) {
	$("#vis").html("");
	// var text = $("#sandbox").val().replace( /\n/g, " " ).toLowerCase().replace(/[^0-9a-z ]/gi, '');
	// var list = text.split(" ");
	if (!list) {
		var list = processText($("#sandbox").val());
		var ref = $("#textTitle").val() || 'work';
	}
	// console.log(list);
	// sleekList = jQuery.unique( list );
	var tags = {};

	// console.log(list);

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

// console.log(tags);

// var obj = tags;

formatted = [];

for (var key in tags) {
  if (tags.hasOwnProperty(key)) {
	// console.log(key + " -> " + tags[key]);
	var newObj = {};
	newObj.value = tags[key];
	newObj.key = key;
	formatted.push(newObj);
  }
}

// console.log(formatted);

function compare(a,b) {
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
console.log(sliced);
// console.log(sliced);

	runCloud(sliced);




	// list.forEach(function(word) {
	// 	var found = false;
	// 	tags.forEach(function(obj) {
	// 		if (obj.key == word) {
	// 			obj.value += 1;
	// 			var found = true;
	// 			return;
	// 		}
	// 	});
	// 	if (!found) {
	// 		var newObj = {};
	// 		newObj.key = word;
	// 		newObj.value = 1;
	// 		tags.push(newObj);
	// 	}
	// });


// function compare(a,b) {
//   if (a.value < b.value) {
// 	return 1;
//   } else if (a.value > b.value) {
// 	return -1;
// } else {
//   return 0;
// }
// }
// console.log(tags);

// tags.sort(compare);

// console.log(tags);

// var sliced = tags.slice(0, 250);
// console.log(sliced);

	// runCloud(sliced);

	var numerator = 0;

	var denominator = 0;
	var rank_numerator = 0;
	var uniqueRarities = [];
	var spentRarities = [];
	var rarities = [];
	var ranks = [];
	list.forEach(function(word) {
		var context = words[word];
		if (context) {
			numerator += context[0];
			rank_numerator += context[1];
			rarities.push(context[0]);
			ranks.push(context[1]);
			denominator ++;

			// if (word not in spentrarities
			// 	uniqueRarities.push
			// 	spentRarities.push
		}
	});
	rarities.sort();
	ranks.sort();
	var score = denominator/numerator;
	var mean_rank = rank_numerator/denominator;
	var median = rarities[Math.floor(rarities.length/2)];
	var median_rank = ranks[Math.floor(ranks.length/2)];
	// console.log("mean complexity of " + ($("#textTitle").val() || 'work') + ":",score);
	// console.log("median complexity of " + (ref) + ":",median);
	// console.log("mean word rank of " + ($("#textTitle").val() || 'work') + ":",mean_rank);
	// console.log("median word rank of " + ($("#textTitle").val() || 'work') + ":",median_rank);
}






// surprisedisappoint - maybe slash should be word separator? risks?
// maybe filter buzzphrases like OC
// what is the vision for this product
// reading level analysis would probably be more viable for commetns


window.onload = function() {
	// console.log(words);
	// var tags = [{"key": "dollarBitches", "value": 26}, {"key": "fish", "value": 19}, {"key": "things", "value": 18}, {"key": "look", "value": 16}, {"key": "two", "value": 15}, {"key": "like", "value": 14}, {"key": "hat", "value": 14}, {"key": "Oh", "value": 13}, {"key": "mother", "value": 12}, {"key": "One", "value": 12}, {"key": "Now", "value": 12}, {"key": "Thing", "value": 12}, {"key": "house", "value": 10}, {"key": "fun", "value": 9}, {"key": "know", "value": 9}, {"key": "good", "value": 9}, {"key": "saw", "value": 9}, {"key": "bump", "value": 8}, {"key": "hold", "value": 7}, {"key": "fear", "value": 6}, {"key": "game", "value": 6}, {"key": "play", "value": 6}, {"key": "Sally", "value": 6}, {"key": "wet", "value": 6}, {"key": "little", "value": 6}, {"key": "box", "value": 6}, {"key": "came", "value": 6}, {"key": "away", "value": 6}, {"key": "sit", "value": 5}, {"key": "ran", "value": 5}, {"key": "big", "value": 5}, {"key": "something", "value": 5}, {"key": "put", "value": 5}, {"key": "fast", "value": 5}, {"key": "go", "value": 5}, {"key": "ball", "value": 5}, {"key": "pot", "value": 5}, {"key": "show", "value": 4}, {"key": "cup", "value": 4}, {"key": "get", "value": 4}, {"key": "cake", "value": 4}, {"key": "pick", "value": 4}, {"key": "went", "value": 4}, {"key": "toy", "value": 4}, {"key": "ship", "value": 4}, {"key": "net", "value": 4}, {"key": "tell", "value": 4}, {"key": "fan", "value": 4}, {"key": "wish", "value": 4}, {"key": "day", "value": 4}, {"key": "new", "value": 4}, {"key": "tricks", "value": 4}, {"key": "way", "value": 4}, {"key": "sat", "value": 4}, {"key": "books", "value": 3}, {"key": "hook", "value": 3}, {"key": "mess", "value": 3}, {"key": "kites", "value": 3}, {"key": "rake", "value": 3}, {"key": "red", "value": 3}, {"key": "shame", "value": 3}, {"key": "bit", "value": 3}, {"key": "hands", "value": 3}, {"key": "gown", "value": 3}, {"key": "call", "value": 3}, {"key": "cold", "value": 3}, {"key": "fall", "value": 3}, {"key": "milk", "value": 3}, {"key": "shook", "value": 3}, {"key": "tame", "value": 2}, {"key": "deep", "value": 2}, {"key": "Sank", "value": 2}, {"key": "head", "value": 2}, {"key": "back", "value": 2}, {"key": "fell", "value": 2}, {"key": "hop", "value": 2}, {"key": "shut", "value": 2}, {"key": "dish", "value": 2}, {"key": "trick", "value": 2}, {"key": "take", "value": 2}, {"key": "tip", "value": 2}, {"key": "top", "value": 2}, {"key": "see", "value": 2}, {"key": "let", "value": 2}, {"key": "shake", "value": 2}, {"key": "bad", "value": 2}, {"key": "another", "value": 2}, {"key": "come", "value": 2}, {"key": "fly", "value": 2}, {"key": "want", "value": 2}, {"key": "hall", "value": 2}, {"key": "wall", "value": 2}, {"key": "Thump", "value": 2}, {"key": "Make", "value": 2}, {"key": "lot", "value": 2}, {"key": "hear", "value": 2}, {"key": "find", "value": 2}, {"key": "lots", "value": 2}, {"key": "bet", "value": 2}, {"key": "dear", "value": 2}, {"key": "looked", "value": 2}, {"key": "gone", "value": 2}, {"key": "sun", "value": 2}, {"key": "asked", "value": 1}, {"key": "shine", "value": 1}, {"key": "mind", "value": 1}, {"key": "bite", "value": 1}, {"key": "step", "value": 1}, {"key": "mat", "value": 1}, {"key": "gave", "value": 1}, {"key": "pat", "value": 1}, {"key": "bent", "value": 1}, {"key": "funny", "value": 1}, {"key": "give", "value": 1}, {"key": "games", "value": 1}, {"key": "high", "value": 1}, {"key": "hit", "value": 1}, {"key": "run", "value": 1}, {"key": "stand", "value": 1}, {"key": "fox", "value": 1}, {"key": "man", "value": 1}, {"key": "string", "value": 1}, {"key": "kit", "value": 1}, {"key": "Mothers", "value": 1}, {"key": "tail", "value": 1}, {"key": "dots", "value": 1}, {"key": "pink", "value": 1}, {"key": "white", "value": 1}, {"key": "kite", "value": 1}, {"key": "bed", "value": 1}, {"key": "bumps", "value": 1}, {"key": "jumps", "value": 1}, {"key": "kicks", "value": 1}, {"key": "hops", "value": 1}, {"key": "thumps", "value": 1}, {"key": "kinds", "value": 1}, {"key": "book", "value": 1}, {"key": "home", "value": 1}, {"key": "wood", "value": 1}, {"key": "hand", "value": 1}, {"key": "near", "value": 1}, {"key": "Think", "value": 1}, {"key": "rid", "value": 1}, {"key": "made", "value": 1}, {"key": "jump", "value": 1}, {"key": "yet", "value": 1}, {"key": "PLOP", "value": 1}, {"key": "last", "value": 1}, {"key": "stop", "value": 1}, {"key": "pack", "value": 1}, {"key": "nothing", "value": 1}, {"key": "got", "value": 1}, {"key": "sad", "value": 1}, {"key": "kind", "value": 1}, {"key": "fishHe", "value": 1}, {"key": "sunny", "value": 1}, {"key": "Yes", "value": 1}, {"key": "bow", "value": 1}, {"key": "tall", "value": 1}, {"key": "always", "value": 1}, {"key": "playthings", "value": 1}, {"key": "picked", "value": 1}, {"key": "strings", "value": 1}, {"key": "Well", "value": 1}, {"key": "lit", "value": 1}];

	runCloud(worldNews);
}
