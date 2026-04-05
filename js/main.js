/* BIZSITESQUAD / NEXT-GEN DIGITAL AGENCY / 2026 */
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Premium Futuristic Cursor
    const cursor = document.querySelector('.premium-cursor');
    const ring = document.querySelector('.cursor-ring');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        
        cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
        ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor Interactions
    const interactiveElements = document.querySelectorAll('.btn-futuristic, .glass-panel, .nav-logo, .nav-links a, .portfolio-item, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(ring, { 
                scale: 1.8, 
                borderColor: '#06b6d4', 
                backgroundColor: 'rgba(6, 182, 212, 0.1)', 
                duration: 0.5, 
                ease: 'expo.out' 
            });
            gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(ring, { 
                scale: 1, 
                borderColor: '#8b5cf6', 
                backgroundColor: 'transparent', 
                duration: 0.5, 
                ease: 'expo.out' 
            });
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        });
    });

    // 2. Navbar Scroll Logic
    const mainNav = document.querySelector('#mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            gsap.to(mainNav, { 
                padding: '0.8rem 2rem', 
                backgroundColor: 'rgba(5, 5, 16, 0.8)', 
                duration: 0.4, 
                ease: 'power2.out' 
            });
        } else {
            gsap.to(mainNav, { 
                padding: '1.5rem 2rem', 
                backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                duration: 0.4, 
                ease: 'power2.out' 
            });
        }
    });

    // 3. GSAP Reveal Orchestration
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((rvl, index) => {
        gsap.to(rvl, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: rvl,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            delay: rvl.dataset.delay || 0
        });
    });

    // 4. Parallax Hero Image
    gsap.to('.hero-img', {
        y: -40,
        x: 10,
        rotate: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // 5. Hero Entrance Timeline
    const tl = gsap.timeline();
    tl.to('.hero-tag', { opacity: 1, y: 0, duration: 1, ease: 'expo.out' })
      .to('.hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, '-=0.6')
      .to('.hero-subtext', { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=0.8')
      .to('.btn-futuristic', { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out' }, '-=0.6')
      .to('.hero-img', { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' }, '-=1');

    console.log('BIZSITESQUAD / FUTURISTIC INTERFACE READY');
});
