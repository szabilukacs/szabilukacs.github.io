// GSAP animation
window.addEventListener('load', () => {

    const items = document.querySelectorAll('.cs-item');

    // Set up the Intersection Observer to animate when the element is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // GSAP animation for each list item
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power4.out",
                });

                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });  // Trigger when 50% of the element is in view

    // Start observing each item
    items.forEach(item => {
        gsap.set(item, { opacity: 0, y: 50 }); // Start slightly lower with opacity 0
        observer.observe(item);
    });

    // Animate the section heading when it comes into view
    const headingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power4.out",
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    // Observe the title
    const title = document.querySelector("#experience .cs-title");
    gsap.set(title, { opacity: 0, y: 50 }); // Start slightly lower with opacity 0
    headingObserver.observe(title);

    gsap.from(".cs-logo", {
        opacity: 0,
        y: -50,
        rotation: 360,
        duration: 1.5,
        ease: "bounce.out",
    });

    gsap.from("#home .cs-title", {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: "power4.out",
    });

    gsap.from("#home .cs-text", {
        opacity: 0,
        x: -100,
        duration: 1.5,
        delay: 0.5,
        ease: "power4.out",
    });

    gsap.from("#home .cs-button-solid", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        delay: 1,
        ease: "power4.out",
    });

    gsap.from(".cs-background img", {
        opacity: 0,
        scale: 1.2,
        duration: 2,
        delay: 1.5,
        ease: "power4.out",
    });
});