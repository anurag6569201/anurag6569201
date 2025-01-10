

let shadowhr = document.querySelector(".shadowhr")
let hemburger_open = document.querySelector(".hemburger-open")
let hemburger_close = document.querySelector(".hemburger-close")
let navLinks = document.querySelectorAll(".navb .nav-link")
let navbg = document.querySelector(".navb")
let mobilever = document.querySelector(".mobile-navbar")
let hemburger_open_mob = document.querySelector(".hemburger-open_mob")
let hemburger_close_mob = document.querySelector(".hemburger-close_mob")

let link1 = document.querySelector(".link1")
let linkmobile = document.querySelector(".mobile-navbar .mobile-ver")
let link2 = document.querySelector(".link2")



let themebtn = document.querySelector('.toggle-btn')
let themebtncheck = document.querySelector('#checkbox')
let universe = document.querySelector('#glscreen')

let animblackhole = document.querySelector('.anim-blackhole')
let blackholee = document.querySelector('.blackhole')
let bodycss = document.body


themebtn.addEventListener('click', () => {
    if (themebtncheck.checked) {
        bodycss.background = "transparent";
        universe.style.display = "block";
        universe.style.opacity = "1"; // Fade in effect
        animblackhole.style.opacity = "1";
        blackholee.style.opacity = "1";
    } else {
        bodycss.background = "var(--pic-theme)";
        universe.style.opacity = "0"; // Fade out effect

        animblackhole.style.opacity = "0";
        blackholee.style.opacity = "0";
    }
});



function menu_open() {
    link1.style.transform = "translateX(0%)";
    link2.style.transform = "translateX(0%)";
    hemburger_open.style.display = "none";
    hemburger_close.style.display = "block";
    navbg.style.backdropFilter = "blur(var(--blurness))";
}
function menu_close() {
    link1.style.transform = "translateX(-100%)";
    link2.style.transform = "translateX(-100%)";
    hemburger_open.style.display = "block";
    hemburger_close.style.display = "none";
    navbg.style.backdropFilter = "blur(0)";
}

function menu_open_mob() {
    linkmobile.style.transform = "translateX(0%)";
    hemburger_open_mob.style.display = "none";
    hemburger_close_mob.style.display = "block";
    console.log("menuopen")
    mobilever.style.display = "block";
}
function menu_close_mob() {
    linkmobile.style.transform = "translateX(-100%)";
    hemburger_open_mob.style.display = "block";
    hemburger_close_mob.style.display = "none";
    console.log("menuclose")
    mobilever.style.display = "none";
}

let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
    let currentTime = new Date();
    hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000)

let hrs_mob = document.getElementById("hrs_mob");
let min_mob = document.getElementById("min_mob");
let sec_mob = document.getElementById("sec_mob");

setInterval(() => {
    let currentTime = new Date();
    hrs_mob.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    min_mob.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec_mob.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000)


navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(navLink => {
            navLink.classList.remove("active");
        });

        link.classList.add("active");
    });
});
function sort_all() {
    hideProjects();
    showProjectsByCategory("Web dev");
    setActiveButton('sort-web');
}

function sort_web() {
    hideProjects();
    showProjectsByCategory("Web dev");
    setActiveButton('sort-web');
}

function sort_contro() {
    hideProjects();
    showProjectsByCategory("Contro");
    setActiveButton('sort-contro');
}

function sort_aiml() {
    hideProjects();
    showProjectsByCategory("AI/ML");
    setActiveButton('sort-aiml');
}

function sort_freelance() {
    hideProjects();
    showProjectsByCategory("freelance");
    setActiveButton('sort-freelance');
}

function hackathon() {
    hideProjects();
    showProjectsByCategory("hackathon");
    setActiveButton('hackathon');
}
// Function to hide all projects
function hideProjects() {
    var projects = document.querySelectorAll('.projects .col-lg-4');
    projects.forEach(function (project) {
        project.style.display = 'none';
    });
}

// Function to show projects by category
function showProjectsByCategory(category) {
    var projects = document.querySelectorAll('.projects .col-lg-4');
    projects.forEach(function (project) {
        var projectCategory = project.getAttribute('data-category');
        if (projectCategory === category) {
            project.style.display = 'block';
        }
    });
}

// Function to show all projects
function showProjects() {
    var projects = document.querySelectorAll('.projects .col-lg-4');
    projects.forEach(function (project) {
        var projectCategory = project.getAttribute('data-category');
        if (projectCategory === "Web dev") {
            project.style.display = 'block';
        }
    });
}

// Function to set active button
function setActiveButton(activeButtonId) {
    var buttons = document.querySelectorAll('.sort-btn');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });

    var activeButton = document.getElementById(activeButtonId);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Set default sorting to web dev
sort_all();

// pagination scroll
let dots = document.querySelectorAll('input[name="dots"]');

window.addEventListener("scroll", () => {
    dots.forEach((dot, index) => {
        const section = document.getElementById(`section${index + 1}`);
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom >= 0;

        dot.checked = isVisible;
    });
});

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}




// reviling
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".revealUp").forEach(function (elem) {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 70%",
        end: "bottom 20%",
        markers: false,
        onEnter: function () {
            gsap.fromTo(
                elem,
                { y: 100, autoAlpha: 0 },
                {
                    duration: 1.25,
                    y: 0,
                    autoAlpha: 1,
                    ease: "back",
                    overwrite: "auto"
                }
            );
        },
        onLeaveBack: function () {
            gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
        }
    });
});

function loader_blackhole() {

    blackhole('#blackhole');

    
    function blackhole(element) {
        var h = $(element).height(),
            w = $(element).width(),
            cw = w,
            ch = h,
            maxorbit = 255, // distance from center
            centery = ch/2,
            centerx = cw/2;

        var startTime = new Date().getTime();
        var currentTime = 0;

        var stars = [],
            collapse = false, // if hovered
            expanse = false; // if clicked

        var canvas = $('<canvas/>').attr({width: cw, height: ch}).appendTo(element),
            context = canvas.get(0).getContext("2d");
        canvas.css

        context.globalCompositeOperation = "multiply";

        function setDPI(canvas, dpi) {
            // Set up CSS size if it's not set up already
            if (!canvas.get(0).style.width)
                canvas.get(0).style.width = canvas.get(0).width + 'px';
            if (!canvas.get(0).style.height)
                canvas.get(0).style.height = canvas.get(0).height + 'px';

            var scaleFactor = dpi / 96;
            canvas.get(0).width = Math.ceil(canvas.get(0).width * scaleFactor);
            canvas.get(0).height = Math.ceil(canvas.get(0).height * scaleFactor);
            var ctx = canvas.get(0).getContext('2d');
            ctx.scale(scaleFactor, scaleFactor);
        }

        function rotate(cx, cy, x, y, angle) {
            var radians = angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            return [nx, ny];
        }

        setDPI(canvas, 192);

        var star = function(){

            // Get a weighted random number, so that the majority of stars will form in the center of the orbit
            var rands = [];
            rands.push(Math.random() * (maxorbit/2) + 1);
            rands.push(Math.random() * (maxorbit/2) + maxorbit);

            this.orbital = (rands.reduce(function(p, c) {
                return p + c;
            }, 0) / rands.length);
            // Done getting that random number, it's stored in this.orbital

            this.x = centerx; // All of these stars are at the center x position at all times
            this.y = centery + this.orbital; // Set Y position starting at the center y + the position in the orbit

            this.yOrigin = centery + this.orbital;  // this is used to track the particles origin

            this.speed = (Math.floor(Math.random() * 2.5) + 1.5)*Math.PI/180; // The rate at which this star will orbit
            this.rotation = 0; // current Rotation
            this.startRotation = (Math.floor(Math.random() * 360) + 1)*Math.PI/180; // Starting rotation.  If not random, all stars will be generated in a single line.  

            this.id = stars.length;  // This will be used when expansion takes place.

            this.collapseBonus = this.orbital - (maxorbit * 0.7); // This "bonus" is used to randomly place some stars outside of the blackhole on hover
            if(this.collapseBonus < 0){ // if the collapse "bonus" is negative
                this.collapseBonus = 0; // set it to 0, this way no stars will go inside the blackhole
            }

            stars.push(this);
            this.color = 'rgba(255,255,255,'+ (1 - ((this.orbital) / 255)) +')'; // Color the star white, but make it more transparent the further out it is generated

            this.hoverPos = centery + (maxorbit/2) + this.collapseBonus;  // Where the star will go on hover of the blackhole
            this.expansePos = centery + (this.id%100)*-10 + (Math.floor(Math.random() * 20) + 1); // Where the star will go when expansion takes place


            this.prevR = this.startRotation;
            this.prevX = this.x;
            this.prevY = this.y;

            // The reason why I have yOrigin, hoverPos and expansePos is so that I don't have to do math on each animation frame.  Trying to reduce lag.
        }
        star.prototype.draw = function(){
            // the stars are not actually moving on the X axis in my code.  I'm simply rotating the canvas context for each star individually so that they all get rotated with the use of less complex math in each frame.



            if(!expanse){
                this.rotation = this.startRotation + (currentTime * this.speed);
                if(!collapse){ // not hovered
                    if(this.y > this.yOrigin){
                        this.y-= 2.5;
                    }
                    if(this.y < this.yOrigin-4){
                        this.y+= (this.yOrigin - this.y) / 10;
                    }
                } else { // on hover
                    this.trail = 1;
                    if(this.y > this.hoverPos){
                        this.y-= (this.hoverPos - this.y) / -5;
                    }
                    if(this.y < this.hoverPos-4){
                        this.y+= 2.5;
                    }
                }
            } else {
                this.rotation = this.startRotation + (currentTime * (this.speed / 2));
                if(this.y > this.expansePos){
                    this.y-= Math.floor(this.expansePos - this.y) / -140;
                }
            }

            context.save();
            context.fillStyle = this.color;
            context.strokeStyle = this.color;
            context.beginPath();
            var oldPos = rotate(centerx,centery,this.prevX,this.prevY,-this.prevR);
            context.moveTo(oldPos[0],oldPos[1]);
            context.translate(centerx, centery);
            context.rotate(this.rotation);
            context.translate(-centerx, -centery);
            context.lineTo(this.x,this.y);
            context.stroke();
            context.restore();


            this.prevR = this.rotation;
            this.prevX = this.x;
            this.prevY = this.y;
        }


        $('.centerHover').on('click',function(){
            collapse = false;
            expanse = true;
            initiate_main_body();

            $(this).addClass('open');
            $('.fullpage').addClass('open');
            setTimeout(function(){
                $('.header .welcome').removeClass('gone');
            }, 500);
        });
        $('.centerHover').on('mouseover',function(){
            if(expanse == false){
                collapse = true;
            }
        });
        $('.centerHover').on('mouseout',function(){
            if(expanse == false){
                collapse = false;
            }
        });

        window.requestFrame = (function(){
            return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
        })();

        function loop(){
            var now = new Date().getTime();
            currentTime = (now - startTime) / 50;

            context.fillStyle = 'rgba(0, 0, 0, 0.2)'; // somewhat clear the context, this way there will be trails behind the stars 
            context.fillRect(0, 0, cw, ch);

            for(var i = 0; i < stars.length; i++){  // For each star
                if(stars[i] != stars){
                    stars[i].draw(); // Draw it
                }
            }

            requestFrame(loop);
        }

        function init(time){
            context.fillStyle = 'rgb(0, 0, 0)';  // Initial clear of the canvas, to avoid an issue where it all gets too dark
            context.fillRect(0, 0, cw, ch);
            for(var i = 0; i < 700; i++){  // create 2500 stars
                new star();
            }
            loop();
        }
        init();
    }

}
let loader = document.getElementById("loader");
let main_body = document.querySelector(".main_body");

function initiate_main_body(){
    main_body.style.opacity = "0";
    let main_content_html = document.getElementById("main_html_id");
    main_content_html.style.overflow="hidden";
    setTimeout(() => {
        loader.style.transition = "opacity 4.5s ease";
        main_body.style.transition = "opacity 4.5s ease";
        main_body.style.opacity = "1";
        loader.style.opacity = "0";
        main_content_html.style.overflow="inherit";
        setTimeout(() => {
            loader.style.display = "none";
        }, 6000); // Matches the transition duration
    }, 3000); // Delay before fading starts
}