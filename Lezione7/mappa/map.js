/**
 * DESCRIZIONE MAP LOOP
 * Quando la mappa viene avviata, con setupMap(citta), la fase è impostata a "scelta-origine"
 * 
 * In questa fase, cliccare su qualsiasi città emette un evento "clickorigine" che
 * possiamo usare per mostrare le informazioni e un tasto per confermare, che deve
 * chiamare la funzione confermaOrigine(). L'evento contiene, nel campo
 * detail, il nome della città cliccata
 * 
 * Cliccando su una città durante "scelta-obiettivo", si avvia il movimento, durante
 * il quale, circa a metà percorso, potrebbe avvenrie un imprevisto
 * 
 * Quando avviene un imprevisto, viene emesso un evento "imprevisto", che possiamo
 * usare per creare e mostrare l'imprevisto. Sarà necessario un bottone che chiama
 * impostaFase("movimento") per completare la tappa. L'evento contiene, nel campo
 * detail, il nome delle città di partenza e di arrivo
 * 
 * Dopo aver reagito all'imprevisto, il movimento viene completato. All'arrivo nella
 * città di destinazione viene emesso un evento "riepilogo", che possiamo usare
 * per mostrare un riassunto della tappa. Sarà necessario un bottone che chiami la
 * funzione confermaRiepilogo() per avviare nuovamente la fase di scelta della prossima
 * tappa.
 */

/**
 * FUNZIONI ESPOSRTATE
 * Questo modulo esporta diverse funzioni ed elementi per interagire con la mappa
 * 
 * setupMap(citta) --> crea la mappa e posiziona le città che passate come array
 * ogni elemento dell'array deve contentere un oggetto con almeno queste proprietà
 * {nome: stringa, pos: array[numero, numero]}
 * i due numeri sono coordinate normalizzate (vanno da 0 a 1 per coprire tutta la mappa)
 * 
 * header e footer --> elementi sopra e sotto la mappa, dove mettere informazioni utili
 * 
 * probabilitaImprevisto --> quanto è probabile che capiti un imprevisto durante il
 * movimento
 * 
 * impostaVel --> velocità di movimento della pedina (usare con cautela! 0.05 è un
 * buon valore)
 * 
 * confermaOrigine() --> conferma la scelta della città di origine (vedi LOOP)
 * 
 * riprendiMovimento() --> riprende a muovere la pedina dopo un imprevisto (vedi LOOP)
 * 
 * confermaRiepilogo() --> riavvia il ciclo dalla scelta del prossimo obiettivo (vedi LOOP)
 */

let mappaUrl="../assets/africa.jpg"

let contenitore,mappa,pedina
export let header,footer
let dims,listaCitta
export let probabilitaImprevisto=.2

let fase//"pausa"|"scelta-origine"|"scelta-obiettivo"|"movimento"|"imprevisto"|"riepilogo"
let cittaOrigine, cittaPartenza, cittaArrivo

let oldTime,oldDistance,passatoImprevisto,tolerance
export let vel

export function setupMap(citta){
	//DOM
	contenitore=document.getElementById("contenitore-mappa")
	
	header=document.createElement("div")
	header.id="mappa-header"
	header.innerHTML="HEADER"
	contenitore.append(header)

	mappa=document.createElement("img")
	mappa.id="mappa-africa"
	const comp=getComputedStyle(mappa)
	contenitore.append(mappa)

	footer=document.createElement("div")
	footer.id="mappa-footer"
	footer.innerHTML="FOOTER"
	contenitore.append(footer)

	//fase
	impostaFase("scelta-origine")

	mappa.addEventListener("load",ev=>{
		//Data
		dims=[parseFloat(comp.width),parseFloat(comp.height)]
		//citta
		listaCitta=[]
		for(let c of citta) creaCitta(c)
	})
	mappa.src=mappaUrl
	
	impostaVel(.05)
}

export function impostaVel(valore){
	vel=valore
	tolerance=vel*.5
}

function creaPedina(x,y){
	pedina=document.createElement("div")
	pedina.id="pedina"
	pedina.setAttribute("data-x",x)
	pedina.setAttribute("data-y",y)
	contenitore.append(pedina)
	posizionaPedina(pedina)
}

function posizionaPedina(x,y){
	if(pedina!=undefined){

		if(x!=undefined && y!=undefined){
			pedina.setAttribute("data-x",x)
			pedina.setAttribute("data-y",y)
		}
		pedina.style.left=(pedina.getAttribute("data-x")*dims[0]-5)+"px"
		pedina.style.top=(pedina.getAttribute("data-y")*dims[1]-20)+"px"
	
	}
}


function creaCitta(c){
	let [x,y]=[...c.pos]
	let citta=document.createElement("div")
	citta.classList.add("city")
	citta.setAttribute("data-nome",c.nome)
	citta.setAttribute("data-x",x)
	citta.setAttribute("data-y",y)
	citta.setAttribute("data-descrizione",c.descrizione)
	citta.setAttribute("data-partenza",c.partenza)
	citta.setAttribute("data-arrivo",c.arrivo)
	citta.setAttribute("data-cittaraggiungibili",c.cittaRaggiungibili)
	if(c.partenza == true) citta.classList.add("partenza")
	else if(c.arrivo == true) citta.classList.add("arrivo")
	posizionaCitta(citta)
	contenitore.append(citta)
	listaCitta.push(citta)

	citta.addEventListener("click",ev=>{
		if(fase=="scelta-origine"){
			let datiCitta=ev.target.dataset
			let event=new CustomEvent("clickorigine",{detail:datiCitta})
			window.dispatchEvent(event)

		}else if(fase=="scelta-obiettivo"){
			if(cittaPartenza!=ev.target){
				let datiCitta=ev.target.dataset
				let event=new CustomEvent("clickobiettivo",{detail:datiCitta})
				window.dispatchEvent(event)
				
				// cittaArrivo=ev.target
				// let start=[parseFloat(pedina.getAttribute("data-x")),parseFloat(pedina.getAttribute("data-y"))]
				// let goal=[parseFloat(cittaArrivo.getAttribute("data-x")),parseFloat(cittaArrivo.getAttribute("data-y"))]
				// let vector=[goal[0]-start[0],goal[1]-start[1]]
				// let mod=Math.hypot(...vector)
				// oldDistance=mod
				// passatoImprevisto=false

				// oldTime=performance.now()
				// requestAnimationFrame(loop)
				// impostaFase("movimento")
			}
		}
	})
}

export function confermaOrigine(nome){
	let citta=listaCitta.find(el=>el.getAttribute("data-nome")==nome)
	if(citta){
		footer.innerHTML=""
		let origine=citta
		creaPedina(origine.getAttribute("data-x"),origine.getAttribute("data-y"))
		cittaOrigine=origine
		cittaPartenza=origine
		impostaFase("scelta-obiettivo")
	}
}

export function confermaObiettivo(obiettivo){
	cittaArrivo=document.querySelector("[data-nome="+obiettivo+"]")
	console.log(cittaArrivo)
	let start=[parseFloat(pedina.getAttribute("data-x")),parseFloat(pedina.getAttribute("data-y"))]
	let goal=[parseFloat(cittaArrivo.getAttribute("data-x")),parseFloat(cittaArrivo.getAttribute("data-y"))]
	let vector=[goal[0]-start[0],goal[1]-start[1]]
	let mod=Math.hypot(...vector)
	oldDistance=mod
	passatoImprevisto=false

	oldTime=performance.now()
	requestAnimationFrame(loop)
	impostaFase("movimento")
}

export function riprendiMovimento(){
	footer.innerHTML=""
	oldTime=performance.now()
	requestAnimationFrame(loop)
	impostaFase("movimento")
}

export function confermaRiepilogo(){
	cittaPartenza=cittaArrivo
	cittaArrivo=undefined
	oldDistance=undefined
	footer.innerHTML=""
	impostaFase("scelta-obiettivo")
}

function posizionaCitta(c){
	c.style.left=(c.getAttribute("data-x")*dims[0]-10)+"px"
	c.style.top=(c.getAttribute("data-y")*dims[1]-10)+"px"
}

function impostaFase(f){
	fase=f
	header.innerHTML="Fase corrente: "+f
	footer.innerHTML=""
	if(f=="imprevisto"){
		let detail={
			partenza:cittaPartenza.dataset,
			arrivo:cittaArrivo.dataset,
		}
		let event=new CustomEvent("imprevisto",{detail:detail})
		window.dispatchEvent(event)
	}else if(f=="riepilogo"){
		let detail={
			partenza:cittaPartenza.dataset,
			arrivo:cittaArrivo.dataset,
		}
		let event=new CustomEvent("riepilogo",{detail:detail})
		window.dispatchEvent(event)
	}
}

function loop(time){
	let delta=Math.max(time-oldTime,0)*.001
	oldTime=time
	if(cittaOrigine && cittaPartenza){
		let start=[parseFloat(pedina.getAttribute("data-x")),parseFloat(pedina.getAttribute("data-y"))]
		let goal=[parseFloat(cittaArrivo.getAttribute("data-x")),parseFloat(cittaArrivo.getAttribute("data-y"))]
		let vector=[goal[0]-start[0],goal[1]-start[1]]
		let mod=Math.hypot(...vector)
		if(mod>tolerance){
			posizionaPedina(start[0]+vel*delta*vector[0]/mod,start[1]+vel*delta*vector[1]/mod)
			if(!passatoImprevisto && Math.abs(mod/oldDistance-.5)<tolerance){
				if(Math.random()<probabilitaImprevisto){//"lancio una monetina" per vedere se capita l'imprevisto
					passatoImprevisto=true
					impostaFase("imprevisto")
				}
			}
			
		}else{
			posizionaPedina(...goal)
			impostaFase("riepilogo")
		}
	}
	if(fase=="movimento") requestAnimationFrame(loop)
}

window.addEventListener("resize",ev=>{
	const comp=getComputedStyle(mappa)
	dims=[parseFloat(comp.width),parseFloat(comp.height)]
	for(let c of listaCitta){
		posizionaCitta(c)
	}
	posizionaPedina()
})