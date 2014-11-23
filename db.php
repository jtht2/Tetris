<?php
header('Content-Type: text/html; charset=utf-8');

$db = new PDO('sqlite:scores.db');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
	$name = $_POST["name"];
	if ($name != "" && !preg_match('/\s/',$name)) {
		$insert = "INSERT INTO Scores (name, score)
				   VALUES (:name, :score)";
		$stmt   = $db->prepare($insert);

		$stmt->execute(array('name' => $name, 'score' => $_POST["score"]));
	}
}

$db = null;