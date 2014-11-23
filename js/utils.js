
var utils = {

// Notkun: a = utils.randomInt(b);
// Fyrir:  b er náttúruleg tala
// Eftir:  a er slembi-heiltala á bilinu [0, 7) 
randomInt : function(num) {
	return Math.floor(Math.random() * num); 
},

clearCanvas : function(ctx) {
    ctx.save();
    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
    ctx.restore();   
}

};