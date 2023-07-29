//GAME STATE
//pagine
let paginaSplash = document.getElementById("splash")
let paginaMenu = document.getElementById("menu")
let paginaGioco = document.getElementById("gioco")
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
	paginaGioco.classList.remove("nascosta")
	paginaCorrente="gioco"
})

//LOGICA: quando clicco sul bottone apposito nel gioco, torno al menu
bottoneGiocoQuit.addEventListener("click",(evento)=>{
	paginaGioco.classList.add("nascosta")
	paginaMenu.classList.remove("nascosta")
	paginaCorrente="menu"
})