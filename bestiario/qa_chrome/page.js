// TODO (optional):
// maybe should require key command to trigger so you don't have to turn off extension for normal use
// tags
// description distinct from title
// var
window.onload = function() {
    pageTitle = document.getElementsByClassName("page-title")[0].innerText;
    if (pageTitle == "Ask a question") {
        // get data
        Papa.parse("http://docs.google.com/spreadsheets/u/0/d/1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0/export?format=csv&id=1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0&gid=1313316691", {
            download: true,
            complete: function(data) {
                chrome.storage.sync.get('meta', function(result) {
                    console.log(result);
                    if (!(result.meta)) {
                        alert("no metadata found; starting at row 1");
                        row = 1;
                        chrome.storage.sync.set({
                            'meta': 1
                        }, function() {
                            console.log("saved metadata row 1");
                        });
                    } else {
                        console.log("metadata found; row " + result.meta + ". Metadata will update after you post.");
                        row = result.meta;
                    }
                    // get meta parameters from storage


                    // extract content

                    options = {
                        "Data Management": 33,
                        "Charts": 34,
                        "Colors": 35,
                        "Maps": 36,
                        "Publishing": 37,
                        "Controls": 38,
                        "Networks": 39,
                        "Interaction": 40,
                        "Outputs": 41,
                        "Formulas": 42
                    };
                    valid_options = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
                    title_val = data.data[row][1]
                    category_raw = data.data[row][4]

                    category_val = options[category_raw];
                    if (valid_options.indexOf(category_val) == -1) {
                        alert('Q&A Helper: "' + category_raw + '" is not a valid category. Kept default.');
                        category_val = 33;
                    }

                    // get form elements
                    title = $("#title");
                    category = $("#category");

                    // fill form
                    ifrm = document.getElementById('description_ifr');
                    ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
                    ifrm.document.open();
                    ifrm.document.write(title_val);
                    ifrm.document.close();

                    title.val(title_val);

                    category.val(category_val);

                    // error checks
                    if (title_val.length < 10) {
                        alert("Q&A Helper: question must be at least 10 characters.");
                    }

                    // save some metadata for next time
                });
            }

        });

    } else {
        // get data
        Papa.parse("http://docs.google.com/spreadsheets/u/0/d/1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0/export?format=csv&id=1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0&gid=1313316691", {
            download: true,
            complete: function(data) {
                console.log(data);
                chrome.storage.sync.get('meta', function(result) {
                    console.log(result);
                    if (!(result.meta)) {
                        alert("error: no metadata found!");
                        row = NaN;

                    } else {
                        console.log("metadata found; row " + result.meta + ". Metadata updates now, so be sure to post!");
                        row = result.meta;
                        chrome.storage.sync.set({
                            'meta': result.meta + 1
                        }, function() {
                            console.log("saved metadata row " + (result.meta + 1));
                        });
                    }

                    // read meta parameters from storage


                    // extract content
                    answer_val = data.data[row][2];

                    if (answer_val.length < 5) {
                        alert("Q&A Helper: answer must be at least 5 characters.");
                    }

                    ifrm = document.getElementById('description_ifr');
                    ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
                    ifrm.document.open();
                    ifrm.document.write(answer_val);
                    ifrm.document.close();

                });
            }
        });

        // maybe save some metadata for next time
    }
}