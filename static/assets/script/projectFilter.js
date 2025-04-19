// Isotope Project Filtering Logic

function initializeProjectFilter() {
    const grid = document.querySelector('.projects-grid');
    const filtersContainer = document.querySelector('#project-filters');

    if (!grid) {
        // console.warn('Projects grid not found for Isotope.');
        return; // Exit if no grid exists on the page
    }
    if (!filtersContainer) {
        console.warn('Project filters container not found.');
        // Grid might still work without filters, but log a warning.
    }

    // Initialize Isotope after images have likely loaded
    imagesLoaded(grid, function() {
        console.log('Images loaded, initializing Isotope...');
        const iso = new Isotope(grid, {
            itemSelector: '.project-item',
            layoutMode: 'masonry', // or 'fitRows'
             percentPosition: true, // Usually better performance
             masonry: {
                columnWidth: '.project-item', // Adjust if you have a sizer element
                // gutter: 20 // Optional gutter if needed and not handled by CSS gap
             }
        });

        // Filter logic (only if filters exist)
        if (filtersContainer) {
            const filterButtons = filtersContainer.querySelectorAll('.btn-filter');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('is-checked'));
                    // Add active class to the clicked button
                    this.classList.add('is-checked');

                    const filterValue = this.getAttribute('data-filter');
                    console.log(`Filtering by: ${filterValue}`);
                    iso.arrange({ filter: filterValue });
                });
            });
        } else {
            // Ensure grid is laid out even without filters
             iso.layout();
        }

         console.log("Isotope initialized.");

          // Re-layout Isotope on window resize (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                 console.log("Resizing, relaying out Isotope.");
                 iso.layout();
             }, 250); // Adjust debounce time as needed
         });
    });


}

// No need to call initializeProjectFilter() here, it will be called from main.js
// Make sure imagesLoaded library is included in base.html or bundled if used
// Example CDN: <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>