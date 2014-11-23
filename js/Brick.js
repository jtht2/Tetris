
function Brick(descr) {
	for (property in descr) {
		this[property] = descr[property];
	}

	this._setLens();
}

Brick.prototype.row = 0;
Brick.prototype.col = 3;

Brick.prototype._timeSinceUpdate = 0;
Brick.prototype.pos = "down";

Brick.prototype._setLens = function() {
	this.rowLen = this.shape[0].length;
	this.colLen = this.shape.length;
}

Brick.prototype._notColliding = function(r, c) {

	for (var i = 0; i < this.colLen; i++) {
		for (var j = 0; j < this.rowLen; j++) {
			var row = i + r;
			var col = j + c;
			if (row >= 0) {
				if (g_landed[row][col] && this.shape[i][j]) return false;
			}
		}
	}
	return true;	
}

// Notkun: this._slam();
// Eftir:  kubburinn hefur verið færður jafn langt niður og hann kemst
//		   þ.e. annaðhvort á botnin eða fyrsta kubb sem er fyrir honum
Brick.prototype._slam = function(currentRow, nextRow) {

	if (nextRow + this.colLen > g_colLength) return currentRow;

	for (var i = 0; i < this.colLen; i++) {
		for (var j = 0; j < this.rowLen; j++) {
			var row = i + nextRow;
			var col = j + this.col;
			if (g_landed[row][col] && this.shape[i][j]) return currentRow;
		}
	}
	return this._slam(nextRow, nextRow + 1);	
}

// Notkun: this._placeBrickInLanded()
// Eftir:  kubburinn hefur verið færður inn í landed og orðin hluti af mappinu
Brick.prototype._placeBrickIntoMap = function() {
	for (var i = 0; i < this.colLen; i++) {
		for (var j = 0; j < this.rowLen; j++) {
			var row = i + this.row;
			var col = j + this.col;
			var tile;
			if (row >= 0) {
				if (tile = this.shape[i][j]) g_landed[row][col] = tile;
			}
		}
	}
}

// Sér um allar hreyfingar og collision detection kubbsins
Brick.prototype._moveBrick = function(du) {
	// Hreyfing niður á við
	this._timeSinceUpdate += du;
	var speed = levelManager.speed[levelManager.level];

	if (this._timeSinceUpdate >= speed || eatKey(KEY_DOWN)) {		
		var belowMap = this.row + this.colLen >= g_colLength;
		if (!(belowMap || !this._notColliding(this.row + 1, this.col))) {
			this.row++;
		} else {
			levelManager.score += this.row;
			return this._placeBrickIntoMap();
		}
		this._timeSinceUpdate = 0;
	}

	// Slamma kubb niður
	if (eatKey(KEY_SLAM)) {
		this.row = this._slam(this.row, this.row + 1);
		levelManager.score += this.row;
		return this._placeBrickIntoMap();
	}

	// Hreyfingar til hægri og vinstri
	if (eatKey(KEY_RIGHT)) var shouldMoveRight = this._notColliding(this.row, this.col + 1);
	if (eatKey(KEY_LEFT))  var shouldMoveLeft  = this._notColliding(this.row, this.col - 1);

	if (shouldMoveRight && this.col + this.rowLen < g_rowLength) this.col++;
	if (shouldMoveLeft  && this.col > 0) 						 this.col--;

	return true;
}

// Notkun: a = this._copyShape()
// Eftir:  a er afrit af shape kubbsins
Brick.prototype._copyShape = function() {
	var shape = [];
	for (var k = 0; k < this.colLen; k++) {
		shape.push([]);
	}
	
	for (var i = 0; i < this.colLen; i++) {
		for (var j = 0; j < this.rowLen; j++) {
			shape[i][j] = this.shape[i][j];
		}
	}

	return shape;
}

// Notkun: this._rotateLeft()
// Eftir:  kubbnum hefur verið snúið til hægri 
Brick.prototype._rotateRight = function() {
	var temp = {};
	temp.shape = this._copyShape();
	temp.row = this.row;
	temp.col = this.col;
	temp.pos = this.pos;

	this.shape = [];

	for (var k = 0; k < this.rowLen; k++) {
		this.shape.push([]);
	}

	for (var i = 0; i < this.colLen; i++) {
		for (var j = 0; j < this.rowLen; j++) {
			this.shape[j][this.colLen - 1 - i] = temp.shape[i][j];
		}
	}

	var offSets = this.offSets;
	var pos = this.pos;

	this.row += offSets[pos][0];
	this.col += offSets[pos][1];
	this.pos  = offSets[pos][2];
	this._setLens();

	var isOutsideMap = this.col < 0 || this.col + this.rowLen > g_rowLength ||
					   this.row + this.colLen > g_colLength;

	if (isOutsideMap || !this._notColliding(this.row, this.col)) {
		this.shape = temp.shape;
		this.row = temp.row;
		this.col = temp.col;
		this.pos = temp.pos;
		this._setLens();
	}

	(this.col + this.rowLen < g_rowLength && this.col > 0)
}

Brick.prototype.update = function(du) {
	if (!this._moveBrick(du)) return false;

	if (eatKey(KEY_ROTATE)) this._rotateRight();

	return true;
}

Brick.prototype.render = function(ctx, tw, th, xOffSet, yOffSet) {

	ctx.save();

	for (var i = 0; i < this.colLen; i++) {
		for (var j = 0; j < this.rowLen; j++) {
			var row = i + this.row;
			var col = j + this.col;
			if (this.shape[i][j]) {
				ctx.fillStyle = g_brickColor[this.color];
				ctx.fillRect  (xOffSet + col * tw, yOffSet + row * th, tw, th);

				//ctx.strokeRect(xOffSet + col * tw, yOffSet + row * th, tw, th);
			}
		}
	}

	ctx.restore();	
}