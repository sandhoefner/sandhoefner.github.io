// TODO:
// var
// only show browser action on proper URLs
// ability for user to directly manipulate metadata
// comments
// very not error-proof for unusual use cases like filling but not posting
// jquery won't work if you turn on/reload extension after loading page

$(document).ready(function() {
    // determine whether we're on ask or answer page
    pageTitle = document.getElementsByClassName("page-title")[0].innerText;
    if (pageTitle == "Ask a question") {
        // code for ask page
        // get spreadsheet from google drive
        Papa.parse("http://docs.google.com/spreadsheets/u/0/d/1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0/export?format=csv&id=1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0&gid=1313316691", {
            download: true,
            complete: function(data) {
                // get metadata from chrome extension storage
                chrome.storage.sync.get('meta', function(result) {
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
                    
                    // define constants
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

                    id_col = 0;
                    title_col = 1;
                    desc_col = 2;
                    cat_col = 3;
                    tag_col = 4;
                    ans_col = 5;

                    // extract useful content from spreadsheet
                    title_val = data.data[row][title_col];
                    category_raw = data.data[row][cat_col];
                    tag_raw = data.data[row][tag_col];
                    desc_val = data.data[row][desc_col];

                    // clean raw content from spreadsheet
                    category_val = options[category_raw];
                    if (valid_options.indexOf(category_val) == -1) {
                        alert('Q&A Helper: "' + category_raw + '" is not a valid category. Kept default.');
                        category_val = 33;
                    }

                    tags = tag_raw.split(',');

                    // get form elements
                    title = $("#title");

                    category = $("#category");
                    
                    tagHolder = $("#ap-tags-holder");

                    ifrm = document.getElementById('description_ifr');
                    ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
            
                    // fill form
                    ifrm.document.open();
                    ifrm.document.write(desc_val);
                    ifrm.document.close();

                    toAdd = "";
                    tags.forEach(function(tag) {
                        toAdd += "<input type='hidden' name='tags[]' value='" + tag + "'><p>" + tag + "</p>";
                    });
                    tagHolder[0].innerHTML += toAdd;

                    title.val(title_val);

                    category.val(category_val);

                    // spreadsheet content error checks
                    if (title_val.length < 10) {
                        alert("Q&A Helper: title must be at least 10 characters.");
                    }
                    if (desc_val.length < 10) {
                        alert("Q&A Helper: description must be at least 10 characters.");
                    }
                });
            }
        });
    } else {
        // code for answer page
        // get spreadsheet from google drive
        Papa.parse("http://docs.google.com/spreadsheets/u/0/d/1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0/export?format=csv&id=1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0&gid=1313316691", {
            download: true,
            complete: function(data) {
                // get metadata from chrome extension storage, then increment row and save
                chrome.storage.sync.get('meta', function(result) {
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

                    // define constants
                    id_col = 0;
                    ans_col = 5;
                    date = Date.now();

                    // extract useful content from spreadsheet
                    post_id = data.data[row][id_col];
                    answer_val = data.data[row][ans_col];

                    // update post history metadata
                    chrome.storage.sync.get('posted', function(result) {
                        if (!(result.posted)) {
                            toLoad = {};
                            toLoad[post_id] = date;
                            chrome.storage.sync.set({
                                'posted': toLoad
                            }, function() {
                                console.log("saved metadata", toLoad);
                            });
                        } else {
                            result.posted[post_id] = date;
                            chrome.storage.sync.set({
                                'posted': result.posted
                            }, function() {
                                console.log("saved metadata", result.posted);
                            });
                        }
                    });

                    // spreadsheet content error check
                    if (answer_val.length < 5) {
                        alert("Q&A Helper: answer must be at least 5 characters.");
                    }

                    // get form element
                    ifrm = document.getElementById('description_ifr');
                    ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;

                    // fill form
                    ifrm.document.open();
                    ifrm.document.write(answer_val);
                    ifrm.document.close();
                });
            }
        });
    }
});