let shadowhr=document.querySelector(".shadowhr")
let hemburger_open=document.querySelector(".hemburger-open")
let hemburger_close=document.querySelector(".hemburger-close")
let navLinks=document.querySelectorAll(".navb .nav-link")
let navbg=document.querySelector(".navb")
let mobilever=document.querySelector(".mobile-navbar")
let hemburger_open_mob=document.querySelector(".hemburger-open_mob")
let hemburger_close_mob=document.querySelector(".hemburger-close_mob")
let link1=document.querySelector(".link1")
let linkmobile=document.querySelector(".mobile-navbar .mobile-ver")
let link2=document.querySelector(".link2")
let themebtn=document.querySelector('.toggle-btn')
let themebtncheck=document.querySelector('#checkbox')
let universe=document.querySelector('#glscreen')
let animblackhole=document.querySelector('.anim-blackhole')
let blackholee=document.querySelector('.blackhole')
let bodycss=document.body
themebtn.addEventListener('click',()=>{if(themebtncheck.checked){bodycss.background="transparent";universe.style.display="block";universe.style.opacity="1";animblackhole.style.opacity="1";blackholee.style.opacity="1";}else{bodycss.background="var(--pic-theme)";universe.style.opacity="0";animblackhole.style.opacity="0";blackholee.style.opacity="0";}});function menu_open(){link1.style.transform="translateX(0%)";link2.style.transform="translateX(0%)";hemburger_open.style.display="none";hemburger_close.style.display="block";navbg.style.backdropFilter="blur(var(--blurness))";}
function menu_close(){link1.style.transform="translateX(-100%)";link2.style.transform="translateX(-100%)";hemburger_open.style.display="block";hemburger_close.style.display="none";navbg.style.backdropFilter="blur(0)";}
function menu_open_mob(){linkmobile.style.transform="translateX(0%)";hemburger_open_mob.style.display="none";hemburger_close_mob.style.display="block";console.log("menuopen")
mobilever.style.display="block";}
function menu_close_mob(){linkmobile.style.transform="translateX(-100%)";hemburger_open_mob.style.display="block";hemburger_close_mob.style.display="none";console.log("menuclose")
mobilever.style.display="none";}
let hrs=document.getElementById("hrs");let min=document.getElementById("min");let sec=document.getElementById("sec");setInterval(()=>{let currentTime=new Date();hrs.innerHTML=(currentTime.getHours()<10?"0":"")+currentTime.getHours();min.innerHTML=(currentTime.getMinutes()<10?"0":"")+currentTime.getMinutes();sec.innerHTML=(currentTime.getSeconds()<10?"0":"")+currentTime.getSeconds();},1000)
let hrs_mob=document.getElementById("hrs_mob");let min_mob=document.getElementById("min_mob");let sec_mob=document.getElementById("sec_mob");setInterval(()=>{let currentTime=new Date();hrs_mob.innerHTML=(currentTime.getHours()<10?"0":"")+currentTime.getHours();min_mob.innerHTML=(currentTime.getMinutes()<10?"0":"")+currentTime.getMinutes();sec_mob.innerHTML=(currentTime.getSeconds()<10?"0":"")+currentTime.getSeconds();},1000)
navLinks.forEach(link=>{link.addEventListener("click",function(){navLinks.forEach(navLink=>{navLink.classList.remove("active");});link.classList.add("active");});});function sort_all(){hideProjects();showProjectsByCategory("Web dev");setActiveButton('sort-web');}
function sort_web(){hideProjects();showProjectsByCategory("Web dev");setActiveButton('sort-web');}
function sort_contro(){hideProjects();showProjectsByCategory("Contro");setActiveButton('sort-contro');}
function sort_aiml(){hideProjects();showProjectsByCategory("AI/ML");setActiveButton('sort-aiml');}
function sort_freelance(){hideProjects();showProjectsByCategory("freelance");setActiveButton('sort-freelance');}
function hackathon(){hideProjects();showProjectsByCategory("hackathon");setActiveButton('hackathon');}
function hideProjects(){var projects=document.querySelectorAll('.projects .col-lg-4');projects.forEach(function(project){project.style.display='none';});}
function showProjectsByCategory(category){var projects=document.querySelectorAll('.projects .col-lg-4');projects.forEach(function(project){var projectCategory=project.getAttribute('data-category');if(projectCategory===category){project.style.display='block';}});}
function showProjects(){var projects=document.querySelectorAll('.projects .col-lg-4');projects.forEach(function(project){var projectCategory=project.getAttribute('data-category');if(projectCategory==="Web dev"){project.style.display='block';}});}
function setActiveButton(activeButtonId){var buttons=document.querySelectorAll('.sort-btn');buttons.forEach(function(button){button.classList.remove('active');});var activeButton=document.getElementById(activeButtonId);if(activeButton){activeButton.classList.add('active');}}
sort_all();let dots=document.querySelectorAll('input[name="dots"]');window.addEventListener("scroll",()=>{dots.forEach((dot,index)=>{const section=document.getElementById(`section${index + 1}`);const rect=section.getBoundingClientRect();const isVisible=rect.top<window.innerHeight*0.7&&rect.bottom>=0;dot.checked=isVisible;});});function scrollToElement(elementId){const element=document.getElementById(elementId);if(element){element.scrollIntoView({behavior:'smooth'});}}
gsap.registerPlugin(ScrollTrigger);gsap.utils.toArray(".revealUp").forEach(function(elem){ScrollTrigger.create({trigger:elem,start:"top 70%",end:"bottom 20%",markers:false,onEnter:function(){gsap.fromTo(elem,{y:100,autoAlpha:0},{duration:1.25,y:0,autoAlpha:1,ease:"back",overwrite:"auto"});},onLeaveBack:function(){gsap.fromTo(elem,{autoAlpha:1},{autoAlpha:0,overwrite:"auto"});}});});function loader_blackhole(){blackhole('#blackhole');function blackhole(element){var h=$(element).height(),w=$(element).width(),cw=w,ch=h,maxorbit=255,centery=ch/2,centerx=cw/2;var startTime=new Date().getTime();var currentTime=0;var stars=[],collapse=false,expanse=false;var canvas=$('<canvas/>').attr({width:cw,height:ch}).appendTo(element),context=canvas.get(0).getContext("2d");canvas.css
context.globalCompositeOperation="multiply";function setDPI(canvas,dpi){if(!canvas.get(0).style.width)
canvas.get(0).style.width=canvas.get(0).width+'px';if(!canvas.get(0).style.height)
canvas.get(0).style.height=canvas.get(0).height+'px';var scaleFactor=dpi/96;canvas.get(0).width=Math.ceil(canvas.get(0).width*scaleFactor);canvas.get(0).height=Math.ceil(canvas.get(0).height*scaleFactor);var ctx=canvas.get(0).getContext('2d');ctx.scale(scaleFactor,scaleFactor);}
function rotate(cx,cy,x,y,angle){var radians=angle,cos=Math.cos(radians),sin=Math.sin(radians),nx=(cos*(x-cx))+(sin*(y-cy))+cx,ny=(cos*(y-cy))-(sin*(x-cx))+cy;return[nx,ny];}
setDPI(canvas,192);var star=function(){var rands=[];rands.push(Math.random()*(maxorbit/2)+1);rands.push(Math.random()*(maxorbit/2)+maxorbit);this.orbital=(rands.reduce(function(p,c){return p+c;},0)/rands.length);this.x=centerx;this.y=centery+this.orbital;this.yOrigin=centery+this.orbital;this.speed=(Math.floor(Math.random()*2.5)+1.5)*Math.PI/180;this.rotation=0;this.startRotation=(Math.floor(Math.random()*360)+1)*Math.PI/180;this.id=stars.length;this.collapseBonus=this.orbital-(maxorbit*0.7);if(this.collapseBonus<0){this.collapseBonus=0;}
stars.push(this);this.color='rgba(255,255,255,'+(1-((this.orbital)/255))+')';this.hoverPos=centery+(maxorbit/2)+this.collapseBonus;this.expansePos=centery+(this.id%100)*-10+(Math.floor(Math.random()*20)+1);this.prevR=this.startRotation;this.prevX=this.x;this.prevY=this.y;}
star.prototype.draw=function(){if(!expanse){this.rotation=this.startRotation+(currentTime*this.speed);if(!collapse){if(this.y>this.yOrigin){this.y-=2.5;}
if(this.y<this.yOrigin-4){this.y+=(this.yOrigin-this.y)/10;}}else{this.trail=1;if(this.y>this.hoverPos){this.y-=(this.hoverPos-this.y)/-5;}
if(this.y<this.hoverPos-4){this.y+=2.5;}}}else{this.rotation=this.startRotation+(currentTime*(this.speed/2));if(this.y>this.expansePos){this.y-=Math.floor(this.expansePos-this.y)/-140;}}
context.save();context.fillStyle=this.color;context.strokeStyle=this.color;context.beginPath();var oldPos=rotate(centerx,centery,this.prevX,this.prevY,-this.prevR);context.moveTo(oldPos[0],oldPos[1]);context.translate(centerx,centery);context.rotate(this.rotation);context.translate(-centerx,-centery);context.lineTo(this.x,this.y);context.stroke();context.restore();this.prevR=this.rotation;this.prevX=this.x;this.prevY=this.y;}
$('.centerHover').on('click',function(){collapse=false;expanse=true;initiate_main_body();$(this).addClass('open');$('.fullpage').addClass('open');setTimeout(function(){$('.header .welcome').removeClass('gone');},500);});$('.centerHover').on('mouseover',function(){if(expanse==false){collapse=true;}});$('.centerHover').on('mouseout',function(){if(expanse==false){collapse=false;}});window.requestFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();function loop(){var now=new Date().getTime();currentTime=(now-startTime)/50;context.fillStyle='rgba(0, 0, 0, 0.2)';context.fillRect(0,0,cw,ch);for(var i=0;i<stars.length;i++){if(stars[i]!=stars){stars[i].draw();}}
requestFrame(loop);}
function init(time){context.fillStyle='rgb(0, 0, 0)';context.fillRect(0,0,cw,ch);for(var i=0;i<2500;i++){new star();}
loop();}
init();}}
let loader=document.getElementById("loader");let main_body=document.querySelector(".main_body");function initiate_main_body(){main_body.style.opacity="0";setTimeout(()=>{loader.style.transition="opacity 4.5s ease";main_body.style.transition="opacity 4.5s ease";main_body.style.opacity="1";loader.style.opacity="0";setTimeout(()=>{loader.style.display="none";},6000);},3000);};loader_blackhole();;