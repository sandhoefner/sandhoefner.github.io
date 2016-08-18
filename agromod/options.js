// Saves options to chrome.storage
function save_options() {
    var formStuff = {'skins' : document.getElementById('No skins').checked,
    'names' : document.getElementById('No names').checked,
    'colors' : document.getElementById('No colors').checked,
    'mass' : document.getElementById('Show mass').checked,
    'theme' : document.getElementById('Dark theme').checked,
    'stats' : document.getElementById('Skip stats').checked,
    'nick' : document.getElementById('nick').value};

    console.log("seeing form info:", formStuff);
    // var region = document.getElementById('region').value;
    // var mode = document.getElementById('gamemode').value;
    chrome.storage.sync.set(formStuff, function() {

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
        document.getElementById('Dark theme').checked = items.theme;
        document.getElementById('Skip stats').checked = items.stats;

        document.getElementById('nick').value = items.nick;
        // document.getElementById('region').value = items.region;
        // document.getElementById('gamemode').value = items.mode;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);