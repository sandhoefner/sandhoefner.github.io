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

var pages = [];

function submit() {
	var subreddit = $("#subreddit").val();
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
	console.log(pages);
}