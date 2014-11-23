
var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var g_name = document.getElementById("name");
var g_form = document.getElementById("form");

var g_landed = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

var g_GameOver = false;
var g_NewGame  = true;

var g_brickColor = [
	["white"],
	["red"],
	["blue"],
	["purple"],
	["yellow"],
	["orange"],
	["SaddleBrown"],
	["green"]
];

g_rowLength = g_landed[0].length;
g_colLength = g_landed.length;

var g_typeOfBrick = [
	{  
		color   : 1,
		col     : 4,
		offSets : {
			down : [ 0,  0,   "down"]
		},
		shape   : [[1,1],
				   [1,1]] 
	},
	
	{ 
		color   : 2,
		offSets : {
			down  : [-1,  0,  "left"],
			left  : [ 0,  0,    "up"],
			up    : [ 0,  1, "right"],
			right : [ 1, -1,  "down"]
		},
		shape   : [[2,2,2],
				   [2,0,0]] 
	},

	{ 
		color   : 3,
		offSets : {
			down  : [-1,  0,  "left"],
			left  : [ 0,  0,    "up"],
			up    : [ 0,  1, "right"],
			right : [ 1, -1,  "down"]
		},
		shape   : [[3,3,3],
				   [0,0,3]] 
	},

	{ 
		color   : 4,
		offSets : {
			down  : [-1,  0,  "left"],
			left  : [ 0,  0,    "up"],
			up    : [ 0,  1, "right"],
			right : [ 1, -1,  "down"]
		},
		shape   : [[4,4,4],
				   [0,4,0]] 
	},

	{ 
		color   : 5,
		offSets : {
			down  : [-1,  1,  "up"],
			up    : [ 1, -1,  "down"]
		},
		shape   : [[5,5,5,5]]
	},

	{ 
		color   : 6,
		offSets : {
			down  : [-1,  0,  "up"],
			up    : [ 1,  0,  "down"]
		},
		shape   : [[0,6,6],
				   [6,6,0]] 
	},

	{
		color   : 7,
		offSets : {
			down  : [-1,  1,  "up"],
			up    : [ 1, -1,  "down"]
		},
		shape   : [[7,7,0],
				   [0,7,7]] 
	}

];