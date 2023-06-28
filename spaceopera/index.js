const dims=400

const [canSky,ctxSky]=setupCanvas("canSky")
const [canBack,ctxBack]=setupCanvas("canBack")
const [canFore,ctxBFore]=setupCanvas("canFore")

let astroPos=[200,300]
let astroImg

function setupCanvas(name){
  const can=document.getElementById(name)
  can.width=dims
  can.height=dims
  const ctx=can.getContext("2d")
  return [can,ctx]
}

let controls=[false,false,false,false]
window.addEventListener("keydown",ev=>{
  if(ev.key=="w") controls[0]=true
  else if(ev.key=="s") controls[1]=true
  if(ev.key=="d") controls[2]=true
  else if(ev.key=="a") controls[3]=true
})
window.addEventListener("keyup",ev=>{
  if(ev.key=="w") controls[0]=false
  else if(ev.key=="s") controls[1]=false
  if(ev.key=="d") controls[2]=false
  else if(ev.key=="a") controls[3]=false
})


function setupSky(n){
  drawDot(ctxSky,200,10,10,"white")
  let step=dims/n
  for(let i=0;i<n;i++) for(let j=0;j<n;j++){
    if(rand()<.25) drawDot(ctxSky,(i+rand())*step,(j+rand())*step,1,"white")
  }
}

function setupImage(filename){
  astroImg=document.createElement("img")
  document.body.append(astroImg)
  astroImg.addEventListener("load",ev=>{
    console.log(ev)
  })
  astroImg.src="./"+filename
  astroImg.style.position="relative"
  astroImg.style.top=astroPos[1]+"px"
  astroImg.style.left=astroPos[0]+"px"
}

function setupAsteroid(h){
  drawPolygon(ctxBack,[380,h,360,h+50,340,h+30,250,380,200,360,150,370,60,h+35,40,h+55,20,h],"gray")
  
  ctxBack.fillStyle="white"
  ctxBack.beginPath()
  ctxBack.ellipse(200,h,180,30,0,0,Math.PI*2)
  ctxBack.fill()
}

function drawDot(ctx,x,y,r,c){
  ctx.fillStyle=c
  ctx.beginPath()
  ctx.ellipse(x,y,r,r,0,0,Math.PI*2)
  ctx.fill()
}

function drawPolygon(ctx,points,c){
  ctx.fillStyle=c
  ctx.beginPath()
  ctx.moveTo(points[0],points[1])
  for(let i=2;i<points.length;i=i+2) ctx.lineTo(points[i],points[i+1])
  ctx.fill()

}

function rand(){return Math.random()}


function setup(){
  setupImage("astro.png")
  setupSky(10)
  setupAsteroid(300)
  requestAnimationFrame(loop)
}

function loop(){
  if(controls[0]) astroPos[1]-=1
  else if(controls[1]) astroPos[1]+=1
  if(controls[2]) astroPos[0]+=1
  else if(controls[3]) astroPos[0]-=1
  astroImg.style.left=astroPos[0]+"px"
  astroImg.style.top=astroPos[1]+"px"
  requestAnimationFrame(loop)
}

setup()