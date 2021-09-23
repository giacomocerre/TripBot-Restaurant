<?php

include('../php/functions.php');
include("../libraries/dbLibrary.php");
header("Content-type: application/json");

$db = openDB("543999");
$geo = analizza_GET("geo");
var_dump($geo);
$sql = select($db,"
	SELECT ristoranti_$geo.Regione, ((COUNT(CASE WHEN dati_$geo.Punteggio_Prezzo = 1.0 THEN ristoranti_$geo.ID END) / COUNT(ristoranti_$geo.ID) ) * 100) AS Percentuale1,((COUNT(CASE WHEN dati_$geo.Punteggio_Prezzo = 2.5 THEN ristoranti_$geo.ID END) / COUNT(ristoranti_$geo.ID) ) * 100) AS Percentuale2,((COUNT(CASE WHEN dati_$geo.Punteggio_Prezzo = 4.0 THEN ristoranti_$geo.ID END) / COUNT(ristoranti_$geo.ID) ) * 100) AS Percentuale3 
	FROM ristoranti_$geo JOIN dati_$geo ON ristoranti_$geo.ID = dati_$geo.ID 
	GROUP BY ristoranti_$geo.Regione;");

foreach( $sql as $record )
	$Percentuale[] = array($record['Regione'], floatval($record['Percentuale1']), floatval($record['Percentuale2']), floatval($record['Percentuale3']));
closeDB($db);		
echo(json_encode($Percentuale));  

?>