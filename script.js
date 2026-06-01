// ===========================================
// SMARTBUDGET.IN — COMPLETE JAVASCRIPT
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================
       1. MOBILE MENU TOGGLE
       ============================================== */
    const menuBtn  = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const bars = menuBtn.querySelectorAll('.bar');
            const isOpen = navLinks.classList.contains('active');

            bars[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none';
            bars[1].style.opacity   = isOpen ? '0' : '1';
            bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.querySelectorAll('.bar').forEach((bar) => {
                    bar.style.transform = 'none';
                    bar.style.opacity   = '1';
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn.querySelectorAll('.bar').forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity   = '1';
                });
            }
        });
    }


    /* ==============================================
       2. STICKY HEADER SHADOW ON SCROLL
       ============================================== */
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }


    /* ==============================================
       3. BACK TO TOP BUTTON
       ============================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ==============================================
       4. GLOBAL SEARCH FUNCTIONALITY (Homepage)
       ============================================== */
    const mainSearchInput = document.getElementById('search-input');
    const mainSearchBtn   = document.getElementById('search-btn');

    const searchIndex = [
        { title: 'Best Phone Under ₹15,000 India 2026', url: '#phones' },
        { title: 'Best Laptop Under ₹35,000 for Students', url: '#laptops' },
        { title: 'Best Smartwatch Under ₹3,000 India', url: '#gadgets' },
        { title: 'Best Mixer Grinder Under ₹2,000', url: '#kitchen' },
        { title: 'Best Running Shoes Under ₹2,500 India', url: '#shoes' },
        { title: 'Top 5 Self-Help Books Must Read 2026', url: '#books' },
        { title: 'Best Budget Gadgets India', url: '#gadgets' },
        { title: 'Best Fitness Equipment India', url: '#fitness' },
        { title: 'Best Home Products India 2026', url: '#home' },
    ];

    function doSearch(query) {
        if (!query || query.trim().length < 2) return;
        const q = query.toLowerCase().trim();
        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(q)
        );

        const existing = document.getElementById('search-results-box');
        if (existing) existing.remove();

        if (results.length > 0) {
            const box = document.createElement('div');
            box.id = 'search-results-box';
            box.style.cssText = `
                position: absolute; top: calc(100% + 8px); left: 0; right: 0;
                background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
                box-shadow: 0 12px 28px rgba(0,0,0,0.1); z-index: 9999;
                overflow: hidden; max-height: 280px; overflow-y: auto;
            `;

            results.forEach(item => {
                const row = document.createElement('a');
                row.href = item.url;
                row.textContent = item.title;
                row.style.cssText = `
                    display: block; padding: 13px 18px; font-size: 0.9rem;
                    color: #1e293b; border-bottom: 1px solid #f1f5f9;
                    transition: background 0.15s; font-family: 'DM Sans', sans-serif;
                `;
                row.addEventListener('mouseenter', () => row.style.background = '#eff6ff');
                row.addEventListener('mouseleave', () => row.style.background = '');
                row.addEventListener('click', () => {
                    box.remove();
                    if (mainSearchInput) mainSearchInput.value = '';
                });
                box.appendChild(row);
            });

            const searchWrap = document.getElementById('search-wrap');
            if (searchWrap) {
                searchWrap.style.position = 'relative';
                searchWrap.appendChild(box);
            }
        }
    }

    if (mainSearchInput) {
        let searchTimeout;
        mainSearchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => doSearch(e.target.value), 300);
        });

        mainSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doSearch(e.target.value);
            if (e.key === 'Escape') {
                const box = document.getElementById('search-results-box');
                if (box) box.remove();
            }
        });

        document.addEventListener('click', (e) => {
            const wrap = document.getElementById('search-wrap');
            if (wrap && !wrap.contains(e.target)) {
                const box = document.getElementById('search-results-box');
                if (box) box.remove();
            }
        });
    }

    if (mainSearchBtn) {
        mainSearchBtn.addEventListener('click', () => {
            if (mainSearchInput) doSearch(mainSearchInput.value);
        });
    }


    /* ==============================================
       5. AFFILIATE LINK CLICK TRACKING
       ============================================== */
    document.querySelectorAll('.affiliate-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const product  = link.dataset.product || 'unknown';
            const platform = link.classList.contains('btn-amazon') ? 'Amazon' : 'Flipkart';
            console.log(`[SmartBudget] Affiliate Click → ${product} on ${platform}`);
        });
    });


    /* ==============================================
       6. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').slice(1);
            if (!targetId) return;
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 70;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    /* ==============================================
       7. CARD ENTRANCE ANIMATION (Intersection Observer)
       ============================================== */
    const cards = document.querySelectorAll('.product-card, .cat-card, .guide-card, .trust-item');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity    = '1';
                    entry.target.style.transform  = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach((card, i) => {
            card.style.opacity   = '0';
            card.style.transform = 'translateY(24px)';
            card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
            observer.observe(card);
        });
    }


    /* ==============================================
       8. CURRENT YEAR IN FOOTER
       ============================================== */
    const yearEl = document.querySelector('.footer-bottom p');
    if (yearEl) {
        yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
    }


    /* ==============================================
       9. PRICE ALERT (Placeholder)
       ============================================== */
    window.setPriceAlert = function(productId, targetPrice) {
        console.log(`[SmartBudget] Price alert set for ${productId} at ₹${targetPrice}`);
        alert(`We'll notify you when the price drops to ₹${targetPrice}! (Feature coming soon)`);
    };


    /* ==============================================
       10. DYNAMIC BLOG HUB & SEARCH (For allposts.html)
       ============================================== */
    
    // Blog Data Array - Add your new blogs here
    const blogPosts = [
        {
            id: 1,
            title: "Best Budget Mic for YouTube in India (2026)",
            excerpt: "We compared Fifine, JBL, and Boya. Find out which mic is the absolute best for beginners under ₹1000.",
            category: "Gadgets & Audio",
            date: "May 26, 2026",
            image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            link: "budget-mic-review.html"
        },
        // Template for next blog:
        // {
        //     title: "Title Here",
        //     excerpt: "Short description...",
        //     category: "Laptops",
        //     date: "June 2026",
        //     image: "image_url_here.jpg",
        //     link: "your-page-name.html"
        // }
        
        {
          id: 2,
          title: "Offer Mini Cooler",
          excerpt: "Mini Cooler is the best For Summer in India Nowadays",
          category: "Home Appliances",
          date: "28 May, 2026",
          image: "https://m.media-amazon.com/images/I/41XSPcfIs8L._SY300_SX300_QL70_FMwebp_.jpg",
          link: "minicooler.html"
          
        }
    ];

    const blogGrid = document.getElementById('blog-grid');
    const blogSearchInput = document.getElementById('blog-search');
    const noResults = document.getElementById('no-results');

    function displayBlogs(blogsToDisplay) {
        if(!blogGrid) return; // Only runs on allposts.html
        
        blogGrid.innerHTML = ''; 

        if(blogsToDisplay.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
            
            blogsToDisplay.forEach(blog => {
                const cardHTML = `
                    <article class="product-card blog-card" style="opacity: 1; transform: translateY(0);">
                        <img src="${blog.image}" alt="${blog.title}" class="product-img" loading="lazy">
                        <div class="card-content">
                            <span class="category" style="color: #2563eb; font-weight: 800; font-size: 0.75rem; text-transform: uppercase;">${blog.category}</span>
                            <span class="blog-date" style="font-size: 0.8rem; color: #64748b; display: block; margin: 4px 0 8px;">${blog.date}</span>
                            <h3 class="product-title" style="font-size: 1.15rem; margin-bottom: 10px;">${blog.title}</h3>
                            <p class="short-review" style="font-size: 0.95rem; color: #64748b; margin-bottom: 15px; line-height: 1.5;">${blog.excerpt}</p>
                            <a href="${blog.link}" class="btn btn-accent btn-full">Read Full Guide →</a>
                        </div>
                    </article>
                `;
                blogGrid.innerHTML += cardHTML;
            });
        }
    }

    if(blogGrid) {
        displayBlogs([...blogPosts].reverse()); 
    }

    if(blogSearchInput) {
        blogSearchInput.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();
            const filteredBlogs = blogPosts.filter(blog => {
                return blog.title.toLowerCase().includes(searchString) || 
                       blog.category.toLowerCase().includes(searchString) ||
                       blog.excerpt.toLowerCase().includes(searchString);
            });
            displayBlogs(filteredBlogs.reverse());
        });
    }

});


/* ==============================================
   11. REVEAL AFFILIATE PLATFORMS (Viral Tiles)
   ============================================== */
function revealPlatforms(button) {
    // Buy Now button ko chhupao
    button.style.display = 'none';
    
    // Usi tile ke andar wale 3 platforms ko dikhao
    const platformsDiv = button.nextElementSibling;
    platformsDiv.style.display = 'flex';
}

// ===========================================
// END OF SCRIPT
// ===========================================
