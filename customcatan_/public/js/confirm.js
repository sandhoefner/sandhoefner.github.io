/**
 *
 * confirm.js
 * 
 * Ryan Kerr and Evan Sandhoefner Final project
 * Settlers of Catan Board Generator
 *
 * Script that prompts user for confirmation
 * before navigating away from our website.
 *
 */

function check() {
	// open popup window for confirmation, then either navigate away or don't
	if (confirm("You're about to leave our site to go to settlersstrategy.com! Would you like to proceed?")) {
		return true;
    	} else {
        	event.preventDefault();
        	return false;
    	}
}
