// Agar.io Merge Timer (Version 1.0.0)
// a Chrome extension for the MMO game Agar.io
// by Evan Sandhoefner
// script.js

// var id = chrome.contextMenus.create({
//   "title": "Copy without notes", "contexts": ["selection"], "onclick": OnClick
// });

console.log("hey");

window.onkeyup = function(e) {
    if (e.keyCode == 32) {
      console.log("spacebar!");
    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
      console.log(e.keycode - 48);
    } else if (e.keyCode == 13) {
      console.log('enter!');
    }
}