// Theme Switching Logic

const themeToggleButton = document.getElementById('theme-checkbox');
const themeToggleContainer = document.getElementById('theme-toggle-container'); // Mobile might need a different button instance
const body = document.body;

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolioTheme', theme); // Store preference

    // Update checkbox state (assuming one checkbox controls the state)
    if (themeToggleButton) {
         themeToggleButton.checked = (theme === 'dark');
    }

     // Dispatch a custom event for other components (like WebGL anim) to listen to
    const event = new CustomEvent('themeChanged', { detail: { theme: theme } });
    window.dispatchEvent(event);

    console.log(`Theme set to: ${theme}`);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolioTheme');
    // Check for system preference if no theme is saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

     setTheme(defaultTheme); // Set initial theme

     if (themeToggleButton && themeToggleContainer) {
        themeToggleContainer.addEventListener('click', (e) => {
             // Prevent label click triggering it twice
             if (e.target.tagName !== 'INPUT') {
                 themeToggleButton.checked = !themeToggleButton.checked;
             }
             const newTheme = themeToggleButton.checked ? 'dark' : 'light';
            setTheme(newTheme);
        });
    } else {
         console.warn('Theme toggle button or container not found.');
     }

     // Optional: Listen for changes in system preference
     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only change if no theme has been explicitly set by the user
        if (!localStorage.getItem('portfolioTheme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
         }
     });
 }

// No need to call initializeTheme() here, it will be called from main.js