// getJSON per la creazione del grafico Percentuale prezzo
function crea_grafico_percentuale_prezzo(geo){
	$.getJSON("api/price.php?geo="+geo, function(data){
		var alti = new Array(20);
		var medi = new Array(20);
		var bassi = new Array(20);
		var regioni = new Array(20);
		for (var i = 0; i < data.length; i++) {
			alti[i]    = data[i][3];
			medi[i]    = data[i][2];
			bassi[i]   = data[i][1];
			regioni[i] = data[i][0];
		};
		Highcharts.chart( "graficoPrezzo"+geo, {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: ""
		    },
		    xAxis: {
		        categories: regioni		
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Percentuale(%)'
		        }
		    },
		    tooltip: {
		        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
		        shared: true
		    },
		    plotOptions: {
		        column: {
		            stacking: 'percent'
		        }
		    },
		    series: [{
		    	name : "Fascia Alta",
		        data: alti
		    }, {
		        name : "Fascia Media",
		        data: medi
		    },
		    {
		    	name : "Fascia Bassa",
		        data: bassi
		    }],

		});
	});
}
// getJSON per la creazione del grafico qualita-prezzo
function crea_grafico_qualita(geo){
	$.getJSON("api/qualita.php?geo="+geo, function(data){
		var Eccellente = new Array(20);
		var Pessimo = new Array(20)
		var regioni = new Array(20);
		for (var i = 0; i < data.length; i++) {
			regioni[i]    = data[i][0]
			Eccellente[i] = data[i][1];	
			Pessimo[i] = data[i][2]
		};
		Highcharts.chart("graficoQualitaMaggiore"+geo, {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'ECCELLENTE'
		    },
		    xAxis: {
		        categories: regioni
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Percentuale(%)'
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		        useHTML: true
		    },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    series: [{
		        name: 'Eccellente',
		        data: Eccellente

		    }]
		});
		Highcharts.chart("graficoQualitaPeggiore"+geo, {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'PESSIMO'
		    },
		    xAxis: {
		        categories: regioni
		    },
		    yAxis: {
		        min: 0,
		        max: 1,
		        title: {
		            text: 'Percentuale(%)'
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		        useHTML: true
		    },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    series: [{
		        name: 'Pessimo',
		        data: Pessimo

		    }]
		});
		
	});
}
// getJSON per la creazione del grafico a torta delle categorie
function crea_grafico_categorie_tot(geo){
	$.getJSON("api/categorie_tot.php?geo="+geo, function(data){
		Highcharts.chart('graficoCategorie'+geo, {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie'
		    },
		    title: {
		        text: ''
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true,
		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                style: {
		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                }
		            }
		        }
		    },
		    series: [{
		        name: 'Brands',
		        colorByPoint: true,
		        data: data
		    }]
		});
		
	});
}

// getJSON per la creazione della classifica
function crea_classifica(){
	$("classifica").empty();
	$.getJSON("api/classifica.php", function(data){
		var posizione = 1;
		for(var i = 0; i <data.length; i++){
			if (i==0){
				$('#gapName1').append('<h3 class="RistotantiPodio">'+data[i][0]+'</h3>');
				$('#gapName1').append("<img id='vincitore' src='img/medal.png' alt='medaglia' >");
				$('#gapTooltip2').append('<h3 class="nomeRistorante">'+data[i][0]+'<span class="citta">'+data[i][1]+'</span></h3>');
				$('#gapTooltip2').append('<ul class="listaValori"><li>Rating:<span class="dato">'+data[i][2]+' su 5</span></li><li>Numero Recensioni:<span class="dato">'+data[i][3]+'</span></li><li>Servizio:<span class="dato">'+data[i][4]+' su 50</span></li><li>Cucina:<span class="dato">'+data[i][5]+' su 50</span></li></ul>');
				posizione = posizione + 1;
			}
			if (i == 1){
				$('#gapName2').append('<h3 class="RistotantiPodio">'+data[i][0]+'</h3>');
				$('#gapTooltip1').append('<h3 class="nomeRistorante">'+data[i][0]+'<span class="citta">'+data[i][1]+'</span></h3>');
				$('#gapTooltip1').append('<ul class="listaValori"><li>Rating:<span class="dato">'+data[i][2]+' su 5</span></li><li>Numero Recensioni:<span class="dato">'+data[i][3]+'</span></li><li>Servizio:<span class="dato">'+data[i][4]+' su 50</span></li><li>Cucina:<span class="dato">'+data[i][5]+' su 50</span></li></ul>');
				posizione = posizione + 1;
			}
			if (i == 2) {
				$('#gapName3').append('<h3 class="RistotantiPodio">'+data[i][0]+'</h3>');
				$('#gapTooltip3').append('<h3 class="nomeRistorante">'+data[i][0]+'<span class="citta">'+data[i][1]+'</span></h3>');
				$('#gapTooltip3').append('<ul class="listaValori"><li>Rating:<span class="dato">'+data[i][2]+' su 5</span></li><li>Numero Recensioni:<span class="dato">'+data[i][3]+'</span></li><li>Servizio:<span class="dato">'+data[i][4]+' su 50</span></li><li>Cucina:<span class="dato">'+data[i][5]+' su 50</span></li></ul>');
				posizione = posizione + 1;
			}
			if(i>2){
				$('#lista_fuoriPodio').append("<li><span class='posizione'>"+posizione+"</span>"+data[i][0]+"<span class='cittaNo'>"+data[i][1]+"</span></li>");
				posizione = posizione + 1;
			}


		}
	});
}
// getJSON per la creazione del grafico categori Nord-Centro-Sud
function creaGraficoCategorieNCS(){
	$("datiGraf").empty();
	var categoria = this.id;
	$.getJSON("api/categorie_NCS.php?categoria="+categoria, function(data){
		Highcharts.chart('datiGraf', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: ''
		    },
		    xAxis: {
		        categories: ""
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Percentuale(%)'
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		        useHTML: true
		    },
			plotOptions: {
			    series : {
			        pointPadding : 0.2
			    }
			},
		    series: data

	
		});
	});
}

// getJSON per la ricerca del nome
function eseguiRicercaNome(){
	$("#risultatiRicerca").empty();
	var nome = document.getElementById("inputNome").value;
	$.getJSON(("api/ricerca_nome.php?nome=\"%"+nome+"%\"&regione=\""+regione+"\""), function(data){
		//se la query non produce risultati stampa errore
		if(data == null){
			$('#risultatiRicerca').append("<h4 id='msgError'>Non ci sono Ristoranti con questo nome! </br>Hai selezionato la Regione e controllato il Nome?</h4>");
		}else{
			for(var i = 0; i <data.length; i++){
				$('#risultatiRicerca').append("<div class='cittaRisultato col4 cittaNome' id="+data[i][0]+"><h4>"+data[i][0]+"<span class='indirizzo citta'>"+data[i][1]+"-"+data[i][2]+"</span></h4><ul><li>Num.Rec:<span class='valNome'>"+data[i][3]+"</span></li><li>Giudizio:<span class='valNome'>"+data[i][4]+"</span></li><li>Prezzo:<span class='valNome'>"+data[i][5]+"</span></li></div>");	
			}
		}
	});
}	
// getJSON per la ricerca con più opzioni
function eseguiRicercaOpzioni(categorie, prezzo, voto_max, voto_min, regione){
	//ogni categoria è un elemento dell'array
	var pesce = categorie[0];
	var pizza= categorie[1];
	var fastfood = categorie[2];
	var vegetariano = categorie[3];
	var glutine = categorie[4];
	var asiatico= categorie[5];
	var arrayCitta = new Array()
	$.getJSON(("api/ricerca_opzioni.php?pesce="+pesce+"&pizza="+pizza+"&fastfood="+fastfood+"&vegetariano="+vegetariano+"&glutine="+glutine+"&asiatico="+asiatico+"&prezzo="+prezzo+"&max="+voto_max+"&min="+voto_min+"&regione=\""+regione+"\""), function(data){
		//se la query non produce risultati stampa errore
		if (data == null){
			$('#risultatiRicerca').append("<h4 id='msgError'>Non ci sono Ristoranti con queste caratteristiche!</br>Prova a cambiarle!</h4>");
		}else{
			// scandisco l'array risultato della quesry e appendo solo la striga relativa alla città
			for(var i = 0; i <data.length; i++){
				arrayCitta.push(data[i][1]);
			}
			// elimino i duplicati dall'array contenente tutte le città
			var listaUnicaCitta = jQuery.unique(arrayCitta);
			// setto conta a 0
			var conta = 0;
			// scandisco la lista con tutte le citta(uniche)
			for (var j = 0; j < listaUnicaCitta.length; j++){
				conta = 0;
				//scandoisco nuovamente tutto il risultato della query
				for(var i = 0; i<data.length;i++){
					// se la citta in unica è uguale a quella dell'elemento che sto controllando aumento conta di uno
					if(listaUnicaCitta[j] == data[i][1]){
						conta++;
					}
				}
				// appendo all'html un div con il nome della citta e il numero di ritosranti in quella città(=conta)
				$('#risultatiRicerca').append("<div class='cittaRisultato col4' id="+listaUnicaCitta[j]+"><h4>"+listaUnicaCitta[j]+"<span>("+conta+")</span></h4>");
			}
			// scandisco array risultato della query e appendo al div con id citta precedentemente creato il ristorante che ha come citta quella uguale all'id del div padre
			for(var i = 0; i <data.length; i++){
				$('#'+data[i][1]).append("<div class='singolaCitta nascosto'><p>"+data[i][0]+"<span class='indirizzo'>"+data[i][2]+"</span></p><ul><li>Num.Rec:<span class='valNome'>"+data[i][3]+"</span></li><li>Giudizio:<span class='valNome'>"+data[i][4]+"</span></li><li>Prezzo:<span class='valNome'>"+data[i][5]+"</span></li></div>");	
			}
		}
		
	});

}