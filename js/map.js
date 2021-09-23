var regione;
$(document).ready(function(){
	gestisciMenuDropDwon();
	$('.filtro').click(scegliRicerca);

	$('.regione').on('click',function(){
		$('.regione').removeClass('selected');
		$(this).addClass('selected'); 
		regione = $(this).data('nome-regione'); 
	});

	$('#cercaNome').click(eseguiRicercaNome);
	$("#cercaOpzioni").click(setValoriOpzioni);
});
// //questo document serve per far si che gli elementi generati dinamicamente siano cliccabili
$(document).on('click', '.cittaRisultato', function(){ 
	    var tmp = $(this).find(".singolaCitta")
	    $(this).toggleClass("sfondo");
	    tmp.toggleClass("nascosto");
}); 
// funzione per scegliere il metodo di ricerca in ricerca.html
function scegliRicerca(){
	//in base al click mostro il tipo di ricerca con classe target+0 o target+1
	$('.TargetDiv').hide();
	$('#target' + $(this).attr('target')).show();
	if($(this).attr("target")=="1"){
		$('#ricercaNome').css("background","#ccc");
		$('#ricercaOpzioni').css("background","transparent");
	}else{
		$('#ricercaNome').css("background","transparent");
		$('#ricercaOpzioni').css("background","#ccc");
	}
}
// funzione che prende i valori selezioni per la ricerca opzioni e li passa direttamnte alla funzione per eseguire la query
function setValoriOpzioni(){
	$("#risultatiRicerca").empty();
	//creo array di 6 elementi tutti a 0,valore di default delle categorie ovvero "categoria assente"
	var selectedCat = [0,0,0,0,0,0];
	var selectedPrezzo;
	// rating
	var voto_max = $('#sel_max').text();
	var voto_min = $('#sel_min').text();

	// categorie
	for (var i = 0; i< selectedCat.length; i++) {
		if($('input[class="switch'+i+'"]').is(':checked')){
			selectedCat[i] = 1;
		}
	}
	// prezzo
	for (var i = 0; i < 3; i++){
		if($('input[class="option'+i+'"]').is(':checked')){
				selectedPrezzo = $('input[class="option'+i+'"]').val();
		}
	}
	eseguiRicercaOpzioni(selectedCat,selectedPrezzo,voto_max,voto_min,regione);
}
// gestore per il menu dropdown di ricrca opzioni
function gestisciMenuDropDwon(){
	$('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });
/*Verifica che max > min */
	var min;
	var max;
	$('#dropdown-menu1 li').click(function () {
	      max = $(this).parents('.dropdown').find('span').text();
	      if (max<min){
	      	msg = '<span class="msg">';
	      	$('.msg').html(msg + "voto massimo minore di quello minimo" + '</span>');
	      }else{
	      	msg = '<span class="msg">';
	      	$('.msg').html('</span>');
	      }
	}); 

	$('#dropdown-menu2 li').click(function () {
	  	  min = $(this).parents('.dropdown').find('span').text();
	  	  if (max<min){
	      	msg = '<span class="msg">';
	      	$('.msg').html(msg + "voto massimo minore di quello minimo" + '</span>');
	      }else{
	      	msg = '<span class="msg">';
	      	$('.msg').html('</span>');
	      }
	}); 
}
