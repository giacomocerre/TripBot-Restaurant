<?php

include('../php/functions.php');
include("../libraries/dbLibrary.php");
header("Content-type: application/json");

$db = openDB("543999");

$sql = select($db," 
    SELECT ristoranti_IT.Nome,ristoranti_IT.Citta, dati_IT.Rating, dati_IT.Numero_Recensioni, dati_IT.Servizio,dati_IT.Cucina 
	FROM ristoranti_IT JOIN dati_IT ON ristoranti_IT.ID = dati_IT.ID 
	ORDER BY dati_IT.Numero_Recensioni / dati_IT.Rating DESC 
	LIMIT 20");

foreach( $sql as $record )
    $classifica[] = array( $record['Nome'], $record['Citta'], floatval($record['Rating']), intval($record['Numero_Recensioni']), intval($record['Servizio']), intval($record['Cucina'])); 
closeDB($db);
echo(json_encode($classifica));  
?>