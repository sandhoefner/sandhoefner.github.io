// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

console.log("page.js");

window.onkeyup = function(e) {
    if (e.keyCode == 32) {
      console.log("spacebar!");
    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
      console.log(e.keycode - 48);
    } else if (e.keyCode == 13) {
      console.log('enter!');
    }
}

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    console.log(msg);
    port.postMessage({counter: msg.counter+1});
  });
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse({counter: request.counter+1});
  });
