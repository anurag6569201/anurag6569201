// Main Initialization Script

// Function to initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Function to initialize project carousels
function initializeProjectSwipers() {
    const projectSwipers = document.querySelectorAll('.projectSwiper');
    projectSwipers.forEach(swiperEl => {
        new Swiper(swiperEl, {
            loop: true, // Keep loop
            autoplay: {
                delay: 3500, // Slightly slower
                disableOnInteraction: true, // Stop on interaction
            },
            pagination: {
                el: swiperEl.querySelector('.swiper-pagination'), // Scope pagination to this swiper
                clickable: true,
            },
            // Navigation buttons (optional)
            // navigation: {
            //     nextEl: swiperEl.querySelector('.swiper-button-next'),
            //     prevEl: swiperEl.querySelector('.swiper-button-prev'),
            // },
            effect: "fade", // Try fade effect
            fadeEffect: {
                 crossFade: true
            },
            grabCursor: true,
            // Consider removing cube effect if causing issues or for simplicity
            // effect: "cube",
            // grabCursor: true,
            // cubeEffect: {
            //     shadow: true,
            //     slideShadows: true,
            //     shadowOffset: 20,
            //     shadowScale: 0.94,
            // }
        });
    });
}

// Preloader Logic
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('specific_page'); // Target content wrapper

    if (!preloader || !mainContent) {
        console.warn('Preloader or main content element not found.');
        if(mainContent) mainContent.style.opacity = 1; // Ensure content visible if preloader fails
        return;
    }

    window.addEventListener('load', () => {
        // Ensure WebGL/Particles background might take a bit longer
        setTimeout(() => {
            preloader.classList.add('loaded');
            mainContent.style.opacity = 1; // Fade in main content
        }, 500); // Delay slightly after window.load
    });
}

// Initialize everything after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded. Initializing scripts...");

    handlePreloader(); // Handle preloader display and fade-out

    // Initialize specific components
    initializeTheme(); // From theme.js
    initializeNavigation(); // From navigation.js
    initializeScrollAnimations(); // From animations.js
    initializeProjectFilter(); // From projectFilter.js
    initializeWebglAnimation(); // From webgl-anim.js (if it has an init function)
    initializeParticles(); // From particles-config.js (if it has an init function)
    initializeTooltips(); // Initialize Bootstrap tooltips
    initializeProjectSwipers(); // Initialize Swiper for projects

    console.log("Initialization complete.");
});

// Add smooth scrolling for internal links (optional but nice)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        // Ensure it's a real ID and not just "#"
        if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Align top of the element to the top of the viewport
                });
            }
        }
    });
});