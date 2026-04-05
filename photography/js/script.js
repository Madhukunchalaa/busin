/* Lightbox Functions */
function openLightbox(imgSrc, captionText) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const caption = document.getElementById('caption');
    
    lightbox.classList.add('show');
    lightboxImg.src = imgSrc;
    caption.innerHTML = captionText;
    document.body.style.overflow = "hidden"; // Prevent scrolling behind
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = "auto";
}

document.addEventListener('DOMContentLoaded', () => {

    /* Navbar Solid on Scroll */
    const navbar = document.getElementById('mainNavbar');
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

    /* Portfolio Filtering */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('opacity-50');
            });
            // Add active class to clicked
            e.target.classList.add('active');
            e.target.classList.remove('opacity-50');

            const filterValue = e.target.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    /* Form Validation */
    const form = document.getElementById('contactForm');
    const successAlert = document.getElementById('contactSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
            } else {
                this.classList.remove('was-validated');
                successAlert.classList.remove('d-none');
                
                setTimeout(() => {
                    this.reset();
                    successAlert.classList.add('d-none');
                }, 5000);
            }
        }, false);
    }
    
    // Lightbox close on outside click
    const lightbox = document.getElementById('imageLightbox');
    window.onclick = function(event) {
        if (event.target == lightbox) {
            closeLightbox();
        }
    }
});
