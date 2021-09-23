<?php

function analizza_GET($parametro){
	if(isset($_GET[$parametro])){
		$get = $_GET[$parametro];
		return $get;
	}else{
		$errore = $parametro;
		return $errore;
	}	
}

?>