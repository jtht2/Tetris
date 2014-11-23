
var g_ball = {

cx : 50,
cy : 50,
xVel : 5,
yVel : 4,
radius : 10,
    
update : function(dt) {
    var rightEdge  = this.cx + this.radius;
    var leftEdge   = this.cx - this.radius;
    var topEdge    = this.cy - this.radius;
    var bottomEdge = this.cy + this.radius
    
    var width  = g_canvas.width;
    var height = g_canvas.height;
    
    if (rightEdge > width || leftEdge < 0) this.xVel  *= -1;
    if (topEdge < 0 || bottomEdge > height) this.yVel *= -1;
    
    this.cx += this.xVel * dt; 
    this.cy += this.yVel * dt;
},

render : function(ctx) {
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.radius, 0, 2*Math.PI);
    ctx.fill();
}
};

function update(dt) {
    if(!g_GameOver && !g_NewGame) Map.update(dt);
    levelManager.update(dt);
}

function render(ctx) {
    utils.clearCanvas(ctx);
    Map.render(ctx);
}

function positionName() {
    var rect = g_canvas.getBoundingClientRect();

    g_name.style.left = (rect.left + 356.75 - 150).toString() + "px";
    g_name.style.top = (rect.top+255).toString() + "px";
}

var keeperOfTime = { start : null };

function main(frameTime) {
    if (eatKey(KEY_PAUSE)) g_paused = !g_paused;
  
    if (keeperOfTime.start === null) keeperOfTime.start = frameTime;
    var dt = (frameTime - keeperOfTime.start) / 16.666;
    keeperOfTime.start = frameTime;
    
    positionName();
    if (!g_paused) update(dt);
    if (!g_GameOver && !g_NewGame) render(g_ctx);
    
    if (g_GameOver) {
        gameOverScreen.update(dt);
        gameOverScreen.render(g_ctx);
    }
    if (g_NewGame) {
        startingScreen.update(dt);
        startingScreen.render(g_ctx);
    }

    if (g_paused && !g_GameOver && !g_NewGame) pauseScreen.render(g_ctx);

    window.requestAnimationFrame(main);
}

WebFont.load({
    google: {
        families: ['Stalinist One']
    },
    fontactive : function(a, b) {
        window.requestAnimationFrame(main);
    },
    fontinactive : function(a, b) {
        window.requestAnimationFrame(main);
    }
});

//window.requestAnimationFrame(main);

