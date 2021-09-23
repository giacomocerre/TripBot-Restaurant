<?php

include("../libraries/dbLibrary.php");

$database = 'DB_Name'​;
$password = 'password';
$username = 'user';
$servername= 'server_name 0.0.0.0';

$db = openDB($database, $password, $username, $servername);
?>
