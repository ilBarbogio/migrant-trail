import { confermaObiettivo, confermaOrigine, confermaRiepilogo, footer, riprendiMovimento, setupMap } from "./mappa/map.js"
import { listaCitta, percorso } from "./scripts/citta.js"

//GAME STATE
//pagine
let paginaSplash = document.getElementById("splash")
let paginaMenu = document.getElementById("menu")
let paginaMappa = document.getElementById("mappa")
let paginaFinale = document.getElementById("finale")

let paginaCorrente = "splash"

//bottoni
let bottoneMenuGioca = document.getElementById("bottone-menu-gioca")
let bottoneGiocoQuit = document.getElementById("bottone-gioco-quit")

//LOGICA: quando la pagina splash ha finito la sua animazione
paginaSplash.addEventListener("animationend",(evento)=>{
	//nascondiamo la pagina splash e mostriamo la pagina menu
	paginaSplash.classList.add("nascosta")
	paginaMenu.classList.remove("nascosta")
	paginaCorrente="menu"
})

//LOGICA: quando clicco sul bottone apposito del menu, passo
//alla schermata di gioco
bottoneMenuGioca.addEventListener("click",(evento)=>{
	paginaMenu.classList.add("nascosta")
	paginaMappa.classList.remove("nascosta")
	setupSchermataMappa()
	paginaCorrente="mappa"
})

//LOGICA: quando clicco sul bottone apposito nel gioco, torno al menu
bottoneGiocoQuit.addEventListener("click",(evento)=>{
	paginaMappa.classList.add("nascosta")
	paginaMenu.classList.remove("nascosta")
	paginaCorrente="menu"
})

let cittaRaggiungibili=[]
function setupSchermataMappa(){

	setupMap(listaCitta)
	
	window.addEventListener("clickorigine",ev=>{
		console.log(ev.detail)//questo contiene la città che ptorebbe diventare la nostra città di origine

		cittaRaggiungibili=ev.detail.cittaraggiungibili.split(",")

		let popup=document.getElementById("popup-gioco")
		popup.innerHTML=""

		let testo=document.createElement("p")
		testo.innerHTML="Hai selezionato "+ev.detail.nome
		popup.append(testo)

		if(ev.detail.partenza == "true"){
			let bottone=document.createElement("button")
			bottone.innerHTML="conferma"
			popup.append(bottone)
			bottone.addEventListener("click",event=>{
				percorso.push(ev.detail.nome)
				popup.classList.remove("visibile")
				confermaOrigine(ev.detail.nome)
			})
		}else{
			let testoNonSelezionabile=document.createElement("p")
			testoNonSelezionabile.innerHTML="Non puoi partire da "+ev.detail.nome
			popup.append(testoNonSelezionabile)
		}

		let bottoneAnnulla=document.createElement("button")
		bottoneAnnulla.innerHTML="cambia città"
		popup.append(bottoneAnnulla)
		bottoneAnnulla.addEventListener("click",event=>{
			popup.classList.remove("visibile")
		})

		popup.classList.add("visibile")


	})

	window.addEventListener("clickobiettivo",ev=>{
		console.log(ev.detail)//questo contiene solo la città che potrebbe diventare quella di arrivo

		let popup=document.getElementById("popup-gioco")
		popup.innerHTML=""

		let testo=document.createElement("p")
		testo.innerHTML="Hai selezionato "+ev.detail.nome
		popup.append(testo)

		if(!cittaRaggiungibili.includes(ev.detail.nome)){
			let testo2=document.createElement("p")
			testo2.innerHTML="Non puoi raggiungere direttamente questa città"
			popup.append(testo2)
		}else{
			let bottoneConferma=document.createElement("button")
			bottoneConferma.innerHTML="conferma obiettivo"
			popup.append(bottoneConferma)
			bottoneConferma.addEventListener("click",event=>{
				popup.classList.remove("visibile")
				confermaObiettivo(ev.detail.nome)
			})
		}

		let bottoneAnnulla=document.createElement("button")
		bottoneAnnulla.innerHTML="cambia città"
		popup.append(bottoneAnnulla)
		bottoneAnnulla.addEventListener("click",event=>{
			popup.classList.remove("visibile")
		})

		popup.classList.add("visibile")
	})
	
	window.addEventListener("imprevisto",ev=>{
		console.log(ev.detail)
		footer.innerHTML=""

		let popup=document.getElementById("popup-gioco")
		popup.innerHTML=""

		let bottone=document.createElement("button")
		bottone.innerHTML="Reagisci a Imprevisto"
		popup.append(bottone)
		bottone.addEventListener("click",ev=>{
			popup.classList.remove("visibile")
			riprendiMovimento()
		})

		popup.classList.add("visibile")
	})
	
	window.addEventListener("riepilogo",ev=>{
		console.log(ev.detail)//questo contiene sia partenza che arrivo
		percorso.push(ev.detail.arrivo.nome)
		cittaRaggiungibili=ev.detail.arrivo.cittaraggiungibili.split(",")
		console.log(percorso)

		let popup=document.getElementById("popup-gioco")
		popup.innerHTML=""

		let testo=document.createElement("p")
		testo.innerHTML="Sei arrivato a "+ev.detail.arrivo.nome+" partendo da "+ev.detail.partenza.nome
		popup.append(testo)

	
		let bottoneConferma=document.createElement("button")
		bottoneConferma.innerHTML="Prossima tappa"
		bottoneConferma.addEventListener("click",event=>{
			popup.classList.remove("visibile")
			confermaRiepilogo()
		})
		popup.append(bottoneConferma)

		popup.classList.add("visibile")
	})

}

//righe per avviare subito dalla pagina di gioco: cancellarle per avere un ciclo normale a partire dallo splash screen
paginaSplash.classList.add("nascosta")
paginaMenu.classList.add("nascosta")
paginaMappa.classList.remove("nascosta")
setupSchermataMappa()
paginaCorrente="mappa"