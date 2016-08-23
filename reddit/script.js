function submit() {
	var subreddit = $("#subreddit").val();
	var state = Math.random().toString(36).substring(7);
	console.log(state);
	var url = "https://www.reddit.com/r/" + subreddit + "/top/.json?limit=100?t=all";
	window.open('https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=code&' +
				'state='+state+'&redirect_uri=URI&duration=DURATION&scope=SCOPE_STRING');
	$.get(url, function(data, status){
		console.log("Data: ",data,"Status: ",status);
	});
}

// &after=t3_3zd9kd