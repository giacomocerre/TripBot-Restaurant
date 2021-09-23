<?php

include("../php/functions.php");
include("../libraries/dbLibrary.php");
header("Content-type: application/json");

$db = openDB("543999");
$categoria = analizza_GET("categoria");
$sql = select($db," 
    SELECT (COUNT(CASE WHEN categorie_IT.$categoria = 1 and ristoranti_IT.Regione IN ('Liguria', 'Lombardia', 'Piemonte', 'Valle dAosta', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Trentino-Alto Adige', 'Veneto') THEN ristoranti_IT.ID END) / COUNT((CASE WHEN ristoranti_IT.Regione IN ('Liguria', 'Lombardia', 'Piemonte', 'Valle dAosta', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Trentino-Alto Adige', 'Veneto') THEN ristoranti_IT.ID END))) * 100 As Nord,
		(COUNT(CASE WHEN categorie_IT.$categoria = 1 and ristoranti_IT.Regione IN ('Lazio','Marche','Toscana','Umbria','Sardegna') THEN ristoranti_IT.ID END) / COUNT((CASE WHEN ristoranti_IT.Regione IN ('Lazio','Marche','Toscana','Umbria','Sardegna') THEN ristoranti_IT.ID END))) * 100 As Centro,
		(COUNT(CASE WHEN categorie_IT.$categoria = 1 and ristoranti_IT.Regione IN ('Sicilia','Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Molise', 'Puglia') THEN ristoranti_IT.ID END) / COUNT((CASE WHEN ristoranti_IT.Regione IN ('Sicilia','Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Molise', 'Puglia') THEN ristoranti_IT.ID END))) * 100 As Sud
	FROM ristoranti_IT JOIN categorie_IT ON ristoranti_IT.ID = categorie_IT.ID");
	
foreach( $sql as $record )
    	$categoriaNCS[] = array("name"=>"Nord","data"=>array(floatval($record['Nord'])));
    	$categoriaNCS[] = array("name"=>"Centro","data"=>array(floatval($record['Centro'])));
    	$categoriaNCS[] = array("name"=>"Sud","data"=>array(floatval($record['Sud'])));
closeDB($db);
echo(json_encode($categoriaNCS)); 
?>