var timer;
var count = 0;
//var screenSize = 500;//$(window).width();
//var x = screenSize % 5;				//we want our array to be an increment of 5
var height = 100;
var width = 100;

//console.log(screenSize);
//console.log(x);	
console.log(width);
console.log(height);
var conway = new organism();

var startLife = function() {
	var canvas = document.getElementById('Canvas');
	canvas.width = 5 * width;//window.innerWidth;
	canvas.height = 5 * height;
	
	window.clearInterval(timer);
	count = 0;
	
	//must reset from past iterations
	for (var i = 0; i < (width); i++) {
		for (var j = 0; j < (height); j++) {
			conway.killCell(i, j);
		}
	}
	
	randomizeStartingPoints();
	
	updateCanvas(canvas);
}

var nextStage = function() {
	conway.update();
	updateCanvas();
}

//probably don't need this in hindsight. could probably just jam 'alive' property into each index of organism's 2D array
function cell(x, y, a) {
	this.xCoordinate = x;
	this.yCoordinate = y;
	this.alive = a;
	
	
}

function organism() {				//size = how many cells in both x and y direction
	var org = new Array(width);			//org is a 2D array of cells
	for (var i = 0; i < (width); i++) {
		org[i] = new Array(height);
	}
	
	for (var i = 0; i < (width); i++) {
		for (var j = 0; j < (height); j++) {
			//console.log(i);
			//console.log(j)
			org[i][j] = new cell(i, j, false);
		}
	}
	
	this.update = function() {
		var activeNeighbors = 0;
		
		//create a new 2D array to store new values of organism's cells
		//-----------------------------------------------------------------------//
		//-----------------------------------------------------------------------//
		var newOrg = new Array();			
		for (var i = 0; i < (width); i++) {
			newOrg[i] = new Array(height);
		}
	
		for (var i = 0; i < (width); i++) {
			for (var j = 0; j < (height); j++) {
				newOrg[i][j] = new cell(i, j, false)
			}
		}
		//-----------------------------------------------------------------------//
		//-----------------------------------------------------------------------//
		
		for (var i = 0; i < (width); i++) {
			for (var j = 0; j < (height); j++) {
				if (i == 0 && j == 0) {							//top left
					activeNeighbors += this.checkCellAlive(i + 1, j);
					activeNeighbors += this.checkCellAlive(i + 1, j + 1);
					activeNeighbors += this.checkCellAlive(i, j + 1);
				} else if (i == 0 && j == height - 1)	{			//bottom left
					activeNeighbors += this.checkCellAlive(i + 1, j);
					activeNeighbors += this.checkCellAlive(i + 1, j - 1);
					activeNeighbors += this.checkCellAlive(i, j - 1);
				} else if (i == width - 1 && j == 0) {			//top right
					activeNeighbors += this.checkCellAlive(i - 1, j);
					activeNeighbors += this.checkCellAlive(i - 1, j + 1);
					activeNeighbors += this.checkCellAlive(i, j + 1);
				} else if (i == width - 1 && j == height - 1) {	//bottom right
					activeNeighbors += this.checkCellAlive(i - 1, j);
					activeNeighbors += this.checkCellAlive(i - 1, j - 1);
					activeNeighbors += this.checkCellAlive(i, j - 1);
				} else if (i == 0) {							//left side
					activeNeighbors += this.checkCellAlive(i, j - 1);
					activeNeighbors += this.checkCellAlive(i + 1, j - 1);
					activeNeighbors += this.checkCellAlive(i + 1, j);
					activeNeighbors += this.checkCellAlive(i + 1, j + 1);
					activeNeighbors += this.checkCellAlive(i, j + 1);
				} else if (i == width - 1) {						//right side
					activeNeighbors += this.checkCellAlive(i, j - 1);
					activeNeighbors += this.checkCellAlive(i - 1, j - 1);
					activeNeighbors += this.checkCellAlive(i - 1, j);
					activeNeighbors += this.checkCellAlive(i - 1, j + 1);
					activeNeighbors += this.checkCellAlive(i, j + 1);
				} else if (j == 0) {							//top row
					activeNeighbors += this.checkCellAlive(i - 1, j);
					activeNeighbors += this.checkCellAlive(i - 1, j + 1);
					activeNeighbors += this.checkCellAlive(i, j + 1);
					activeNeighbors += this.checkCellAlive(i + 1, j + 1);
					activeNeighbors += this.checkCellAlive(i + 1, j);
				} else if (j == height - 1) {						//bottom row
					activeNeighbors += this.checkCellAlive(i - 1, j);
					activeNeighbors += this.checkCellAlive(i - 1, j - 1);
					activeNeighbors += this.checkCellAlive(i, j - 1);
					activeNeighbors += this.checkCellAlive(i + 1, j - 1);
					activeNeighbors += this.checkCellAlive(i + 1, j);
				} else {										//middle cells
					activeNeighbors += this.checkCellAlive(i - 1, j - 1);
					activeNeighbors += this.checkCellAlive(i, j - 1);
					activeNeighbors += this.checkCellAlive(i + 1, j - 1);
					activeNeighbors += this.checkCellAlive(i + 1, j);
					activeNeighbors += this.checkCellAlive(i - 1, j);
					activeNeighbors += this.checkCellAlive(i - 1, j + 1);
					activeNeighbors += this.checkCellAlive(i, j + 1);
					activeNeighbors += this.checkCellAlive(i + 1, j + 1);
				}
				
				if (activeNeighbors == 3) {
					newOrg[i][j].alive = true;
				} else if (org[i][j].alive == true && activeNeighbors == 2) {
					newOrg[i][j].alive = true;
				} else {
					newOrg[i][j].alive = false;
				}
				
				activeNeighbors = 0;			//reset
			}
		}
		
		//set organism's actual 'cells' to the updated version stored in newOrg.
		org = newOrg;
	}
	
	//NOTE: different from getCellAlive
	//this method returns an integer intended to increment activeNeighbors value in update() method
	this.checkCellAlive = function(x, y){	
		//console.log("yup");
		//console.log(x);
		//console.log(y);
		if (org[x][y].alive == true) {
			return 1;
		} else {
			return 0;
		}
	}
	
	this.setCellAlive = function(x, y) {
		org[x][y].alive = true;
	}
	
	this.killCell = function(x, y) {
		//console.log(x);
		//console.log(y);
		org[x][y].alive = false;
	}
	
	this.getCellAlive = function(x, y) {
		return (org[x][y].alive);
	}
	
}

var randomizeStartingPoints = function() {
	var x = 0;
	
	for (var i = 0; i < width; i+=1) {
		for (var j = 0; j < height; j+=1) {
			x = Math.random() * (6 - 0) + 0;		//generates a random number between 0 and 6
			if (x <= 2) {							//if x <= 1 (1 in 6 chance)
				conway.setCellAlive(i, j);
			}
		}
	}
}

var updateCanvas = function(canvas) {
	document.getElementById("count").innerHTML = ("Count: " + count);
	count++;
	
	var canvas = document.getElementById('Canvas');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var i = 0; i < (width); i+=1) {
			for (var j = 0; j < (height); j+=1) {
				if (conway.getCellAlive(i, j) == true) {
					ctx.fillRect((i * 5), (j * 5), 5, 5);
				}
			}
		}
	}
}

var startTimer = function(){
	timer = window.setInterval(nextStage, 100);
}