let particles=[];const numParticlesBase=300;let currentNumParticles=numParticlesBase;const noiseScale=0.006;const particleSpeed=1.2;const particleColor=[224,224,224];let sketchActive=true;let containerElement;function setup(){containerElement=document.getElementById('p5-sketch-container');if(!containerElement){console.error("p5 sketch container not found!");return;}
let canvas=createCanvas(containerElement.offsetWidth,containerElement.offsetHeight);canvas.parent('p5-sketch-container');currentNumParticles=Math.min(numParticlesBase,Math.round(numParticlesBase*(width/1000)));particles=[];for(let i=0;i<currentNumParticles;i++){particles.push(new Particle(random(width),random(height)));}
background(10,10,10);noiseSeed(random(1000));}
function draw(){if(!sketchActive)return;background(10,10,10,20);for(let i=particles.length-1;i>=0;i--){particles[i].update();particles[i].display();particles[i].edges();}}
function windowResized(){if(containerElement){resizeCanvas(containerElement.offsetWidth,containerElement.offsetHeight);setup();}}
function stopSketch(){sketchActive=false;console.log("p5 sketch stopped.");}
class Particle{constructor(x,y){this.pos=createVector(x,y);this.vel=p5.Vector.random2D().mult(random(0.5,particleSpeed));this.acc=createVector(0,0);this.maxSpeed=particleSpeed*(1+random(-0.3,0.3));this.history=[];this.initialAlpha=random(80,220);this.alpha=this.initialAlpha;this.lifespan=random(200,500);this.life=this.lifespan;}
update(){let angle=noise(this.pos.x*noiseScale,this.pos.y*noiseScale,frameCount*0.002)*TWO_PI*3;let force=p5.Vector.fromAngle(angle);force.setMag(0.08);this.acc.add(force);this.vel.add(this.acc);this.vel.limit(this.maxSpeed);this.pos.add(this.vel);this.acc.mult(0);this.history.push(this.pos.copy());if(this.history.length>8){this.history.splice(0,1);}
this.life--;this.alpha=map(this.life,0,this.lifespan,0,this.initialAlpha);if(this.life<=0){this.reset();}}
display(){strokeWeight(1);for(let i=0;i<this.history.length-1;i++){let trailAlpha=map(i,0,this.history.length-1,0,this.alpha*0.5);stroke(particleColor[0],particleColor[1],particleColor[2],trailAlpha);line(this.history[i].x,this.history[i].y,this.history[i+1].x,this.history[i+1].y);}}
edges(){let didWrap=false;if(this.pos.x>width+10){this.pos.x=-10;didWrap=true;}
if(this.pos.x<-10){this.pos.x=width+10;didWrap=true;}
if(this.pos.y>height+10){this.pos.y=-10;didWrap=true;}
if(this.pos.y<-10){this.pos.y=height+10;didWrap=true;}
if(didWrap){this.history=[];}}
reset(){this.pos=createVector(random(width),random(height));this.vel=p5.Vector.random2D().mult(random(0.5,particleSpeed));this.history=[];this.lifespan=random(200,500);this.life=this.lifespan;this.initialAlpha=random(80,220);this.alpha=this.initialAlpha;}};document.addEventListener('DOMContentLoaded',()=>{runIntroAnimation();initializeClock();setupMobileMenu();setupScrollAnimations();setupPaginationScroll();});function runIntroAnimation(){const overlay=document.getElementById('intro-overlay');const nameContainer=document.getElementById('intro-name-container');const nameElement=document.getElementById('intro-name');const mainContent=document.getElementById('specific_page');const body=document.body;if(!overlay||!nameContainer||!nameElement||!mainContent){console.error("Intro elements not found! Skipping intro animation.");if(mainContent)mainContent.style.visibility='visible';if(overlay)overlay.style.display='none';body.classList.remove('intro-active');return;}
body.classList.add('intro-active');const tl=gsap.timeline({paused:true,onComplete:()=>{body.classList.add('intro-done');body.classList.remove('intro-active');if(overlay){overlay.style.zIndex=-1;overlay.style.pointerEvents='none';}
if(typeof stopSketch==='function'){stopSketch();}else{console.warn("stopSketch function not found for p5");}
if(typeof ScrollTrigger!=='undefined'){ScrollTrigger.refresh();console.log("ScrollTrigger refreshed after intro.");}}});tl.to(nameContainer,{opacity:1,y:0,duration:0.8,ease:'power2.out'},"+=0.3");tl.to(nameElement,{opacity:1,duration:0.6},"-=0.4");tl.to(overlay,{opacity:0,duration:1.0,ease:'power1.inOut'},"+=0.6");tl.set(mainContent,{visibility:'visible'},"<");tl.from(mainContent,{opacity:0,duration:0.8,ease:'power2.out'},"<+=0.1");tl.from("#specific_page > * > [id^='section']",{opacity:0,y:30,stagger:0.1,duration:0.6,ease:'power1.out'},"-=0.6");setTimeout(()=>{tl.play();},200);}
function initializeClock(){const timeElements={hrs:document.getElementById('hrs'),min:document.getElementById('min'),sec:document.getElementById('sec'),hrs_mob:document.getElementById('hrs_mob'),min_mob:document.getElementById('min_mob'),sec_mob:document.getElementById('sec_mob')};function updateTime(){const now=new Date();const hrs=String(now.getHours()).padStart(2,'0');const min=String(now.getMinutes()).padStart(2,'0');const sec=String(now.getSeconds()).padStart(2,'0');if(timeElements.hrs)timeElements.hrs.textContent=hrs;if(timeElements.min)timeElements.min.textContent=min;if(timeElements.sec)timeElements.sec.textContent=sec;if(timeElements.hrs_mob)timeElements.hrs_mob.textContent=hrs;if(timeElements.min_mob)timeElements.min_mob.textContent=min;if(timeElements.sec_mob)timeElements.sec_mob.textContent=sec;}
if(Object.values(timeElements).some(el=>el!==null)){updateTime();setInterval(updateTime,1000);}}
function setupMobileMenu(){const openBtn=document.querySelector('.hemburger-open_mob');const closeBtn=document.querySelector('.hemburger-close_mob');const mobileNavbar=document.querySelector('.mobile-navbar');if(openBtn&&closeBtn&&mobileNavbar){openBtn.addEventListener('click',()=>{mobileNavbar.style.transform='translateX(0)';openBtn.style.display='none';closeBtn.style.display='block';});closeBtn.addEventListener('click',()=>{mobileNavbar.style.transform='translateX(-100%)';openBtn.style.display='block';closeBtn.style.display='none';});}}
window.menu_open_mob=()=>{const openBtn=document.querySelector('.hemburger-open_mob');const closeBtn=document.querySelector('.hemburger-close_mob');const mobileNavbar=document.querySelector('.mobile-navbar');if(mobileNavbar)mobileNavbar.style.transform='translateX(0)';if(openBtn)openBtn.style.display='none';if(closeBtn)closeBtn.style.display='block';};window.menu_close_mob=()=>{const openBtn=document.querySelector('.hemburger-open_mob');const closeBtn=document.querySelector('.hemburger-close_mob');const mobileNavbar=document.querySelector('.mobile-navbar');if(mobileNavbar)mobileNavbar.style.transform='translateX(-100%)';if(openBtn)openBtn.style.display='block';if(closeBtn)closeBtn.style.display='none';};function setupScrollAnimations(){if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined'){console.warn("GSAP or ScrollTrigger not loaded, skipping scroll animations.");return;}
gsap.registerPlugin(ScrollTrigger);const revealElements=gsap.utils.toArray('.revealUp');revealElements.forEach((elem)=>{gsap.from(elem,{y:50,opacity:0,duration:0.7,ease:'power1.out',scrollTrigger:{trigger:elem,start:'top 90%',toggleActions:'play none none none',}});});console.log(`ScrollTrigger setup for ${revealElements.length} elements.`);}
function setupPaginationScroll(){const paginationDots=document.querySelectorAll('#pagination input[type="radio"]');paginationDots.forEach(dot=>{dot.removeAttribute('onclick');dot.addEventListener('click',(event)=>{const sectionId=event.target.getAttribute('onclick')?.match(/scrollToElement\('([^']+)'\)/)?.[1];if(!sectionId&&event.target.id){const match=event.target.id.match(/dot-(\d+)/);if(match){sectionId=`section${match[1]}`;}}
if(sectionId){scrollToElement(sectionId);}else{console.warn(`Could not determine section ID for dot: ${event.target.id}`);}});});}
function scrollToElement(id){const element=document.getElementById(id);if(element){element.scrollIntoView({behavior:'smooth',block:'start'});console.log(`Scrolling to: ${id}`);}else{console.warn(`Element with ID ${id} not found for scrolling.`);}}
window.scrollToElement=scrollToElement;;