/* Bizsite Boutique - Premium Global E-Commerce Logic */
document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('mainNav');
    const productGrid = document.getElementById('productGrid');
    const bagCount = document.querySelector('.bag-count');
    const toast = document.getElementById('toast');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentBasket = 0;
    let productsData = [];

    // 1. Navigation Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // 2. Dynamic Product Fetching (Fake Store API)
    const fetchProducts = async (filter = 'all') => {
        try {
            productGrid.innerHTML = '<div class="text-center w-100 p-5"><p class="h4 font-serif italic text-muted">Curating the boutique...</p></div>';
            
            // Use specific category fetches to ensure full coverage
            const categories = [
                { url: 'mens-shirts', ui: "men's clothing" },
                { url: 'mens-shoes', ui: "men's clothing" },
                { url: 'mens-watches', ui: "men's clothing" },
                { url: 'womens-dresses', ui: "women's clothing" },
                { url: 'womens-shoes', ui: "women's clothing" },
                { url: 'womens-watches', ui: "women's clothing" },
                { url: 'womens-bags', ui: "women's clothing" },
                { url: 'womens-jewellery', ui: "women's clothing" }
            ];

            const responses = await Promise.all(
                categories.map(cat => fetch(`https://dummyjson.com/products/category/${cat.url}`).then(res => res.json()))
            );

            // Combine and map
            productsData = [];
            responses.forEach((res, index) => {
                const uiCat = categories[index].ui;
                res.products.forEach(item => {
                    productsData.push({
                        ...item,
                        uiCategory: uiCat,
                        displayImage: item.images[0] || item.thumbnail
                    });
                });
            });

            // If empty, fetch general products as fallback (tops, etc)
            if (productsData.length < 5) {
                const genRes = await fetch('https://dummyjson.com/products?limit=100');
                const genData = await genRes.json();
                genData.products.forEach(item => {
                    const c = item.category.toLowerCase();
                    if (c.includes('mens') || c === 'tops') {
                        productsData.push({...item, uiCategory: "men's clothing", displayImage: item.images[0] || item.thumbnail});
                    }
                    if (c.includes('womens') || c.includes('dresses') || c.includes('bags')) {
                        productsData.push({...item, uiCategory: "women's clothing", displayImage: item.images[0] || item.thumbnail});
                    }
                });
            }

            // Default to Men's clothing instead of 'all' if needed
            renderProducts(filter === 'all' ? "men's clothing" : filter);

        } catch (error) {
            console.error('Boutique API Error:', error);
            productGrid.innerHTML = `
                <div class="text-center w-100 p-5">
                    <p class="h5 text-muted italic">Apologies, our global atelier is momentarily unreachable. Please refresh.</p>
                </div>
            `;
        }
    };

    // 3. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu on link click
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const renderProducts = (filter) => {
        let filtered = productsData;
        if (filter !== 'all') {
            filtered = productsData.filter(item => item.uiCategory === filter);
        }

        productGrid.innerHTML = '';

        if (filtered.length === 0) {
            productGrid.innerHTML = '<div class="text-center w-100 p-5"><p class="h5 text-muted italic">No items found in this curation.</p></div>';
            return;
        }

        filtered.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card reveal';
            
            // Real Store Features
            const onSale = product.discountPercentage > 12;
            const originalPrice = (product.price / (1 - (product.discountPercentage / 100))).toFixed(2);
            
            const shortTitle = product.title.length > 35 
                ? product.title.substring(0, 32) + '...' 
                : product.title;

            // Safe Access for Ratings
            const ratingRound = Math.round(product.rating || 4.5);
            
            let stars = '';
            for(let i=0; i<5; i++) {
                stars += `<i class="${i < ratingRound ? 'fa-solid' : 'fa-regular'} fa-star"></i> `;
            }

            productCard.innerHTML = `
                <div class="product-img-wrap">
                    ${onSale ? `<span class="sale-badge">-${Math.round(product.discountPercentage)}%</span>` : ''}
                    <img src="${product.displayImage}" alt="${product.title}" class="product-img" onerror="this.src='../../assets/hero_v6.png'">
                    <div class="add-to-bag-hint" data-id="${product.id}">Add to Bag</div>
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand || 'ATELIER'}</span>
                    <h3 class="product-title">${shortTitle}</h3>
                    <div class="product-pricing">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        ${onSale ? `<span class="original-price">$${originalPrice}</span>` : ''}
                    </div>
                    <div class="product-rating">${stars}</div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.add-to-bag-hint').forEach(btn => {
            btn.addEventListener('click', addToBag);
        });

        initScrollReveal();
    };

    // 3. Basket Logic
    const addToBag = (e) => {
        currentBasket++;
        bagCount.textContent = currentBasket;
        
        // Visual feedback
        bagCount.style.transform = 'scale(1.4)';
        setTimeout(() => bagCount.style.transform = 'scale(1)', 300);
        
        // Show Toast
        toast.textContent = "Item added to your bag";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

    // 4. Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });

    // 5. Category Redirection (Maison Men / Luxe Women links)
    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            const cat = e.target.closest('[data-category]').dataset.category;
            const targetBtn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
            if (targetBtn) {
                targetBtn.click();
                document.getElementById('selection').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 6. World Class Scroll Reveal
    const initScrollReveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
    
        reveals.forEach(rvl => {
          rvl.style.opacity = '0';
          rvl.style.transform = 'translateY(30px)';
          rvl.style.transition = '1.2s cubic-bezier(0.16, 1, 0.3, 1)';
          observer.observe(rvl);
        });
    };

    // Initialize the Boutique
    fetchProducts();

    console.log('BIZSITE BOUTIQUE / WORLD-CLASS E-COMMERCE ENGINE READY.');
});
