// WikiCopy (Version 1.0.2)
// a Chrome extension for copying text from Wikipedia without bracketed notes
// by Evan Sandhoefner
// script.js

// TODO:
// toolbar icon
// run only on certain sites, perhaps user-configurable
// "persistent": false
// locales
// icon padding
// explore conventions and possibilities
  // https://developer.chrome.com/extensions/manifest
// Google analytics ID
// promotional tiles, screenshots
// assess level of technical detail to include in store description
  // what happens when you just select [1], what happens when you select [1, exact filter term list, potential of over-filtering (or, on other wikis, under-filtering), potential future updates, etc.

// icons:
// faviconist.com Ubuntu bold 0000ee [*]
// MS Paint for moving asterisk and resizing
// lunapic.com for transparency

// thanks to user joelpt at stackOverflow for copyTextToClipboard!
// http://tinyurl.com/3w9lmo3
function copyTextToClipboard(text) {
  var copyFrom = $('<textarea/>');
  copyFrom.text(text);
  $('body').append(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.remove();
}

// https://en.wikipedia.org/wiki/Wikipedia:Template_messages/Cleanup
// TODO: make the filter user-configurable
function killNotes(text) {
  return text.replace(/(?:\[\d+?\]|\[according to whom?\]|\[attribution needed\]|\[better source needed\]|\[broken citation\]|\[by whom?\]|\[chronology citation needed\]|\[citation needed\]|\[clarification needed\]|\[copyright violation?\]|\[dated info\]|\[dead link\]|\[disambiguation needed\]|\[dubious – discuss\]|\[examples needed\]|\[full citation needed\]|\[further explanation needed\]|\[how?\]|\[improper synthesis?\]|\[medical citation needed\]|\[need quotation to verify\]|\[non-primary source needed\]|\[not in citation given\]|\[not specific enough to verify\]|\[not verified in body\]|\[original research?\]|\[page needed\]|\[quantify\]|\[season & episode needed\]|\[self-published source?\]|\[specify\]|\[third-party source needed\]|\[this quote needs a citation\]|\[unreliable medical source?\]|\[unreliable medical source?\]|\[unreliable source?\]|\[vague\]|\[verification needed\]|\[volume & issue needed\]|\[when?\]|\[where?\]|\[which?\]|\[who said this?\]|\[who?\]|\[why?\]|\[year missing\]|\[year needed\])/ig,"");
} 

function OnClick(info, tab) {
  copyTextToClipboard(killNotes(info.selectionText));
}

var id = chrome.contextMenus.create({
  "title": "Copy without notes", "contexts": ["selection"], "onclick": OnClick
});

// thanks to user ExpertSystem at stackOverflow for
// funcToInject, jsCodeStr, and the command listener!
// http://tinyurl.com/q4cznjb

// the function that finds and returns the selected text
var funcToInject = function() {
  var selection = window.getSelection();
  return (selection.rangeCount > 0) ? selection.toString() : '';
};

// this line converts the above function to string
// (and makes sure it will be called instantly)
var jsCodeStr = ';(' + funcToInject + ')();';

/*
chrome.commands.onCommand.addListener(function(cmd) {
  if (cmd === 'copy') {
    // inject the code into all frames of the active tab,
    // as the selection might be in an iframe, not the main page
    chrome.tabs.executeScript({code: jsCodeStr, allFrames: true},
      function(selectedTextPerFrame) {
        if (chrome.runtime.lastError) {
          // report any error
          alert('ERROR:\n' + chrome.runtime.lastError.message);
        } else if (selectedTextPerFrame.length > 0
                   && typeof(selectedTextPerFrame[0]) === 'string') {
          // the results are as expected
          copyTextToClipboard(killNotes(selectedTextPerFrame[0]));
        }
      }
    );
  }
});
*/