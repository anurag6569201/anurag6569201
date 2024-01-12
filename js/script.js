let navLinks = document.querySelectorAll(".navb .nav-link")
let link1 = document.querySelector(".link1")
let link2 = document.querySelector(".link2")
let hemburger_open = document.querySelector(".hemburger-open")
let hemburger_close = document.querySelector(".hemburger-close")
let themebtn=document.querySelector('.toggle-btn')
let themebtncheck=document.querySelector('#checkbox')
let universe=document.querySelector('#glscreen')
let shadowhr=document.querySelector('.shadowhr')
let animblackhole=document.querySelector('.anim-blackhole')
let bodycss=document.body

themebtn.addEventListener('click',()=>{
    if(themebtncheck.checked){
        bodycss.style.background="var(--pic-theme)"
        universe.style.display="none"
        shadowhr.style.display="none"
        animblackhole.style.display="none"
    }else{
        bodycss.style.background="transparent"
        universe.style.display="block"
        shadowhr.style.display="block"
        animblackhole.style.display="block"
    }
})
function menu_open() {
    link1.style.transform = "translateX(0%)";
    link2.style.transform = "translateX(0%)";
    hemburger_open.style.display = "none";
    hemburger_close.style.display = "block";
}
function menu_close() {
    link1.style.transform = "translateX(-100%)";
    link2.style.transform = "translateX(-100%)";
    hemburger_open.style.display = "block";
    hemburger_close.style.display = "none";
}


let hrs = document.getElementById("hrs");
let min = document.getElementById("min");

setInterval(() => {
    let currentTime = new Date();
    hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000)


navLinks.forEach(link => {
    link.addEventListener("click", function() {
        navLinks.forEach(navLink => {
            navLink.classList.remove("active");
        });

        link.classList.add("active");
    });
});
// sorting of projects

function sort_all() {
    showProjects();
    setActiveButton('sort-all')
}

function sort_web() {
    hideProjects();
    showProjectsByCategory("Web dev");
    setActiveButton('sort-web')
}
function sort_game() {
    hideProjects();
    showProjectsByCategory("Games");
    setActiveButton('sort-game')
}
function sort_aiml() {
    hideProjects();
    showProjectsByCategory("AI/ML");
    setActiveButton('sort-aiml')
}
function sort_others() {
    hideProjects();
    showProjectsByCategory("Others");
    setActiveButton('sort-others')
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
        if (projectCategory === category || category === "Show All") {
            project.style.display = 'block';
        }
    });
}

// Function to show all projects
function showProjects() {
    var projects = document.querySelectorAll('.projects .col-lg-4');
    projects.forEach(function (project) {
        project.style.display = 'block';
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

// loader
const loader = document.getElementById("loader");

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loader.style.display = "none";
    }, 20); 
});

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


