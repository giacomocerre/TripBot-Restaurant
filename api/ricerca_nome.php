<?php

include('../php/functions.php');
include("../libraries/dbLibrary.php");
header("Content-type: application/json");

$db = openDB("543999");
$nome = analizza_GET("nome");
$regione = analizza_GET("regione");
$sql = select($db,"
			SELECT ristoranti_IT.Nome, ristoranti_IT.Citta, ristoranti_IT.Indirizzo, dati_IT.Numero_Recensioni, dati_IT.Rating,dati_IT.Punteggio_Prezzo
			FROM ristoranti_IT JOIN categorie_IT ON ristoranti_IT.ID = categorie_IT.ID JOIN dati_IT ON ristoranti_IT.ID = dati_IT.ID 
			WHERE ristoranti_IT.Nome LIKE $nome and ristoranti_IT.Regione =$regione
			ORDER BY ristoranti_IT.Citta");

foreach( $sql as $record )
	$nomi[] = array($record['Nome'],$record['Citta'],$record['Indirizzo'],intval($record['Numero_Recensioni']), floatval($record['Rating']),floatval($record['Punteggio_Prezzo']));

closeDB($db);
echo(json_encode($nomi));
?>