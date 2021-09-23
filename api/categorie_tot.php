<?php

include('../php/functions.php');
include("../libraries/dbLibrary.php");
header("Content-type: application/json");

$db = openDB("543999");
$geo = analizza_GET("geo");
$sql = select($db,"
	SELECT sum(categorie_$geo.Pesce) AS Pesce,sum(categorie_$geo.Pizza) AS Pizza, sum(categorie_$geo.FastFood) AS FastFood, sum(categorie_$geo.Vegetariano) AS Vegetariano, sum(categorie_$geo.Glutine) AS Glutine, sum(categorie_$geo.Asiatico) AS Asiatico 
	FROM categorie_$geo;");

foreach( $sql as $record )
	$categorie[] = array("name"=>"Pesce","y"=>intval($record['Pesce']));
	$categorie[] = array("name"=>"Pizza","y"=>intval($record['Pizza']));
	$categorie[] = array("name"=>"FastFood","y"=>intval($record['FastFood']));
	$categorie[] = array("name"=>"Vegetariano","y"=>intval($record['Vegetariano']));
	$categorie[] = array("name"=>"Glutine","y"=>intval($record['Glutine']));
	$categorie[] = array("name"=>"Asiatico","y"=>intval($record['Asiatico'])); 
closeDB($db);			
echo(json_encode($categorie));  
?>