
var levelManager = {

level : 0,
nextLevel : 1,
score : 0,
tiles : 0,
changedLevels: false,

speed : [50, 40, 30, 25, 20, 16, 13, 10, 8, 5],

update : function(du) {
	this.level = Math.floor(this.tiles / 10);
	if (this.level == this.nextLevel) {
		this.changedLevels = true;
		this.nextLevel++;
	} else {
		this.changedLevels = false;
	}
}
}