
var startingScreen = {

x : g_canvas.width / 2,
y : g_canvas.height / 2,
width  : 50,
height : 35,
fontFamily : "Stalinist One",
alpha  : 0.5,
firstGame : true,

startNewGame : function() {
	Map._currentBrick = Map._generateBrick();
	Map._nextBrick = Map._generateBrick();
	levelManager.level = 0;
	levelManager.score = 0;
	levelManager.tiles = 0;
	g_GameOver = false;
	g_NewGame  = false;
	g_paused   = false;
	g_landed = [
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
},

update : function(du) {
	if (g_keys[KEY_ENTER]) this.startNewGame();
},

render : function(ctx) {
	ctx.save();
	utils.clearCanvas(ctx);
	
	ctx.font = "40px " + this.fontFamily;
	ctx.textAlign = "center";
	ctx.globalAlpha = this.alpha;
	ctx.fillStyle = "black";
	ctx.fillText("Start New Game",this.x,this.y);
	ctx.restore();
}

}