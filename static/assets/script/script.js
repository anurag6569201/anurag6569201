

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
        setTimeout(() => {
            universe.style.display = "none"; // Wait for fade-out before hiding
        }, 500);
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


    blackhole('#blackhole', onLoaderComplete);

    function blackhole(element, onComplete) {
        var h = $(element).height(),
            w = $(element).width(),
            cw = w,
            ch = h,
            maxorbit = 255, // distance from center
            centery = ch / 2,
            centerx = cw / 2;

        var startTime = new Date().getTime();
        var currentTime = 0;

        var stars = [],
            collapse = false,
            collapsing = true,
            expanse = true,
            fading = false;

        var canvas = $('<canvas/>').attr({ width: cw, height: ch }).appendTo(element),
            context = canvas.get(0).getContext("2d");

        canvas.css({
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999,
            opacity: 1,
            transition: 'opacity 2s ease'
        });

        context.globalCompositeOperation = "multiply";

        function setDPI(canvas, dpi) {
            if (!canvas.get(0).style.width) canvas.get(0).style.width = canvas.get(0).width + 'px';
            if (!canvas.get(0).style.height) canvas.get(0).style.height = canvas.get(0).height + 'px';

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

        var star = function () {
            var rands = [];
            rands.push(Math.random() * (maxorbit / 2) + 1);
            rands.push(Math.random() * (maxorbit / 2) + maxorbit);

            this.orbital = rands.reduce(function (p, c) {
                return p + c;
            }, 0) / rands.length;

            this.x = centerx;
            this.y = centery + this.orbital;

            this.yOrigin = centery + this.orbital;

            this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180;
            this.rotation = 0;
            this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;

            this.id = stars.length;

            this.color = 'rgba(255,255,255,' + (1 - (this.orbital / 255)) + ')';
            this.collapseTarget = centery;

            this.expansePos = centery + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1);

            this.prevR = this.startRotation;
            this.prevX = this.x;
            this.prevY = this.y;

            stars.push(this);
        };

        star.prototype.draw = function () {
            if (!expanse) {
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (collapse) {
                    collapsing = true; // Trigger gradual collapse
                    if (this.y > this.collapseTarget) {
                        this.y -= 5; // Collapse speed
                    } else if (collapsing) {
                        collapsing = false;
                        expanse = true; // Automatically trigger expansion after collapsing
                        setTimeout(() => { expanse = true; }, 500); // Delay for visual effect
                    }
                }
            } else {
                this.rotation = this.startRotation + (currentTime * (this.speed / 2));
                if (this.y > this.expansePos) {
                    this.y -= Math.floor(this.expansePos - this.y) / -140;
                } else if (!fading) {
                    fading = true;
                    setTimeout(() => fadeOut(), 500); // Trigger fade-out
                }
            }

            context.save();
            context.fillStyle = this.color;
            context.strokeStyle = this.color;
            context.beginPath();
            var oldPos = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);
            context.moveTo(oldPos[0], oldPos[1]);
            context.translate(centerx, centery);
            context.rotate(this.rotation);
            context.translate(-centerx, -centery);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.restore();

            this.prevR = this.rotation;
            this.prevX = this.x;
            this.prevY = this.y;
        };

        function fadeOut() {
            canvas.css({ opacity: 0 });
            setTimeout(() => {
                canvas.remove();
                if (typeof onComplete === 'function') onComplete(); // Trigger callback
            },10); // Matches the CSS transition duration
        }

        function loop() {
            var now = new Date().getTime();
            currentTime = (now - startTime) / 50;

            context.fillStyle = 'rgb(0, 0, 0)';
            context.fillRect(0, 0, cw, ch);

            for (var i = 0; i < stars.length; i++) {
                if (stars[i] != stars) {
                    stars[i].draw();
                }
            }

            requestFrame(loop);
        }

        function init() {
            context.fillStyle = 'rgb(0, 0, 0)';
            context.fillRect(0, 0, cw, ch);
            for (var i = 0; i < 2500; i++) {
                new star();
            }
            loop();
        }

        $('.centerHover').on('click', function () {
            collapse = true; // Start the collapse effect
        });

        window.requestFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        init();
    }

    function onLoaderComplete() {
        console.log('onLoaderComplete');
            // Ensure the loader hides only after the page fully loads
            console.log("Loading");
            const elapsedTime = performance.now() - startTime;
            const remainingTime = Math.max(1000 - elapsedTime, 0);

                console.log("Loader complete");
                loader.style.transition = "opacity 0.5s ease"; // Smooth fade-out
                loader.style.opacity = "0";
              
                loader.style.display = "none"; // Hide after fade-out
              
    }
}