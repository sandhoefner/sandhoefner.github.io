



              links  = document.querySelectorAll("a");
              titles = [];
              validate = [];
              for (i=0; i<links.length; i++) {
              	title = links[i].href.split(".org/wiki/")[1];
              	titles.push(title);
              	if (title == undefined) {
              		console.log(links[i].href);
              	}
              }
              console.log(titles);
              pray = new Set(validate);
              console.log(pray);


/*
              https://en.wikipedia.org/wiki/List_of_composers_by_name
              VERSUS https://en.wikipedia.org/wiki/Lists_of_composers
              https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=max%20richter
              VERSUS https://en.wikipedia.org/w/api.php?action=query&format=json&titles=Max_Richter&prop=revisions
*/
              function call(title) {
		var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + title;
		// https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function () {
		    // Begin accessing JSON data here
		    var data = JSON.parse(this.response);
		    if (request.status >= 200 && request.status < 400) {
			console.log(data);
		    } else {
		        console.log('api error');
		    }
		}
		request.send();
	}