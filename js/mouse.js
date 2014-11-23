
var g_mouseX = 0;
var g_mouseY = 0;



function handleMouse(evt) {
    var rect = g_canvas.getBoundingClientRect();
    g_mouseX = evt.clientX - rect.left;
    g_mouseY = evt.clientY - rect.top;
    var m    = 7.3;
    var n    = 3.12;
    var ss   = startingScreen;
    var gos  = gameOverScreen;

    if (g_mouseX > ss.x - m*40 && g_mouseX < ss.x + m*40  && 
 		g_mouseY > ss.y - 30 && g_mouseY < ss.y + 5 && g_NewGame) {
    	ss.alpha = 1;
    	if (evt.which) {
    		ss.startNewGame();
    	}
    } else {
    	ss.alpha = 0.5;
    }

    if (g_mouseX > gos.x - n*40 && g_mouseX < gos.x + n*40  && 
 		g_mouseY > gos.y + 110 && g_mouseY < gos.y + 145 && 
 		g_GameOver && !g_NewGame) {
    	gos.alpha = 1;
    	if (evt.which) {
    		g_GameOver = false;
    		g_NewGame = true;
            saveData();
            g_name.value = "";
            g_name.className = "hide";
            Map._localAlpha = 0.01;
            Map._countDown = 30;
            Map._inc = true;
    	}
    } else {
    	gos.alpha = 0.5;
    }
    
    if (!evt.which) return;

}

window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);