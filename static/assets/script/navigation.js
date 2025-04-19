// Navigation Logic (Mobile Menu, Fixed Navbar, Active Dot)

function initializeNavigation() {
    const mobileNavOpenBtn = document.getElementById('mobile-nav-open');
    const mobileNavCloseBtn = document.getElementById('mobile-nav-close');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const mainNavbar = document.getElementById('main-navbar');
    const paginationNav = document.getElementById('pagination-nav');
    const navDots = paginationNav ? paginationNav.querySelectorAll('.dot') : [];
    const sections = document.querySelectorAll('section[id^="section"], header[id^="section1"]'); // Select sections by ID prefix
    const scrollProgress = document.getElementById('scroll-progress');


    // Mobile Menu Toggle
    if (mobileNavOpenBtn && mobileNavCloseBtn && mobileNavMenu) {
        mobileNavOpenBtn.addEventListener('click', () => {
            mobileNavMenu.classList.add('is-active');
            mobileNavMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });

        mobileNavCloseBtn.addEventListener('click', () => {
            mobileNavMenu.classList.remove('is-active');
            mobileNavMenu.setAttribute('aria-hidden', 'true');
             document.body.style.overflow = ''; // Restore scroll
        });

        // Close menu when a link is clicked
        mobileNavMenu.querySelectorAll('.nav-link-mob').forEach(link => {
            link.addEventListener('click', () => {
                 mobileNavMenu.classList.remove('is-active');
                 mobileNavMenu.setAttribute('aria-hidden', 'true');
                 document.body.style.overflow = '';
             });
        });
    } else {
        console.warn('Mobile navigation elements missing.');
    }

    // Fixed Navbar Background on Scroll
    function handleScroll() {
        if (mainNavbar) {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('scrolled');
            } else {
                mainNavbar.classList.remove('scrolled');
            }
        }

        // Active Dot Logic & Scroll Progress
        let currentSectionId = null;
        const scrollMiddle = window.innerHeight / 2; // Point to check section against

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Check if the section is roughly in the middle of the viewport
            if (rect.top <= scrollMiddle && rect.bottom >= scrollMiddle) {
                currentSectionId = section.getAttribute('id');
            }
        });

         // If no section is in the middle (e.g., at very top/bottom), fallback logic might be needed
         // For simplicity, we just update based on the middle check.

        navDots.forEach(dot => {
            if (dot.getAttribute('data-section') === currentSectionId) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Scroll Progress Bar
        if (scrollProgress) {
             const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
             const docHeight = document.documentElement.scrollHeight;
             const winHeight = window.innerHeight;
             const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
             scrollProgress.style.width = scrollPercent + '%';
         }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    // Pagination Dot Click Handling (Smooth Scroll via main.js event listener)
    navDots.forEach(dot => {
         dot.addEventListener('click', function(e) {
            // The smooth scroll is handled by the general anchor listener in main.js
             // We just need to make sure the active class gets updated immediately if needed,
             // though the scroll listener will handle it eventually.
             navDots.forEach(d => d.classList.remove('active'));
             this.classList.add('active');
         });
     });

     // Time Update
     function updateTime() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const sec = String(now.getSeconds()).padStart(2, '0');

        document.getElementById('hrs').textContent = hrs;
        document.getElementById('min').textContent = min;
        document.getElementById('sec').textContent = sec;

        document.getElementById('hrs_mob').textContent = hrs;
        document.getElementById('min_mob').textContent = min;
        document.getElementById('sec_mob').textContent = sec;
    }
     setInterval(updateTime, 1000);
     updateTime(); // Initial call
}

// No need to call initializeNavigation() here, it will be called from main.js