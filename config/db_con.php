<?php
//connect to db / local or live
// $con = new mysqli();
if (getenv("MYSQL_HOST")) {
	$host = getenv("MYSQL_HOST");
	$password = getenv("MYSQL_PASSWORD");
	$user = getenv("MYSQL_USER");
	$con = mysqli_connect($host, $user, $password, "akwamensdb") or die(json_encode(mysqli_error($con)));
} else {
	$con = mysqli_connect("35.224.52.27", "root", "QZoUV0m<tz5SX/hY", "akwamensdb") or die(json_encode(mysqli_error($con)));
}

// define("CON", $con);
$_POST = json_decode(file_get_contents('php://input'), true);
