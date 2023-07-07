/**
 * Recupera il primo elmento con la classe specificata, ritorna l'elemento
 * @param {*} classe stringa
 * @returns 
 */
export function elementoPerClasse(classe){
	return document.querySelector("."+classe)
}
/**
 * Recupera l'elemento della pagina con l'id specificata, ritorna l'elemento
 * @param {*} id stringa
 * @returns 
 */
export function elementoPerId(id){
	return document.getElementById(id)
}

/**
 * Aggiunge una classe ad un elemento
 * @param {*} elemento elemento al quale aggiungere
 * @param {*} classe classe da aggiungere, stringa
 */
export function aggiungiClasse(elemento,classe){
	elemento.classList.add(classe)
}
/**
 * Toglie una classe da un elemento
 * @param {*} elemento elemento al quale togliere
 * @param {*} classe classe da togliere, stringa
 */
export function togliClasse(elemento,classe){
	elemento.classList.remove(classe)
}
/**
 * Verifica se un elemento ha una classe, ritorna un booleano
 * @param {*} elemento elemento sul quale verificare
 * @param {*} classe classe da cercare
 */
export function haClasse(elemento,classe){
	return elemento.classList.contains(classe)
}

/**
 * Modifica il valore di una classe css
 * @param {*} nome nome della variabile, stringa
 * @param {*} valore valore della variabile, stringa (o numero)
 */
export function impostaVariabileCss(nome,valore){
	document.body.style.setProperty(nome,valore)
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