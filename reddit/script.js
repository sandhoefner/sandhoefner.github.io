/*

here's the vision:
put away your personal curiosities for now
the product is input subreddit, view wordcloud, download csv and go to quadrigram to play


*/


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

window.onload = function() {
	// console.log(words);
}

function processText(raw) {
	return raw.replace( /\n/g, " " ).replace( /\//g, " " ).toLowerCase().replace(/[^0-9a-z ]/gi, '').split(" ");
}

// should probably be median
// smart or not to weight by number of times a word is used? seems smart
// hm wait how does that interact with corpus length
// control for repetition and length or neither
function complexity(list, ref) {
	// var text = $("#sandbox").val().replace( /\n/g, " " ).toLowerCase().replace(/[^0-9a-z ]/gi, '');
	// var list = text.split(" ");
	if (!list) {
		var list = processText($("#sandbox").val());
		var ref = $("#textTitle").val() || 'work';
	}
	console.log(list);
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
	console.log("median complexity of " + (ref) + ":",median);
	// console.log("mean word rank of " + ($("#textTitle").val() || 'work') + ":",mean_rank);
	// console.log("median word rank of " + ($("#textTitle").val() || 'work') + ":",median_rank);
}






// surprisedisappoint - maybe slash should be word separator? risks?
// maybe filter buzzphrases like OC
// what is the vision for this product
// reading level analysis would probably be more viable for commetns