//ROTTE
//Agadez -> Dirkou -> Sabha -> Tripoli
//Agadez -> Arlit -> Tamanrasset -> Maghnia/Melilla
//Bamako -> Gao -> Agadez

export let listaCitta=[
	{
		nome:"Agadez",
		pos:[.34,.365],
		descrizione:"Descrizione della città",
		partenza:true,
		arrivo:false,
		cittaRaggiungibili:["Arlit","Dirkou","Gao"]
	},
	{
		nome:"Dirkou",
		pos:[.38,.33],
		descrizione:"Descrizione della città",
		partenza:true,
		arrivo:false,
		cittaRaggiungibili:["Sabha","Agadez"]
	},
	{
		nome:"Sabha",
		pos:[.45,.25],
		descrizione:"Descrizione della città",
		partenza:false,
		arrivo:false,
		cittaRaggiungibili:["Tripoli","Dirkou"]
	},
	{
		nome:"Tripoli",
		pos:[.445,.18],
		descrizione:"Descrizione della città",
		partenza:false,
		arrivo:true,
		cittaRaggiungibili:["Sabha"]
	},
	{
		nome:"Arlit",
		pos:[.32,.33],
		descrizione:"Descrizione della città",
		partenza:false,
		arrivo:false,
		cittaRaggiungibili:["Tamanrasset","Agadez"]
	},
	{
		nome:"Gao",
		pos:[.26,.34],
		descrizione:"Descrizione della città",
		partenza:false,
		arrivo:false,
		cittaRaggiungibili:["Bamako","Agadez"]
	},
	{
		nome:"Tamanrasset",
		pos:[.315,.30],
		descrizione:"Descrizione della città",
		partenza:false,
		arrivo:false,
		cittaRaggiungibili:["Maghnia","Melilla","Arlit"]
	},
	{
		nome:"Maghnia",
		pos:[.28,.125],
		descrizione:"Descrizione della città",
		partenza:false,
		arrivo:true,
		cittaRaggiungibili:["Tamanrasset"]
	},
	{
		nome:"Melilla",
		pos:[.3,.125],
		descrizione:"Descrizione della città",
		partenza:false,
		arrivo:true,
		cittaRaggiungibili:["Tamanrasset"]
	},
	{
		nome:"Bamako",
		pos:[.2,.39],
		descrizione:"Descrizione della città",
		partenza:true,
		arrivo:false,
		cittaRaggiungibili:["Gao"]
	}
]

//PERCORSO
export let percorso=[]

//IMPREVISTI
