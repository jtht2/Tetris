
var gameOverScreen = {

x : g_canvas.width / 2,
y : g_canvas.height / 2,
width  : 50,
height : 35,
fontFamily : "Stalinist One",
alpha  : 0.5,
firstGame : true,

update : function(du) {
	if (g_keys[KEY_ENTER]) {
		g_GameOver = false;
		g_NewGame = true;
	    saveData();
	    g_name.value = "";
	    g_name.className = "hide";
	    Map._localAlpha = 0.01;
	    Map._countDown = 30;
	    Map._inc = true;
	}
},

render : function(ctx) {
	ctx.save();
	utils.clearCanvas(ctx);
	
	ctx.font = "40px " + this.fontFamily;
	ctx.textAlign = "center";

	ctx.fillStyle = "black";
	ctx.fillText("GAME OVER", this.x, this.y - 180);
	ctx.fillText("your score: " + levelManager.score, this.x, this.y - 130);
	ctx.fillText("Enter Initials:", this.x, this.y - 30);
	ctx.globalAlpha = this.alpha;
	ctx.fillText("submit", this.x, this.y + 140);
	ctx.restore();
}

}