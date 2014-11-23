var g_keys = [];
var g_paused = false;

var KEY_PAUSE  = 'P'.charCodeAt(0);
var KEY_SLAM   = ' '.charCodeAt(0);
var KEY_ROTATE = 38;
var KEY_DOWN   = 40;
var KEY_LEFT   = 37;
var KEY_RIGHT  = 39;
var KEY_ENTER  = 13;

function handleKeydown(evt) {
   g_keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
    g_keys[evt.keyCode] = false;
}

function eatKey(key) {
    var isDown = g_keys[key];
    g_keys[key] = false;
    return isDown;
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);