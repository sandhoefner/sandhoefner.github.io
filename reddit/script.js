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

	console.log(pages);
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
	console.log("starting to parse");
	Papa.parse("words.csv", {
		complete: function(results) {
			console.log("Finished:", results.data);
		}
	});
}