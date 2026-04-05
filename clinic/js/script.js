// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* 1. Navbar Scroll Effect */
    const navbar = document.getElementById('mainNavbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.remove('d-none');
            backToTop.classList.add('d-flex');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('d-flex');
            backToTop.classList.add('d-none');
        }
    });

    /* 2. Scroll Reveal Animations using Intersection Observer */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
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
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* 3. Back to Top Button */
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* 4. Form Validation */
    const form = document.getElementById('appointmentForm');
    const successMsg = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
            } else {
                // Remove validation state
                form.classList.remove('was-validated');
                
                // Show success message
                successMsg.classList.remove('d-none');
                
                // Reset form inputs (optional, we can leave date intact)
                setTimeout(() => {
                    form.reset();
                    successMsg.classList.add('d-none');
                }, 4000); // hide after 4 seconds
            }
        }, false);
        
        // Custom phone validation (only numbers allowed visually)
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});
