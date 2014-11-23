
var pauseScreen = {

w : g_canvas.width,
h : g_canvas.height,

_drawBorder : function(ctx) {
	ctx.save();
	ctx.lineWidth = 10;
	ctx.strokeStyle = "crimson";
	ctx.strokeRect(0, this.h/4, this.w, this.h/2);
	ctx.restore();
},

render : function(ctx) {
	this._drawBorder(ctx);
	ctx.save();
	ctx.fillStyle = "pink";
	var w = this.w;
	var h = this.h;
	ctx.fillRect(0, h/4, w, h/2);
	
	ctx.font = "40px Stalinist One";
	ctx.textAlign = "center";
	ctx.fillStyle = "black";
	ctx.fillText("paused", w/2, h/2);
	ctx.restore();
}
}