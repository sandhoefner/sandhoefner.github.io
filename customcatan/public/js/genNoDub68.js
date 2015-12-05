/**
 *
 * genNoDub68.js
 * 
 * Ryan Kerr and Evan Sandhoefner Final project
 * Settlers of Catan Board Generator
 *
 * Script that provides the algorithm for drawing a board
 * that has no 6s or 8s next to each other and no two of 
 * the same resource next to each other
 *
 */ 




// function to create hex object
function hexTile() {
    this.adjacent = [];
    this.resource = null;
    this.number = null;
    this.dots = 0;
}



// creating all new hexes
var hex1 = new hexTile();
var hex2 = new hexTile();
var hex3 = new hexTile();
var hex4 = new hexTile();
var hex5 = new hexTile();
var hex6 = new hexTile();
var hex7 = new hexTile();
var hex8 = new hexTile();
var hex9 = new hexTile();
var hex10 = new hexTile();
var hex11 = new hexTile();
var hex12 = new hexTile();
var hex13 = new hexTile();
var hex14 = new hexTile();
var hex15 = new hexTile();
var hex16 = new hexTile();
var hex17 = new hexTile();
var hex18 = new hexTile();
var hex19 = new hexTile();

  


// telling adjacent information
hex1.adjacent.push(hex2, hex3, hex5);
hex2.adjacent.push(hex1, hex4, hex5, hex7);
hex3.adjacent.push(hex1, hex5, hex6, hex8);
hex4.adjacent.push(hex2, hex7, hex9);
hex5.adjacent.push(hex1, hex2, hex3, hex7, hex8, hex10);
hex6.adjacent.push(hex3, hex8, hex11);
hex7.adjacent.push(hex2, hex4, hex5, hex9, hex10, hex12);
hex8.adjacent.push(hex3, hex5, hex6, hex10, hex11, hex13);
hex9.adjacent.push(hex4, hex7, hex12, hex14);
hex10.adjacent.push(hex5, hex7, hex8, hex12, hex13, hex15);
hex11.adjacent.push(hex6, hex8, hex13, hex16);
hex12.adjacent.push(hex7, hex9, hex10, hex14, hex15, hex17);
hex13.adjacent.push(hex8, hex10, hex11, hex15, hex16, hex18);
hex14.adjacent.push(hex9, hex12, hex17);
hex15.adjacent.push(hex10, hex12, hex13, hex17, hex18, hex19);
hex16.adjacent.push(hex11, hex13, hex18);
hex17.adjacent.push(hex12, hex14, hex15, hex19);
hex18.adjacent.push(hex13, hex15, hex16, hex19);
hex19.adjacent.push(hex15, hex17, hex18);




// creat globals for resources
var grainNumber = 0;
var woodNumber = 0;
var woolNumber = 0;
var oreNumber = 0;
var clayNumber = 0;
var desertNumber = 0;




// function to assign resource to hex
var addResource = function myself () {    
    // gets random number
    var n = Math.random() * 19;   
    
    // associates number with resource, checks if too many
    var type;    
    if (n >= 0 && n < 4) {
       if (grainNumber == 4) {
            return myself();
        }
        return 'grain';
    } else if (n >= 4 && n < 8) {
        if (woodNumber == 4) {
            return myself();
        }
        return 'wood';
    } else if (n >= 8 && n < 12) {
        if (woolNumber == 4) {
            return myself();
        }
        return 'wool';
    } else if (n >= 12 && n < 15) {
        if (oreNumber == 3) {
            return myself();
        }
        return 'ore';
    } else if (n >= 15 && n < 18) {
        if (clayNumber == 3) {
            return myself();
        }
        return 'clay';
    } else {
        if (desertNumber == 1) {
            return myself();
        }
        return 'desert';
    }
}




// create number array with extra 2 and 12
var numArray = [2, 12];




// function for generating random numbers
var addNumber = function itself(hex) {
    // check to see if desert
    if (hex.resource == 'desert') {
        return null;
    } else {
    
        // create random number
        var n = Math.ceil(Math.random() * 12);
        
        // check to see if 1 or 7
        if (n == 1 || n == 7) {
            return itself(hex);
        } else {
        
        // checks if too many of that number
        for (i = 0, j = numArray.length; i < j; i++) {
            if (numArray[i] == n) {
                for (k = i + 1; k < j; k++) {
                    if (numArray[k] == n) {
                        return itself(hex);
                    }
                }
            }
        }
        
        // not too many - return the random number
        return n;    
        }
    }  
}





// function for checking adjacent resources
var noDubResource = function thisGuy (hex, num) { 
    
    // get random resource
    var n = addResource();
    
    // see if adjacent hexes have same resource
    for (i = 0, j = hex.adjacent.length; i < j; i++) {
        if (n == hex.adjacent[i].resource) {
            // if failed num times, restarts assigning hexes
            if (num == 10) {
                hex1.resource = null;
                hex2.resource = null;
                hex3.resource = null;
                hex4.resource = null;
                hex5.resource = null;
                hex6.resource = null;
                hex7.resource = null;
                hex8.resource = null;
                hex9.resource = null;
                hex10.resource = null;
                hex11.resource = null;
                hex12.resource = null;
                hex13.resource = null;
                hex14.resource = null;
                hex15.resource = null;
                hex16.resource = null
                hex17.resource = null;
                hex18.resource = null;
                hex19.resource = null;
                
                grainNumber = 0;
                woodNumber = 0;
                woolNumber = 0;
                oreNumber = 0;
                clayNumber = 0;
                desertNumber = 0;
                
                return;
            } else {
                num++;
                return thisGuy(hex, num);
            }
        }
    } 
    hex.resource = n;
    
    // increase resource count
    if (n == 'grain') {
        grainNumber++;
    } else if (n == 'wood') {
        woodNumber++;
    } else if (n == 'wool') {
        woolNumber++;
    } else if (n == 'ore') {
        oreNumber++;
    } else if (n == 'clay') {
        clayNumber++;
    } else if (n == 'desert') {
        desertNumber++;
    }
    return;
}






// function for checking adjacent numbers
var noDubNumber = function thisGuy (hex, num) {    
    if (hex.resource != 'desert') {
        // get random number
        var n = addNumber(hex);
        
        // see if number is 6 or 8
        if (n == 6 || n == 8) {
        
            // see if adjacent hexes have 6 or 8
            for (i = 0, j = hex.adjacent.length; i < j; i++) {            
                
                if (hex.adjacent[i].number == 6 || hex.adjacent[i].number == 8) {
                    
                    // if failed num times, restarts assigning numbers
                    if (num == 10) {
                        hex1.number = null;
                        hex2.number = null;
                        hex3.number = null;
                        hex4.number = null;
                        hex5.number = null;
                        hex6.number = null;
                        hex7.number = null;
                        hex8.number = null;
                        hex9.number = null;
                        hex10.number = null;
                        hex11.number = null;
                        hex12.number = null;
                        hex13.number = null;
                        hex14.number = null;
                        hex15.number = null;
                        hex16.number = null
                        hex17.number = null;
                        hex18.number = null;
                        hex19.number = null;
                        
                        numArray = [2, 12];
                        
                        return;
                    } else {
                        num++;
                        return thisGuy(hex, num);
                    }
                }
            }
        }
        hex.number = n;
        
        numArray.push(n);
        
        // adds dots to appropriate hex
        if (n == 2 || n == 12) {
            hex.dots = 1;
        } else if (n == 3 || n == 11) {
            hex.dots = 2;
        } else if (n == 4 || n == 10) {
            hex.dots = 3;
        } else if (n == 5 || n == 9) {
            hex.dots = 4;
        } else {
            hex.dots = 5;
        }
    } else {
        hex.number = 0;
    }
    return;
}





// assign random resources
while (hex1.resource == null) {
    // reset resource globals
    grainNumber = 0;
    woodNumber = 0;
    woolNumber = 0;
    oreNumber = 0;
    clayNumber = 0;
    desertNumber = 0;   
    
    // assign resources
    noDubResource(hex1, 0);
    noDubResource(hex2, 0);
    noDubResource(hex3, 0);
    noDubResource(hex4, 0);
    noDubResource(hex5, 0);
    noDubResource(hex6, 0);
    noDubResource(hex7, 0);
    noDubResource(hex8, 0);
    noDubResource(hex9, 0);
    noDubResource(hex10, 0);
    noDubResource(hex11, 0);
    noDubResource(hex12, 0);
    noDubResource(hex13, 0);
    noDubResource(hex14, 0);
    noDubResource(hex15, 0);
    noDubResource(hex16, 0);
    noDubResource(hex17, 0);
    noDubResource(hex18, 0);
    noDubResource(hex19, 0);
}



  
// assign random numbers
while (hex1.number == null) {
    // reset number array
    numArray = [2, 12];   
    
    // assign numbers
    noDubNumber(hex1, 0);
    noDubNumber(hex2, 0);
    noDubNumber(hex3, 0);
    noDubNumber(hex4, 0);
    noDubNumber(hex5, 0);
    noDubNumber(hex6, 0);
    noDubNumber(hex7, 0);
    noDubNumber(hex8, 0);
    noDubNumber(hex9, 0);
    noDubNumber(hex10, 0);
    noDubNumber(hex11, 0);
    noDubNumber(hex12, 0);
    noDubNumber(hex13, 0);
    noDubNumber(hex14, 0);
    noDubNumber(hex15, 0);
    noDubNumber(hex16, 0);
    noDubNumber(hex17, 0);
    noDubNumber(hex18, 0);
    noDubNumber(hex19, 0);
}








// ~~~~~~~~~~~~~ DRAWING IMAGES ~~~~~~~~~~~~

// getting first canvaslayer
var canvas = document.getElementById('myCanvas');
var parent = document.getElementById('rightPanel');
var context = canvas.getContext('2d');
canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight - 55;


// second canvas layer
var canvas2 = document.getElementById('myCanvas2');
var context2 = canvas2.getContext('2d');
canvas2.width = parent.offsetWidth;
canvas2.height = parent.offsetHeight - 55;




// set resize factor based on smaller dimension
if (canvas.width/(4 * 490) <= canvas.height/(5 * 420)) {
    resizeFactor = canvas.width/(4 * 490);
} else {
    resizeFactor = canvas.height/(5 * 420);
}


// set img height and width based on resize factor
var width = Math.floor(490 * resizeFactor);
var height = Math.floor(420 * resizeFactor);





// function to draw a hex
var hexDraw = function(hex, xLoc, yLoc, resource) {

    hex.onload = function() {
        context.drawImage(hex, xLoc, yLoc, width, height);
    };
    if (resource == 'grain') {
        hex.src = 'public/img/grain.png';
    } 
    else if (resource == 'ore') {
        hex.src = 'public/img/ore.png';
    } 
    else if (resource == 'clay') {
        hex.src = 'public/img/clay.png';
    } 
    else if (resource == 'wood') {
        hex.src = 'public/img/wood.png';
    } 
    else if (resource == 'wool') {
        hex.src = 'public/img/wool.png';
    }
    else if (resource == 'desert'){
        hex.src = 'public/img/desert.png';
    }
}





// function to draw a number tile
var numDraw = function (hex, xloc, yloc) {
    // check so see if desert
    if (hex.resource == 'desert') {
        return;
    } else {
    
        context2.strokeStyle = '#000000';
        context2.lineWidth = 3;        
        context2.beginPath();
        context2.arc(xloc + width/2, yloc + height/2, 0.20 * width, 0, 2 * Math.PI, false);
        context2.closePath();
        context2.fillStyle = '#FFF5CA';
        context2.fill();
        context2.stroke();
        
        var fontSize = resizeFactor * 80;
        context2.font = "bold " + fontSize + "pt sans-serif";
        context2.textAlign = 'center';
        
        // red for 6s and 8s
        if (hex.number == 6 || hex.number == 8) {
            context2.fillStyle = '#CC0303';
        } else {
            context2.fillStyle = '#000000';
        }
        context2.fillText(hex.number, xloc + width/2, yloc + 0.55 * height);
        
        // make dots underneath number
        var d = '';
        for (i = 0; i < hex.dots; i++) {
            d += '.';
        }
        context2.fillText(d, xloc + width/2, yloc + 0.63 * height);
            
    }
}




// create hex images
var hexImg1 = new Image();
var hexImg2 = new Image();
var hexImg3 = new Image();
var hexImg4 = new Image();
var hexImg5 = new Image();
var hexImg6 = new Image();
var hexImg7 = new Image();
var hexImg8 = new Image();
var hexImg9 = new Image();
var hexImg10 = new Image();
var hexImg11 = new Image();
var hexImg12 = new Image();
var hexImg13 = new Image();
var hexImg14 = new Image();
var hexImg15 = new Image();
var hexImg16 = new Image();
var hexImg17 = new Image();
var hexImg18 = new Image();
var hexImg19 = new Image();




// creat coordinates
var col0 = 0;
var col1 = Math.floor(0.75 * width - 1);
var col2 = Math.floor(1.5 * width - 2);
var col3 = Math.floor(2.25 * width - 3);
var col4 = Math.floor(3 * width - 4);

var row0 = 0;
var row1 = Math.floor(0.5 * height);
var row2 = Math.floor(height);
var row3 = Math.floor(1.5 * height);
var row4 = Math.floor(2 * height);
var row5 = Math.floor(2.5 * height);
var row6 = Math.floor(3 * height);
var row7 = Math.floor(3.5 * height);
var row8 = Math.floor(4 * height);




// draw hexes on canvass
hexDraw(hexImg1, col2, row0, hex1.resource);

hexDraw(hexImg2, col1, row1, hex2.resource);
hexDraw(hexImg3, col3, row1, hex3.resource);

hexDraw(hexImg4, col0, row2, hex4.resource);
hexDraw(hexImg5, col2, row2, hex5.resource);
hexDraw(hexImg6, col4, row2, hex6.resource);

hexDraw(hexImg7, col1, row3, hex7.resource);
hexDraw(hexImg8, col3, row3, hex8.resource);

hexDraw(hexImg9, col0, row4, hex9.resource);
hexDraw(hexImg10, col2, row4, hex10.resource);
hexDraw(hexImg11, col4, row4, hex11.resource);


hexDraw(hexImg12, col1, row5, hex12.resource);
hexDraw(hexImg13, col3, row5, hex13.resource);

hexDraw(hexImg14, col0, row6, hex14.resource);
hexDraw(hexImg15, col2, row6, hex15.resource);
hexDraw(hexImg16, col4, row6, hex16.resource);

hexDraw(hexImg17, col1, row7, hex17.resource);
hexDraw(hexImg18, col3, row7, hex18.resource);

hexDraw(hexImg19, col2, row8, hex19.resource);




// drawing numbers on second canvas
numDraw(hex1, col2, row0);

numDraw(hex2, col1, row1);
numDraw(hex3, col3, row1);

numDraw(hex4, col0, row2);
numDraw(hex5, col2, row2);
numDraw(hex6, col4, row2);

numDraw(hex7, col1, row3);
numDraw(hex8, col3, row3);

numDraw(hex9, col0, row4);
numDraw(hex10, col2, row4);
numDraw(hex11, col4, row4);


numDraw(hex12, col1, row5);
numDraw(hex13, col3, row5);

numDraw(hex14, col0, row6);
numDraw(hex15, col2, row6);
numDraw(hex16, col4, row6);

numDraw(hex17, col1, row7);
numDraw(hex18, col3, row7);

numDraw(hex19, col2, row8);

  
  
  
  
  











  
  
  
  
  
  
