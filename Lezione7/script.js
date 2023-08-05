import {  confermaOrigine, confermaRiepilogo, footer, riprendiMovimento, setupMap } from "./mappa/map.js"

//GAME STATE
//pagine
let paginaSplash = document.getElementById("splash")
let paginaMenu = document.getElementById("menu")
let paginaMappa = document.getElementById("mappa")
// let paginaFinale = document.getElementById("finale")

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

//ROTTE
//Agadez -> Dirkou -> Sabha -> Tripoli
//Agadez -> Arlit -> Tamanrasset -> Maghnia/Melilla
//Bamako -> Gao -> Agadez
function setupSchermataMappa(){
	setupMap([
		{
			nome:"Agadez",
			pos:[.34,.365]
		},
		{
			nome:"Dirkou",
			pos:[.38,.33]
		},
		{
			nome:"Sabha",
			pos:[.45,.25]
		},
		{
			nome:"Tripoli",
			pos:[.445,.18]
		},
		{
			nome:"Arlit",
			pos:[.32,.33]
		},
		{
			nome:"Gao",
			pos:[.26,.34]
		},
		{
			nome:"Tamanrasset",
			pos:[.315,.30]
		},
		{
			nome:"Maghnia",
			pos:[.28,.125]
		},
		{
			nome:"Melilla",
			pos:[.3,.125]
		},
		{
			nome:"Bamako",
			pos:[.2,.39]
		}
	])
	
	window.addEventListener("clickorigine",ev=>{
		console.log(ev.detail)
		footer.innerHTML=""
	
		let testo=document.createElement("p")
		testo.innerHTML="Hai selezionato "+ev.detail.nome
		footer.append(testo)
	
		let bottone=document.createElement("button")
		bottone.innerHTML="conferma"
		footer.append(bottone)
		bottone.addEventListener("click",event=>{
			confermaOrigine(ev.detail.nome)
		})
	})
	
	window.addEventListener("imprevisto",ev=>{
		console.log(ev.detail)
		footer.innerHTML=""
		let bottone=document.createElement("button")
		bottone.innerHTML="Reagisci a Imprevisto"
		footer.append(bottone)
		bottone.addEventListener("click",ev=>{
			riprendiMovimento()
		})
	})
	
	window.addEventListener("riepilogo",ev=>{
		console.log(ev.detail)
		footer.innerHTML=""
		let bottone=document.createElement("button")
		bottone.innerHTML="Prossima tappa"
		bottone.addEventListener("click",ev=>{
			confermaRiepilogo()
		})
		footer.append(bottone)
	})

}
