<?php

include('../php/analysis.php');
include("../libraries/dbLibrary.php");
header("Content-type: application/json");

$db = openDB("nah_db");
$nome = analizza_GET("nome");
$sql = select($db," 
    INSERT INTO users (NIK) VALUES ($nome)");

closeDB($db);        

?>