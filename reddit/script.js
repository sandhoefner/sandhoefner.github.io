function auth() {
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

function submit() {
	var subreddit = $("#subreddit").val();
	var url = "https://www.reddit.com/r/" + subreddit + "/top/.json?limit=100?t=all";
	$.get(url, function(data, status){
		console.log("Data: ",data,"Status: ",status);
	});
}

// &after=t3_3zd9kd