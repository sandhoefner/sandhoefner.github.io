// Saves options to chrome.storage
function save_options() {
  var skins = document.getElementById('No skins').checked;
  var names = document.getElementById('No names').checked;
  var colors = document.getElementById('No colors').checked;
  var mass = document.getElementById('Show mass').checked;
  var theme = document.getElementById('Dark theme').checked;
  var stats = document.getElementById('Skip stats').checked;
  chrome.storage.sync.set({
    skins: skins,
names: names,
colors: colors,
mass: mass,
theme: theme,
stats: stats
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);