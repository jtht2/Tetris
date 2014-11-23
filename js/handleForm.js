

var xmlhttp = new XMLHttpRequest();

function saveData() {
	var name = document.getElementById("name").value;
	var score = levelManager.score;
	xmlhttp.open("POST", "db.php", true);
	
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	xmlhttp.send("name=" + name + "&score=" + score);

}

function skipSubmit() { return false; }

function init() {
	g_form.onsubmit = skipSubmit;
}

window.onload = init;

