/**
 *
 * printable.js
 * 
 * Ryan Kerr and Evan Sandhoefner Final project
 * Settlers of Catan Board Generator
 *
 * Script that moves the current board image
 * to an otherwise blank popup window for printing.
 *
 */

function printable() {

	// open a popup window
	var printWindow = window.open("", "Printable Version", "width=700, height=400");

	// save existing canvases as variables
	var canvas1 = document.getElementById("myCanvas");
	var canvas2 = document.getElementById("myCanvas2");

	// isolate data URLs of existing canvases
	var source1 = canvas1.toDataURL("image/png");
	var source2 = canvas2.toDataURL("image/png");
	
	// open div and print tile layer
	printWindow.document.write('<div style="position: relative;"><img src="');
	printWindow.document.write(source1);
	printWindow.document.write('" style="position: absolute; z-index: 1; top:0; left:0;">');

	// print number layer and close div
	printWindow.document.write('<img src="');
	printWindow.document.write(source2);
	printWindow.document.write('"style="position: absolute; z-index: 2; top:0; left:0;"></div>');

}
