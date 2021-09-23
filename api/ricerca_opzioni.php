<?php

include('../php/functions.php');
include("../libraries/dbLibrary.php");
header("Content-type: application/json");

$db = openDB("543999");
$pesce = analizza_GET("pesce");
$pizza = analizza_GET("pizza");
$fastfood = analizza_GET("fastfood");
$vegetariano = analizza_GET("vegetariano");
$glutine = analizza_GET("glutine");
$asiatico = analizza_GET("asiatico");
$prezzo = analizza_GET("prezzo");
$max = analizza_GET("max");
$min = analizza_GET("min");
$regione = analizza_GET("regione");
$voto_max= number_format((float)$max, 1, '.', '');
$voto_min= number_format((float)$min, 1, '.', '');
$sql = select($db,"
			SELECT ristoranti_IT.Nome, ristoranti_IT.Citta, ristoranti_IT.Indirizzo, dati_IT.Numero_Recensioni, dati_IT.Rating,dati_IT.Punteggio_Prezzo
			FROM ristoranti_IT JOIN categorie_IT ON ristoranti_IT.ID = categorie_IT.ID JOIN dati_IT ON ristoranti_IT.ID = dati_IT.ID 
			WHERE categorie_IT.Pesce = $pesce AND categorie_IT.Pizza = $pizza AND categorie_IT.FastFood = $fastfood AND categorie_IT.Vegetariano = $vegetariano AND categorie_IT.Glutine = $glutine AND categorie_IT.Asiatico = $asiatico AND dati_IT.Punteggio_Prezzo = $prezzo AND dati_IT.Rating <= $voto_max AND dati_IT.Rating >= $voto_min AND ristoranti_IT.Regione=$regione
			ORDER BY ristoranti_IT.Citta");

foreach( $sql as $record )
	$nomi[] = array($record['Nome'],$record['Citta'],$record['Indirizzo'],intval($record['Numero_Recensioni']), floatval($record['Rating']),floatval($record['Punteggio_Prezzo']));
			
closeDB($db);			
echo(json_encode($nomi)); 

?>