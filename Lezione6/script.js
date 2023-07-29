import {  confermaOrigine, confermaRiepilogo, footer, riprendiMovimento, setupMap } from "./mappa/map.js"

setupMap([
	{
		nome:"città1",
		pos:[.5,.5]
	},
	{
		nome:"città2",
		pos:[.65,.25]
	},
	{
		nome:"città3",
		pos:[.25,.25]
	}
])

window.addEventListener("clickorigine",ev=>{
	console.log(ev.detail)
	
})

window.addEventListener("imprevisto",ev=>{
	console.log(ev.detail)
	
})

window.addEventListener("riepilogo",ev=>{
	console.log(ev.detail)
	
})