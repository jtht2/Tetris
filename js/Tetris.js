// =========
// MAP STUFF
// =========

var Map = {

_tileHeight : 32,
_tileWidth  : 32,
_x : 20,
_y : 20,

_liveBrick : true,
_currentBrick : null,
_nextBrick : null,
_deletedRow : false,

_createBrick : function(descr) {
	return new Brick(descr);
},

// Notkun: a = this._generateBrick();
// Eftir:  a er nýr Brick af handahófskenndri gerð
_generateBrick : function() {
	var brickType = utils.randomInt(g_typeOfBrick.length)
	return this._createBrick(g_typeOfBrick[brickType]);
},

// Notkun: this._deleteFullRow()
// Eftir:  allar raðir sem eru fullar er eytt
_deleteFullRow : function() {
	var startingRow = this._currentBrick.row;
	var len = startingRow + this._currentBrick.colLen;

	var shouldDeleteRow = true;
	var rows = 0;

	for (var i = startingRow; i < len; i++) {
		for (var j = 0; j < g_rowLength; j++) {
			if (!g_landed[i][j]) {
				shouldDeleteRow = false;
				break;
			}			
		}

		if (shouldDeleteRow) {
			g_landed.splice(i, 1);
			g_landed.unshift([0,0,0,0,0,0,0,0,0,0]);
			levelManager.tiles++;
			rows++;
		}
		shouldDeleteRow = true;
	}

	if (rows === 1) {
		levelManager.score += 40 * (1 + levelManager.level)
	}
	if (rows === 2) {
		levelManager.score += 80 * (1 + levelManager.level)
	}
	if (rows === 3) {
		levelManager.score += 200 * (1 + levelManager.level)
	}
	if (rows === 4) {
		levelManager.score += 400 * (1 + levelManager.level)
	}
},

update : function(du) {

	if (!this._liveBrick) {
		this._deleteFullRow();
		var b = this._currentBrick = this._nextBrick;
		this._nextBrick = this._generateBrick();
		if (!b._notColliding(b.row, b.col)) {
			g_GameOver = true;
			g_name.className = "show";
			g_name.focus();

		}
	}

	this._liveBrick = this._currentBrick.update(du);
},

_drawBorder : function(ctx, startX, startY, width, height, borderWidth) {
	ctx.save();
	ctx.lineWidth = borderWidth;
	ctx.strokeStyle = "crimson";
	ctx.strokeRect(startX, startY, width, height);
	ctx.restore();
},

_renderBorders : function(ctx) {
	var borderWidth = 5;

	var startX = this._x - borderWidth / 2;
	var startY = this._y - borderWidth / 2;

	var width = g_rowLength * this._tileWidth + borderWidth;
	var height = g_colLength * this._tileHeight + borderWidth;

	// lagar að kubbar fari yfir bakgrunn... ekki fallegt
	ctx.fillStyle = "pink";
	ctx.fillRect(0, 0, 360, this._y);

	this._drawBorder(ctx, startX, startY, width, height, borderWidth);
},

_renderInstructions : function(ctx, tw, th) {
	var xOffSet = 440;
	var yOffSet = 52;
	var width = 7 * tw;
	var height = 4 * th;

	ctx.font = "16px Stalinist One";
	ctx.fillStyle = "black";
	ctx.fillText("Instructions", xOffSet - 1.30*tw , yOffSet + 11.7*th);
	ctx.font = "12px Stalinist One";
	ctx.fillText("up:          rotate", xOffSet - 1.80*tw , yOffSet + 12.2*th);
	ctx.fillText("right:    move right", xOffSet - 1.80*tw , yOffSet + 12.6*th);
	ctx.fillText("left:       move left", xOffSet - 1.80*tw , yOffSet + 13*th);
	ctx.fillText("down:    slow drop", xOffSet - 1.80*tw , yOffSet + 13.4*th);
	ctx.fillText("space:   hard drop", xOffSet - 1.80*tw , yOffSet + 13.8*th);
	ctx.fillText("p: 	         pause game", xOffSet - 1.80*tw , yOffSet + 14.2*th);
},

_renderTextBoxes : function(ctx, tw, th) {
	var xOffSet = 440;
	var yOffSet = 52;
	var width = 7 * tw;
	var height = 4 * th;

	ctx.fillStyle = "white"
	ctx.fillRect(xOffSet - 2*tw, yOffSet + 4*th, width, height - 2*th);
	this._drawBorder(ctx, xOffSet - 2*tw, yOffSet + 4*th, width, height - 2*th, 5);

	ctx.fillRect(xOffSet - 2*tw, yOffSet + 6.5*th, width, height - 2*th);
	this._drawBorder(ctx, xOffSet - 2*tw, yOffSet + 6.5*th, width, height - 2*th, 5);

	ctx.fillRect(xOffSet - 2*tw, yOffSet + 9*th, width, height - 2*th);
	this._drawBorder(ctx, xOffSet - 2*tw, yOffSet + 9*th, width, height - 2*th, 5);

	ctx.fillStyle = "lightblue";
	ctx.font = "36px Stalinist One";
	var score = levelManager.score;
	var level = levelManager.level;
	
	ctx.fillText("level " + level, xOffSet - 1.80*tw , yOffSet + 5.4*th);

	ctx.fillText("score", xOffSet - 1.80*tw , yOffSet + 7.84*th);
	
	ctx.font = "28px Stalinist One";
	ctx.fillText(score, xOffSet - 1.80*tw , yOffSet + 10.3*th);
},

_renderNextBrick : function(ctx, tw, th) {
	var xOffSet = 440;
	var yOffSet = 52;
	var width = 7 * tw;
	var height = 4 * th;

	var brick = this._nextBrick;

	ctx.fillStyle = "white";
	ctx.fillRect(xOffSet - 2*tw, yOffSet - th, width, height);
	this._drawBorder(ctx, xOffSet - 2*tw, yOffSet - th, width, height, 5);

	ctx.save();

	for (var i = 0; i < brick.colLen; i++) {
		for (var j = 0; j < brick.rowLen; j++) {
			if (brick.shape[i][j]) {
				ctx.fillStyle = g_brickColor[brick.color];
				if (brick.rowLen === 2) {
					ctx.fillRect  (xOffSet + 16 + j * tw, yOffSet + i * th, tw, th);
				} else if (brick.rowLen === 4) {
					ctx.fillRect  (xOffSet - 16 + j * tw, yOffSet + 16 + i * th, tw, th);	
				} else {
					ctx.fillRect  (xOffSet + j * tw, yOffSet + i * th, tw, th);
				}
			}
		}
	}
	ctx.restore();	
},

_localAlpha : 0.01,
_countDown  : 30,
_inc : true,

_renderLevel : function(ctx) {
	ctx.save()
	ctx.font = "40px Stalinist One";
	ctx.textAlign = "center";
	ctx.fillStyle = "black";
	if (levelManager.changedLevels) {
		this._localAlpha = 0.01;
		this._countDown = 30;
		this._inc = true;
	}
	if (this._localAlpha > 0) {
		ctx.globalAlpha = this._localAlpha;
		ctx.fillText("level " + levelManager.level, 180, 200);
		if (this._inc) this._localAlpha += 0.01;
		if (this._localAlpha >= 1) {
			this._inc = false;
			this._countDown--;
		}
		if (this._countDown < 0 && !this._inc) this._localAlpha -= 0.01;

	}
	ctx.restore();
},

render : function(ctx) {
	var th = this._tileHeight;
	var tw = this._tileWidth;

	ctx.save();
	for (var i = 0; i < g_colLength; i++) {
		for (var j = 0; j < g_rowLength; j++) {
			ctx.fillStyle = g_brickColor[g_landed[i][j]];

			ctx.fillRect(this._x + j * tw, this._y + i * th, tw, th);
		}
	}
	ctx.restore();
	
	this._currentBrick.render(ctx, tw, th, this._x, this._y);
	this._renderNextBrick(ctx, tw, th);
	this._renderTextBoxes(ctx, tw, th);
	this._renderBorders(ctx);
	this._renderInstructions(ctx, tw, th);
	this._renderLevel(ctx);
}

};