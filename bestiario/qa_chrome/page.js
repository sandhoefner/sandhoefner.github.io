// TODO:
// tags
// description distinct from title
// var
// only show browser action on proper URLs
// ability for user to directly manipulate metadata
// comments
// very not error-proof for unusual use cases like filling but not posting

// priorities: manual row change, store ID posted on date, tags
$(document).ready(function() {
    pageTitle = document.getElementsByClassName("page-title")[0].innerText;
    if (pageTitle == "Ask a question") {
        // get data
        Papa.parse("http://docs.google.com/spreadsheets/u/0/d/1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0/export?format=csv&id=1lTFyYrBbcDGqZeKCq3rrPUA7-HiztH0vj0Fnsd8MyJ0&gid=1313316691", {
            download: true,
            complete: function(data) {
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
                    tags = $("#tags");
                    
                    
                    
                    
                    // !function(t){"use strict";function a(t){t=t.replace(/^\s+|\s+$/g,""),t=t.toLowerCase();return t=t.replace(/\s+/g,"-").replace(/-+/g,"-")}function e(e,s){if(e=e.replace(/,/g,""),e=e.trim(),e=a(e),e.length>0){var i={element:"li","class":"ap-tagssugg-item",itemValueClass:"ap-tag-item-value",button:{"class":"ap-tag-add",icon:"apicon-plus"},input:"",accessibilityText:apTagsTranslation.addTag};if(!s){var s="#ap-tags-holder";i.button["class"]="ap-tag-remove",i.button.icon="apicon-x",i.input='<input type="hidden" name="tags[]" value="'+e+'" />',i.accessibilityText=apTagsTranslation.deleteTag;var n=!1;if(t(s).find("."+i["class"]).find("."+i.itemValueClass).each(function(s,i){a(t(this).text())==e&&(n=t(this))}),n!==!1)return void n.animate({opacity:0},100,function(){n.animate({opacity:1},400)});t("#tags").is(":focus")||t("#tags").val("").focus(),t("#ap-tags-suggestion").hide(),setTimeout(function(){t("#ap-tags-aria-message").text(e+" "+apTagsTranslation.tagAdded)},250)}var o=t("<"+i.element+' class="'+i["class"]+'" title="'+i.accessibilityText+'"><button role="button" class="'+i.button["class"]+'"><span class="'+i.itemValueClass+'">'+e+'</span><i class="'+i.button.icon+'"></i></button>'+i.input+"</"+i.element+">");o.appendTo(s).fadeIn(300)}}function s(a){"undefined"!=typeof window.tagsquery&&window.tagsquery.abort(),window.tagsquery=jQuery.ajax({type:"POST",url:ajaxurl,data:{action:"ap_tags_suggestion",q:a},context:this,dataType:"json",success:function(a){AnsPress.site.hideLoading(this),console.log(a),t("#ap-tags-suggestion").html(""),a.status&&(t("#ap-tags-suggestion").is(":visible")||t("#ap-tags-suggestion").show(),a.items&&t.each(a.items,function(a,s){var i=[];t("#ap-tags-holder .ap-tag-item-value").each(function(){i.push(t(this).text())}),t.inArray(s,i)<0&&e(s,"#ap-tags-suggestion")}),setTimeout(function(){t("#ap-tags-aria-message").text(apTagsTranslation.suggestionsAvailable)},250))}})}t(document).ready(function(){t("#tags").on("apAddNewTag",function(a){a.preventDefault(),e(t(this).val().trim(",")),t(this).val("")}),t("#tags").on("keydown",function(a){if(13==a.keyCode)return a.preventDefault(),!1;if(38==a.keyCode||40==a.keyCode){var e=t("#ap-tags-suggestion").find(".ap-tag-add"),s=t("#ap-tags-suggestion").find(".focus"),i=e.index(s);-1!=i?(38==a.keyCode&&i--,40==a.keyCode&&i++):(38==a.keyCode&&(i=e.length-1),40==a.keyCode&&(i=0)),i>=e.length&&(i=-1),e.removeClass("focus"),-1!=i?(e.eq(i).addClass("focus"),t(this).val(e.eq(i).find(".ap-tag-item-value").text())):t(this).val(t(this).attr("data-original-value"))}}),t("#tags").on("keyup focus",function(a){a.preventDefault();var e=t(this).val().trim();clearTimeout(window.tagtime),9!=a.keyCode&&37!=a.keyCode&&38!=a.keyCode&&39!=a.keyCode&&40!=a.keyCode&&(13==a.keyCode||188==a.keyCode?(clearTimeout(window.tagtime),t(this).trigger("apAddNewTag")):(t(this).attr("data-original-value",t(this).val()),window.tagtime=setTimeout(function(){s(e)},200)))}),t("#ap-tags-suggestion").delegate(".ap-tagssugg-item","click",function(a){e(t(this).find(".ap-tag-item-value").text()),t(this).remove()}),t("body").on("click focusin",function(a){t("#ap-tags-suggestion").is(":visible")&&t(a.target).parents("#ap-tags-add").length<=0&&t("#ap-tags-suggestion").hide()}),t("body").delegate(".ap-tagssugg-item","click",function(a){var e=t(this).find(".ap-tag-item-value").text();setTimeout(function(){t("#ap-tags-aria-message").text(e+" "+apTagsTranslation.tagRemoved)},250),t(this).remove(),t("#ap-tags-list-title").focus()}),t("body").append('<div role="status" id="ap-tags-aria-message" aria-live="polite" aria-atomic="true" class="sr-only"></div>')})}(jQuery);
                    
                    
                    
                    
                    // fill form
                    ifrm = document.getElementById('description_ifr');
                    ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
                    ifrm.document.open();
                    ifrm.document.write(title_val);
                    ifrm.document.close();

                    title.val(title_val);

                    category.val(category_val);

                    // apAddTag("fish", null);

                    // send ENTER to tags

                    // e = jQuery.Event("keydown");
                    // e.which = 13; // Enter


                    // tags.trigger(e);

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


                    post_id = data.data[row][0];
                    date = Date.now();

                    chrome.storage.sync.get('posted', function(result) {
                        if (!(result.posted)) {
                            toLoad = {};
                            toLoad[post_id] = date;
                            chrome.storage.sync.set({
                                'posted': toLoad
                            }, function() {
                                // alert("saved metadata row " + input);
                            });
                        } else {
                            result.posted[post_id] = date;
                            // StorageArea.remove('posted');
                            chrome.storage.sync.set({
                                'posted': result.posted
                            }, function() {
                                // alert("saved metadata row " + input);
                            });
                        }
                    });


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
});