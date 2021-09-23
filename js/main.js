$(document).ready(function(){
	//lib OWL-carousel
	owl = $(".owl-carousel").owlCarousel({
		items	: 1,
		nav : true,
		navText: ["<div class='ita_btn btn' locality='IT'>Italia</div>","<div class='ue_btn btn' locality='UE'>Europa</div>"]
	});
	owl1 = $(".owl-carousel1").owlCarousel({
		items	: 1,
		nav : true,
		navText: ["<div class='ita_btn btn' locality='IT'>Migliore</div>","<div class='ue_btn btn' locality='UE'>Peggiore</div>"]
	});
	//gestore per ogni tipo di evento che genera un cambiamento (in questo caso sarà un click) su elementi generati dalla libreria owl.carousel
	owl.on('changed.owl.carousel', contolloLoc());
	// effetti lib -WOW
	var wow = new WOW(
		{
		    boxClass: 'wow',      // animated element css class (default is wow)
		 }
	);
	wow.init();
	// click
	$('.btn').click(contolloLoc);
	$('.categoryBackground').click(creaCategorie);
	$('#indietro').click(creaCategorie);
	$('#pesce').click(creaGraficoCategorieNCS);
	$('#pizza').click(creaGraficoCategorieNCS);
	$('#fastfood').click(creaGraficoCategorieNCS);
	$('#vegetariano').click(creaGraficoCategorieNCS);
	$('#glutine').click(creaGraficoCategorieNCS);
	$('#asiatico').click(creaGraficoCategorieNCS);
	// hover
	$('#gapName1').click(creaTooltip);
	$('#gapName2').click(creaTooltip);
	$('#gapName3').click(creaTooltip);
	// creo classifica
	crea_classifica();
});

function contolloLoc(owl){
	geo = $(this).attr("locality"); // italia - europa
	/*geo inizialmente sarà undefined, per far si che il grafico venga disegnato non appena parte la pagina controlliamo il valore e poi lo settiamo a IT
	successivamente prendera IT o UE in automatico */
	if(geo==undefined){
		geo = "IT";
	}
	crea_grafico_percentuale_prezzo(geo);
	crea_grafico_qualita(geo);
	crea_grafico_categorie_tot(geo);
}

function creaCategorie(){
	$('#button').toggleClass("nascosto");
	$('#datiCat').toggleClass("nascosto");
	if(this.id != "indietro"){
		$('#datiCat').append("<h2 id='datiTitolo'>"+this.id+"</h2>");
		$('#datiCat').append("<p id='datiPar'>"+contenutiNascosti[$(this).closest('.contentCategory').attr('id')].descrizione+"</p>");
	}else{
		$('#datiTitolo').remove();
		$('#datiPar').remove();
	}
}
function creaTooltip(){
	if (this.id == "gapName1"){
		$('#gapTooltip2').toggleClass("vedi");
	}
	if (this.id == "gapName2"){
		$('#gapTooltip1').toggleClass("vedi");
	}
	if (this.id == "gapName3"){
		$('#gapTooltip3').toggleClass("vedi");
	}
}
// oggetto con contenuti che si generano per le caregorie relative
var contenutiNascosti=[
	{
		cat: "pesce",
		descrizione:"<a class='fonte' href='http://www.nonsprecare.it/cresce-il-consumo-di-pesce-in-italia'>Studi rivelano</a> come il consumo di pesce in Italia sia aumentato: ogni italiano consuma in media 24,5kg di pesce </br>l&#180;anno. <br/>La maggior concentrazione di ristoranti che si dedicano alla cucina dei prodotti ittici si trova chiaramente al SUD, sia per la maggior disponibilit&#224; del pescato sia per la richiesta del turista. Di conseguenza la domanda cala al Nord, che si colloca all&#180;ultimo posto con la minor percentuale di ristoranti in questo ambito. Tuttavia il dislivello non &#232; cos&#236; rilevante, infatti <a class='fonte' href='http://www.repubblica.it/sapori/2017/10/18/news/milano_new_york_times_la_incorona_regina_cucina_di_mare-178608878/'>fonti attestano</a> come il pesce sia un gran protagonista anche a Milano, che &#232; storicamente la pi&#249; grossa piattaforma di arrivo e smercio del pesce."
	},
	{
		cat: "pizza",
		descrizione:"La pizza, pietanza originaria della cucina napoletana, &#232; il piatto tricolore pi&#249; famoso nel mondo e ne vengono vendute addirittura 56milioni di pezzi a settimana. </br>La maggior parte delle pizzerie italiane si trovano al SUD ma i <a class='fonte' href='http://www.repubblica.it/economia/rapporti/osserva-italia/conad/2015/02/02/news/pizza_business_made_in_italy_un_fatturato_da_tre_miliardi-106350763/'>dati ci confermano</a> come i locali che offrono pizza sono piuttosto ben distribuiti nel nostro Paese. <br/> <a class='fonte' href='https://www.ilforchettiere.it/pizze-del-nord-e-sud-differenze/'>Al Sud si usa pi&#249; farina che al Nord</a>, la tipica pizza napoletana &#232; pi&#249; morbida di quella biscottata del settentrione e gli ingredienti e i tempi di cottura possono variare ma la pizza resta comunque uno dei vanti e dei simboli del nostro Stivale."
	},
	{
		cat: "fastfood",
		descrizione:"La tradizione del Fast-Food affonda le sue radici nel continente nordamericano ma si &#232; diffusa molto rapidamente, divenendo una moda in ogni angolo del mondo. </br> <a class='fonte' href='http://www.ristorazioneitalianamagazine.it/street-food-25-miliardi-clienti-al-giorno/'>Dati rivelano</a> come la pi&#249; alta concentrazione di Fast-Food in Italia si abbia al SUD, quasi ex aequo col Centro, mentre per ultimo il Nord. Da un lato &#232; possibile giustificare questi risultati pensando all&#180;economicit&#224; di questi piatti, pi&#249; accessibili a quella parte di popolazione con un reddito pi&#249; basso. D&#180;altra parte l&#180;esito pu&#242; stupire pensando alla vita frenetica dei lavoratori del nord-Italia, che necessiterebbero maggiormente di cibo pratico e veloce."
	},
	{
		cat: "vegetariano",
		descrizione:"La tradizione italiana &#232; ricca di piatti a base di verdure, legumi e cereali, che sono le fondamenta della nostra alimentazione. Molti sono oggi i ristoranti che comprendono questo senso e da nord a sud si nota una distesa di locali &#8220;<a class='fonte' href='https://www.vegolosi.it/news/ristoranti-vegetariani-e-vegani-in-italia-sempre-piu-numerosi/'>Green-friendly&#8221;</a>. <br/>La pi&#249; <a class='fonte' href='http://www.repubblica.it/sapori/2018/04/05/news/da_roma_a_palermo_ristoranti_vegani_centro_sud_italia-190662330/'>alta concentrazione</a> di ristoranti vegetariani si riscontra al CENTRO, subito seguito dal Nord mentre la minima si registra al Sud. <br/>&#200; quindi dal Lazio in su che si presta maggior attenzione alla ristorazione bio e si attesta la maggior concentrazione di vegetariani."
	},
	{
		cat:"glutine",
		descrizione:"<a class='fonte' href='http://www.rainews.it/dl/rainews/articoli/glutine-6-milioni-di-italiani-celiaci-per-moda-gli-esperti-escludere-il-glutine-se-non-si-e-malati-e-inutile-406ec349-23a3-493a-97e6-1a8983acbe6e.html'>Ricerche dimostrano</a> come in Italia il 70% dei celiaci non sa di avere questo problema mentre il 99% della popolazione non celiaca si appassiona alla vita &#8220;Gluten-free&#8221;. Celiaci per moda? Il mercato &#8220;no-glutine&#8221; &#232; in ascesa.<br/>Il maggior numero di ristoranti che offrono questo servizio si colloca al CENTRO, subito seguito dal Sud-Italia mentre all&#180;ultimo posto il Nord. Un risultato che stupisce dato che si trova al Nord la pi&#249; <a class='fonte' href='http://www.bergamopost.it/occhi-aperti/la-mappa-della-celiachia-italia/'>alta densit&#224;</a> celiaca. Tuttavia studi dimostrano come fra le regioni pi&#249; interessate alla questione &#8220;Gluten-free&#8221; vi siano Toscana e Sardegna, giustificando la posizione assunta dal Centro."
	},
	{
		cat:"asiatico",
		descrizione:"La nuova moda che sta spopolando fra i giovani -e non solo- &#232; <a class='fonte' href='https://www.tgtourism.tv/2017/07/sushi-salute-italia-39637/'>il sushi</a>. </br>Il maggior numero di ristoranti si attesta al NORD e ricerche dimostrano come il massimo consumo si abbia a Milano, con il 18% di prodotto ordinato. Scendendo la classifica si trova Napoli, infatti &#232; al sud che si registra la minor percentuale di ristoranti dedicati al cibo asiatico. </br>&#200; possibile giustificare questi dati pensando alla tradizione: da sempre &#232; noto come il sud-Italia sia maggiormente legato alle proprie radici e alla propria cultura, mentre il nord sia pi&#249; incline alle novit&#224; e alla contaminazione delle culture."
	}
];