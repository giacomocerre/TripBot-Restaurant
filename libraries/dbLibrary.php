<?php

/******************************
 * Open a Connection to MySQL *
 ******************************/
function openDB($database="543999", $password="root", $username="root", $servername="localhost"){
	// Create connection
	$db = mysqli_connect($servername, $username, $password, $database);
	if (!$db) die("dbLibrary: errore di connessione: " . mysqli_connect_error($db));
	
	/* change character set to utf8 */
	if (!mysqli_set_charset($db, "utf8"))	printf("Error loading character set utf8: %s\n", mysqli_error($db));

	return $db;
}

/******************************
 * Lettura dei records        *
 ******************************/
function select($db,$sql){
	// Esecuzione query
	$resultSet = mysqli_query($db, $sql);
	if(!$resultSet){
		print("dbLibrary: Errore esecuzione $sql:" . mysqli_error($db));
		return null;
	}
	else{
		// Copio i records in un array associativo
		$records=array();
		while ($record = mysqli_fetch_assoc($resultSet)) $records[]=$record;
		
		// Liberazione della memoria impegnata dal result set
		mysqli_free_result($resultSet);
		
		return $records;
	}
}

/*******************************
 * ESECUZIONE di un comando sql*
 *******************************/
function sql($db,$sql){
	if($err==3) print($sql);
	// Esecuzione query
	$resultSet = mysqli_query($db, $sql);
	if(!$resultSet){
		print("dbLibrary: Errore esecuzione $sql:" . mysqli_error($db));
		return(-1);
	}
	else return(1);
}

/******************************
 * Close the Connection to MySQL *
 ******************************/
 function closeDB ($db){
	mysqli_close($db);
}

?>