document.addEventListener('DOMContentLoaded', () => {

    /* Navbar Transparent to Solid on Scroll */
    const navbar = document.getElementById('mainNavbar');
    
    // Check initial scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* Scroll animations using Intersection Observer */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* Reservation Form Validation */
    const form = document.getElementById('reservationForm');
    const successAlert = document.getElementById('resSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
            } else {
                this.classList.remove('was-validated');
                successAlert.classList.remove('d-none');
                
                // Hide success message and reset after showing
                setTimeout(() => {
                    this.reset();
                    successAlert.classList.add('d-none');
                }, 5000);
            }
        }, false);
    }
});
