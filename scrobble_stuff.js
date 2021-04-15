



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



              https://en.wikipedia.org/wiki/List_of_composers_by_name
              VERSUS https://en.wikipedia.org/wiki/Lists_of_composers
              https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=max%20richter