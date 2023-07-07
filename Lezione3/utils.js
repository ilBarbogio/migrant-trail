export function elementoPerClasse(classe){
	return document.querySelector("."+classe)
}
export function elementoPerId(id){
	return document.getElementById(id)
}

export function aggiungiClasse(elemento,classe){
	elemento.classList.add(classe)
}
export function togliClasse(elemento,classe){
	elemento.classList.remove(classe)
}
export function haClasse(elemento,classe){
	return elemento.classList.contains(classe)
}

/**
 * Attiva un "listener" per i click del mouse ed esegue una funzione
 * @param {*} elemento elemento sul quale "ascoltare" i click
 * @param {*} handler funzione da eseguire, riceve due parametri: l'elemento e l'evento
 */
export function ascoltaClick(elemento,handler){
	elemento.addEventListener("click",(ev)=>{
		handler(ev.target,ev)
	})
}

/**
 * Attiva un "listener" per l'inizio di un'animazione ed esegue una funzione
 * @param {*} elemento elemento sul quale "ascoltare" l'inizio animazione
 * @param {*} handler funzione da eseguire, riceve due parametri: il nome dell'animazione e l'evento
 */
export function ascoltaInizioAnimazione(elemento,handler){
	elemento.addEventListener("animationstart",(ev)=>{
		handler(ev.animationName,ev)
	})
}

/**
 * Attiva un "listener" per la fine di un'animazione ed esegue una funzione
 * @param {*} elemento elemento sul quale "ascoltare" la fine animazione
 * @param {*} handler funzione da eseguire, riceve due parametri: il nome dell'animazione e l'evento
 */
export function ascoltaFineAnimazione(elemento,handler){
	elemento.addEventListener("animationend",(ev)=>{
		handler(ev.animationName,ev)
	})
}