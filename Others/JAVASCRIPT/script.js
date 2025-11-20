// AIPRI LIFESCIENCES | CLEANED SCRIPT - INQUIRY FORM FIXED

// 1. DOM CONTENT LOADED EVENT
(function () {
    'use strict';

    function safeCall(fn) {
        if (typeof fn !== 'function') return;
        try { fn(); } catch (err) { console.error(fn.name + ' failed:', err); }
    }

    document.addEventListener('DOMContentLoaded', function () {
        // call initializers defensively so one failure doesn't stop the rest
        safeCall(initNavigation);
        safeCall(initSuturesSlider);
        safeCall(initScrollAnimations);
        safeCall(initModal);
        safeCall(initFloatingButtons);
        safeCall(initProductDetailsButtons);
        safeCall(initCurrentYear);
        safeCall(initSmoothScrolling);
        safeCall(initInquiryForm); // ADD THIS NEW FUNCTION

        console.log('Aipri Lifesciences safe initialization complete');
    });
})();

// 2. NAVIGATION FUNCTIONALITY
function initNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('#nav ul');
    const dropdowns = document.querySelectorAll('.dropdown, .sub-dropdown');

    // Mobile menu toggle - guard navMenu and mobileMenuButton
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Dropdown menu handling for mobile - guard link presence
    if (dropdowns && dropdowns.length) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            if (!link) return;
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const menu = dropdown.querySelector('.dropdown-menu, .sub-dropdown-menu');
                    if (menu) menu.classList.toggle('active');
                }
            });
        });
    }

    // Close mobile menu when clicking outside - guard navMenu and mobileMenuButton
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            if (!e.target.closest('#nav') && !e.target.closest('.mobile-menu-button')) {
                navMenu.classList.remove('active');
                if (mobileMenuButton) {
                    const icon = mobileMenuButton.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                // Close dropdown menus safely
                document.querySelectorAll('.dropdown-menu, .sub-dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        }

        // Close desktop dropdowns when clicking outside
        if (window.innerWidth > 768) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown, .sub-dropdown').forEach(drop => {
                    drop.classList.remove('active');
                });
            }
        }
    });

    // Header scroll effect - safe guard
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (!header) return;
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                header.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
            }
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.07)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                header.style.backgroundColor = 'rgba(30, 41, 59, 0.9)';
            }
        }
    });
}

// 3. SUTURES SLIDER FUNCTIONALITY
function initSuturesSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        showSlide(prevIndex);
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    const slider = document.querySelector('.sutures-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

// 4. SCROLL ANIMATIONS
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.anim-fade-in, .fade-in');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each animated element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// 5. MODAL FUNCTIONALITY - UPDATED (REMOVED FORM SUBMISSION)
function initModal() {
    const inquiryModal = document.getElementById('inquiryModal');
    const inquiryBtn = document.getElementById('inquiryBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Open modal
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', function() {
            inquiryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    function closeModal() {
        inquiryModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (inquiryModal) {
        inquiryModal.addEventListener('click', function(e) {
            if (e.target === inquiryModal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && inquiryModal && inquiryModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 6. FLOATING BUTTONS FUNCTIONALITY
function initFloatingButtons() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const inquireNowBtn = document.getElementById('inquireNowBtn');
    const inquiryModal = document.getElementById('inquiryModal');
    
    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        // Initially hide the button
        scrollTopBtn.style.display = 'none';
    }
    
    // Inquire Now button functionality
    if (inquireNowBtn && inquiryModal) {
        inquireNowBtn.addEventListener('click', function() {
            inquiryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
}

// 7. PRODUCT DETAILS BUTTONS
function initProductDetailsButtons() {
    const detailsButtons = document.querySelectorAll('.details-btn');
    
    detailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If clicked element is a link or inside a link, allow normal navigation
            const clickedLink = e.target.closest('a[href]');
            if (clickedLink) {
                // Let the link handle navigation naturally
                return;
            }
            
            // If button contains a link, navigate to it
            const innerLink = this.querySelector('a[href]');
            if (innerLink) {
                e.preventDefault();
                window.location.href = innerLink.href;
                return;
            }
            
            // Fallback behavior only when no link present
            const contact = document.getElementById('contact');
            if (contact) {
                e.preventDefault();
                contact.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// 8. UTILITY FUNCTIONS
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a dropdown toggle
            if (href === '#' || this.closest('.dropdown')) {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerEl = document.querySelector('.medical-navbar');
                const headerHeight = headerEl ? headerEl.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('#nav ul');
                const mobileMenuButton = document.querySelector('.mobile-menu-button');
                
                if (window.innerWidth <= 768 && mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileMenuButton) {
                        mobileMenuButton.classList.remove('active');
                        const icon = mobileMenuButton.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    });
}

// 9. INQUIRY FORM FUNCTIONALITY - NEW AND CLEAN
function initInquiryForm() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        console.log('Inquiry form found, setting up database submission...');
        
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Inquiry form submitted to database!');
            
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send to database
            fetch('submit_inquiry.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response received:', response);
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                if (data.success) {
                    alert('✅ Thank you for your inquiry! We will contact you soon.');
                    inquiryForm.reset();
                    // Close modal
                    const modalCloseBtn = document.getElementById('modalCloseBtn');
                    if (modalCloseBtn) modalCloseBtn.click();
                } else {
                    alert('❌ Failed to submit inquiry: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('❌ An error occurred. Please try again.');
            })
            .finally(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    } else {
        console.log('Inquiry form not found!');
    }
}

// 10. NAVBAR SCROLL EFFECT
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.medical-navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// 11. MOBILE MENU FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.medical-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mobile submenu toggle
    const mobileSubmenuButtons = document.querySelectorAll('.medical-dropdown-submenu .medical-dropdown-item');
    
    mobileSubmenuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                e.stopPropagation();
                
                const submenu = this.closest('.medical-dropdown-submenu');
                const isOpen = submenu.classList.contains('mobile-open');
                
                // Close all other submenus
                document.querySelectorAll('.medical-dropdown-submenu.mobile-open').forEach(openSubmenu => {
                    if (openSubmenu !== submenu) {
                        openSubmenu.classList.remove('mobile-open');
                    }
                });
                
                // Toggle current submenu
                if (!isOpen) {
                    submenu.classList.add('mobile-open');
                } else {
                    submenu.classList.remove('mobile-open');
                }
            }
        });
    });

    // Close submenus when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            if (!e.target.closest('.medical-dropdown-submenu')) {
                document.querySelectorAll('.medical-dropdown-submenu.mobile-open').forEach(submenu => {
                    submenu.classList.remove('mobile-open');
                });
            }
        }
    });
});

// 12. PERFORMANCE OPTIMIZATIONS
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// 13. ERROR HANDLING
window.addEventListener('error', function(e) {
    console.error('Script error:', e.error);
});

console.log('Aipri Lifesciences CLEAN script loaded successfully');