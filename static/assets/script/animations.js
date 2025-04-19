// GSAP Scroll Animations

function initializeScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // General Fade Up Animation for elements with .revealUp
    gsap.utils.toArray(".revealUp").forEach(function (elem) {
        ScrollTrigger.create({
            trigger: elem,
            start: "top 85%", // Trigger slightly earlier
            end: "bottom 15%",
            markers: false, // Turn off markers for production
            onEnter: () => gsap.fromTo(elem,
                { y: 50, autoAlpha: 0, scale: 0.98 }, // Start slightly lower and smaller
                { duration: 1, y: 0, autoAlpha: 1, scale: 1, ease: "power2.out", overwrite: "auto" }
            ),
            // Optional: fade out when leaving viewport from top
            // onLeaveBack: () => gsap.to(elem, { autoAlpha: 0, overwrite: "auto" }),
            // Optional: re-play animation every time it enters viewport
             // toggleActions: "play none none none", // Only play on enter
             // once: true, // Play animation only once per element
        });
    });

    // Example: Parallax effect for hero background (subtle)
     gsap.to("#glscreen", { // Target the canvas
        scrollTrigger: {
             trigger: "#section1", // Hero section
             start: "top top",
             end: "bottom top",
            scrub: 1.5, // Smoother scrubbing
             markers: false
         },
         ease: "none" // Linear movement for parallax
     });

    // Example: Sticky Profile Card (if desired)
    // Ensure the profile card's PARENT column (#profile-container) has enough height
    // ScrollTrigger.create({
    //     trigger: "#profile-container", // The column containing the sticky element
    //     start: "top top+=100", // Start when top of column reaches 100px from viewport top
    //     endTrigger: "#section3", // End when the next section starts
    //     end: "top bottom-=100", // End 100px before bottom of profile column hits next section top
    //     pin: ".profile-sticky-area", // The element to make sticky
    //     pinSpacing: false, // Don't add extra space
    //     markers: true // Enable markers for debugging
    // });

     console.log("GSAP animations initialized.");
}

// No need to call initializeScrollAnimations() here, it will be called from main.js