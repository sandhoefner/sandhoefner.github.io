// AgroMod (Version 1.1.2)
// a Chrome extension for the MMO game Agar.io
// by Evan Sandhoefner
// options.js

// Saves options to chrome.storage
function save_options() {
    var skins = document.getElementById('No skins').checked;
    var names = document.getElementById('No names').checked;
    var colors = document.getElementById('No colors').checked;
    var mass = document.getElementById('Show mass').checked;
    var theme = document.getElementById('Dark theme').checked;
    var stats = document.getElementById('Skip stats').checked;

    var nick = document.getElementById('nick').value;
    // var region = document.getElementById('region').value;
    // var mode = document.getElementById('gamemode').value;
    chrome.storage.sync.set({
        skins: skins,
        names: names,
        colors: colors,
        mass: mass,
        theme: theme,
        stats: stats,
        nick: nick,
        // region: region,
        // mode: mode
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.innerHTML = 'Options saved.';
        setTimeout(function() {
            status.innerHTML = '<br>';
        }, 1024);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default values
    chrome.storage.sync.get({
        skins: false,
        names: false,
        colors: false,
        mass: true,
        theme: false,
        stats: false,

        // region: "Auto",
        nick: "",
        // mode: "FFA"
    }, function(items) {
        document.getElementById('No skins').checked = items.skins;
        document.getElementById('No names').checked = items.names;
        document.getElementById('No colors').checked = items.colors;
        document.getElementById('Show mass').checked = items.mass;
        document.getElementById('Dark theme').checked = items.dark;
        document.getElementById('Skip stats').checked = items.stats;

        document.getElementById('nick').value = items.nick;
        // document.getElementById('region').value = items.region;
        // document.getElementById('gamemode').value = items.mode;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);