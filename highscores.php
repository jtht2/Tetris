<?php
header('Content-Type: text/html; charset=utf-8');

$db = new PDO('sqlite:scores.db');
$results = $db->query('SELECT * 
					  FROM scores
					  ORDER BY score DESC
					  LIMIT 20;');

include('views/header.php');
include('views/main.php');
include('views/footer.php');