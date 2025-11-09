// AIPRI LIFESCIENCES | FINAL BUILD SCRIPT

// 1. DOM CONTENT LOADED EVENT
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSuturesSlider();
    initScrollAnimations();
    initModal();
    initFloatingButtons();
    initProductDetailsButtons();
    initCurrentYear();
    initSmoothScrolling();
    
    console.log('Aipri Lifesciences website initialized successfully');
});

// 2. NAVIGATION FUNCTIONALITY
function initNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('#nav ul');
    const dropdowns = document.querySelectorAll('.dropdown, .sub-dropdown');
    
    // Mobile menu toggle
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Dropdown menu handling for mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const menu = dropdown.querySelector('.dropdown-menu, .sub-dropdown-menu');
                if (menu) {
                    menu.classList.toggle('active');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            if (!e.target.closest('#nav') && !e.target.closest('.mobile-menu-button')) {
                navMenu.classList.remove('active');
                mobileMenuButton.querySelector('i').classList.remove('fa-times');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu, .sub-dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        }
    });
    
    // Header scroll effect (guard for missing header)
    window.addEventListener('scroll', function() {
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

// 5. MODAL FUNCTIONALITY
function initModal() {
    const inquiryModal = document.getElementById('inquiryModal');
    const inquiryBtn = document.getElementById('inquiryBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const inquiryForm = document.getElementById('inquiryForm');
    
    // Open modal
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', function() {
            inquiryModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Close modal
    function closeModal() {
        inquiryModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    inquiryModal.addEventListener('click', function(e) {
        if (e.target === inquiryModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && inquiryModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(inquiryForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // In a real application, you would send this data to a server
            console.log('Inquiry Form Submission:', { name, email, phone, message });
            
            // Show success message
            alert('Thank you for your inquiry! We will get back to you soon.');
            
            // Reset form and close modal
            inquiryForm.reset();
            closeModal();
        });
    }
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
            if (href === '#' || this.closest('.dropdown') || this.closest('.sub-dropdown')) {
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
                
                if (window.innerWidth <= 768 && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.querySelector('i').classList.remove('fa-times');
                    mobileMenuButton.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
}

// 9. PERFORMANCE OPTIMIZATIONS
// Lazy loading for images
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

// 10. ERROR HANDLING
window.addEventListener('error', function(e) {
    console.error('Script error:', e.error);
});

// 11. RESIZE HANDLER
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const mobileMenu = document.querySelector('#nav ul');
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuButton.querySelector('i').classList.remove('fa-times');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
            }
        }
    }, 250);
});

// 12. ADDITIONAL ENHANCEMENTS
// Add loading state to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .action-btn, .hero-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For demonstration purposes - in a real app, you would only
            // show loading state for buttons that trigger async operations
            if (this.type === 'submit' || this.classList.contains('submit-btn')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                this.disabled = true;
                
                // Reset after 2 seconds for demo purposes
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.quality-card, .values-card, .detail-card, .product-card, .type-card, .feature-item, .company-detail-card, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

console.log('Aipri Lifesciences script loaded successfully');


// AIPRI LIFESCIENCES | FINAL BUILD SCRIPT

// 1. DOM CONTENT LOADED EVENT
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSuturesSlider();
    initScrollAnimations();
    initModal();
    initFloatingButtons();
    initProductDetailsButtons();
    initCurrentYear();
    initSmoothScrolling();
    
    console.log('Aipri Lifesciences website initialized successfully');
});

// 2. NAVIGATION FUNCTIONALITY
function initNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('#nav ul');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Mobile menu toggle
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Desktop dropdown handling
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        // Desktop hover functionality
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('active');
            }
        });
        
        // Mobile click functionality
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            if (!e.target.closest('#nav') && !e.target.closest('.mobile-menu-button')) {
                navMenu.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.querySelector('i').classList.remove('fa-times');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
        
        // Close dropdowns when clicking outside on desktop
        if (window.innerWidth > 768) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
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
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Reset dropdown states on resize
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.querySelector('i').classList.remove('fa-times');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
                
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }, 250);
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

// // 5. MODAL FUNCTIONALITY
// function initModal() {
//     const inquiryModal = document.getElementById('inquiryModal');
//     const inquiryBtn = document.getElementById('inquiryBtn');
//     const modalCloseBtn = document.getElementById('modalCloseBtn');
//     const inquiryForm = document.getElementById('inquiryForm');
    
//     // Open modal
//     if (inquiryBtn) {
//         inquiryBtn.addEventListener('click', function() {
//             inquiryModal.classList.add('active');
//             document.body.style.overflow = 'hidden'; // Prevent background scrolling
//         });
//     }
    
//     // Close modal
//     function closeModal() {
//         inquiryModal.classList.remove('active');
//         document.body.style.overflow = ''; // Restore scrolling
//     }
    
//     if (modalCloseBtn) {
//         modalCloseBtn.addEventListener('click', closeModal);
//     }
    
//     // Close modal when clicking outside
//     inquiryModal.addEventListener('click', function(e) {
//         if (e.target === inquiryModal) {
//             closeModal();
//         }
//     });
    
//     // Close modal with Escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && inquiryModal.classList.contains('active')) {
//             closeModal();
//         }
//     });
    
//     // Form submission
//     if (inquiryForm) {
//         inquiryForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             // Get form data
//             const formData = new FormData(inquiryForm);
//             const name = formData.get('name');
//             const email = formData.get('email');
//             const message = formData.get('message');
            
//             // In a real application, you would send this data to a server
//             console.log('Inquiry Form Submission:', { name, email, message });
            
//             // Show success message
//             alert('Thank you for your inquiry! We will get back to you soon.');
            
//             // Reset form and close modal
//             inquiryForm.reset();
//             closeModal();
//         });
//     }
// }

// // 6. FLOATING BUTTONS FUNCTIONALITY
// function initFloatingButtons() {
//     const scrollTopBtn = document.getElementById('scrollTopBtn');
//     const inquireNowBtn = document.getElementById('inquireNowBtn');
//     const inquiryModal = document.getElementById('inquiryModal');
    
//     // Scroll to top functionality
//     if (scrollTopBtn) {
//         scrollTopBtn.addEventListener('click', function() {
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth'
//             });
//         });
        
//         // Show/hide scroll to top button based on scroll position
//         window.addEventListener('scroll', function() {
//             if (window.scrollY > 300) {
//                 scrollTopBtn.style.display = 'flex';
//             } else {
//                 scrollTopBtn.style.display = 'none';
//             }
//         });
        
//         // Initially hide the button
//         scrollTopBtn.style.display = 'none';
//     }
    
//     // Inquire Now button functionality
//     if (inquireNowBtn && inquiryModal) {
//         inquireNowBtn.addEventListener('click', function() {
//             inquiryModal.classList.add('active');
//             document.body.style.overflow = 'hidden';
//         });
//     }
// }

// 7. PRODUCT DETAILS BUTTONS (duplicate - updated to allow navigation)
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
                
                if (window.innerWidth <= 768 && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuButton.classList.remove('active');
                    mobileMenuButton.querySelector('i').classList.remove('fa-times');
                    mobileMenuButton.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
}

// 9. PERFORMANCE OPTIMIZATIONS
// Lazy loading for images
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

console.log('Aipri Lifesciences script loaded successfully');



window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.medical-navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active nav link highlighting
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

            // Enhanced dropdown submenu handling for desktop
            if (window.innerWidth > 992) {
                const dropdownSubmenus = document.querySelectorAll('.medical-dropdown-submenu');
                
                dropdownSubmenus.forEach(function(item) {
                    item.addEventListener('mouseenter', function() {
                        const submenu = this.querySelector('.medical-dropdown-menu');
                        if (submenu) {
                            submenu.style.display = 'block';
                        }
                    });
                    
                    item.addEventListener('mouseleave', function(e) {
                        // Check if mouse is leaving to a non-child element
                        if (!this.contains(e.relatedTarget)) {
                            const submenu = this.querySelector('.medical-dropdown-menu');
                            if (submenu) {
                                submenu.style.display = 'none';
                            }
                        }
                    });
                });
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            // Reset mobile submenus when switching to desktop
            if (window.innerWidth > 991) {
                document.querySelectorAll('.medical-dropdown-submenu.mobile-open').forEach(submenu => {
                    submenu.classList.remove('mobile-open');
                });
            }
        });
// 5. MODAL FUNCTIONALITY
function initModal() {
    const inquiryModal = document.getElementById('inquiryModal');
    const inquiryBtn = document.getElementById('inquiryBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const inquiryForm = document.getElementById('inquiryForm');
    
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
    inquiryModal.addEventListener('click', function(e) {
        if (e.target === inquiryModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && inquiryModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Create inquiry object
            const inquiry = {
                id: Date.now(), // Unique ID based on timestamp
                name: name,
                email: email,
                message: message,
                phone: phone,
                timestamp: new Date().toLocaleString('en-US'),
                date: new Date().toISOString()
            };
            
            // Save to localStorage
            saveInquiry(inquiry);
            
            // Show success message
            alert('Thank you for your inquiry! We will get back to you soon.');
            
            // Reset form and close modal
            inquiryForm.reset();
            closeModal();
        });
    }
}

// Function to save inquiry to localStorage
function saveInquiry(inquiry) {
    try {
        console.log('Saving inquiry:', inquiry);
        
        // Get existing inquiries or initialize empty array
        let existingInquiries = [];
        const storedData = localStorage.getItem('productInquiries');
        
        if (storedData) {
            existingInquiries = JSON.parse(storedData);
            console.log('Found existing inquiries:', existingInquiries.length);
        }
        
        // Add new inquiry
        existingInquiries.push(inquiry);
        
        // Save back to localStorage
        localStorage.setItem('productInquiries', JSON.stringify(existingInquiries));
        
        console.log('Inquiry saved successfully. Total inquiries:', existingInquiries.length);
        
        // Verify it was saved
        const verifyData = localStorage.getItem('productInquiries');
        console.log('Verification - stored data:', verifyData);
        
    } catch (error) {
        console.error('Error saving inquiry:', error);
        alert('Error saving your inquiry. Please try again.');
    }
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initModal();
    initFloatingButtons();
});


        // Table pagination helper: finds all tables with .variants-table
        (function initVariantsPagination() {
            document.addEventListener('DOMContentLoaded', function () {
                const tables = Array.from(document.querySelectorAll('.variants-table'));
                tables.forEach((table) => {
                    const tbody = table.querySelector('tbody');
                    if (!tbody) return;
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    const perPage = 10;
                    const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
                    const container = table.parentElement.querySelector('.variants-pagination');
                    if (!container) return;

                    function renderControls() {
                        container.innerHTML = '';
                        if (pageCount <= 1) return;

                        const prevBtn = document.createElement('button');
                        prevBtn.textContent = 'Prev';
                        prevBtn.className = 'prev-btn';
                        prevBtn.disabled = true;
                        container.appendChild(prevBtn);

                        for (let i = 1; i <= pageCount; i++) {
                            const btn = document.createElement('button');
                            btn.textContent = i;
                            btn.dataset.page = i;
                            btn.addEventListener('click', () => showPage(i));
                            container.appendChild(btn);
                        }

                        const nextBtn = document.createElement('button');
                        nextBtn.textContent = 'Next';
                        nextBtn.className = 'next-btn';
                        if (pageCount === 1) nextBtn.disabled = true;
                        container.appendChild(nextBtn);

                        prevBtn.addEventListener('click', () => {
                            const current = +container.querySelector('button.active').dataset.page;
                            if (current > 1) showPage(current - 1);
                        });
                        nextBtn.addEventListener('click', () => {
                            const current = +container.querySelector('button.active').dataset.page;
                            if (current < pageCount) showPage(current + 1);
                        });
                    }

                    function showPage(page) {
                        const start = (page - 1) * perPage;
                        const end = start + perPage;
                        rows.forEach((row, idx) => {
                            row.style.display = (idx >= start && idx < end) ? '' : 'none';
                        });
                        const buttons = Array.from(container.querySelectorAll('button')).filter(b => b.dataset.page);
                        buttons.forEach(b => b.classList.toggle('active', +b.dataset.page === page));
                        const prevBtn = container.querySelector('.prev-btn');
                        const nextBtn = container.querySelector('.next-btn');
                        if (prevBtn) prevBtn.disabled = (page === 1);
                        if (nextBtn) nextBtn.disabled = (page === pageCount);
                    }

                    renderControls();
                    showPage(1);
                });
            });
        })();



    
        // Variants table pagination (10 rows per page)
        document.addEventListener('DOMContentLoaded', function () {
            const tbody = document.querySelector('.variants-table tbody');
            if (!tbody) return;

            const rows = Array.from(tbody.querySelectorAll('tr'));
            const perPage = 10;
            const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
            const paginationContainer = document.getElementById('variantsPagination');

            function renderControls() {
                paginationContainer.innerHTML = '';
                if (pageCount <= 1) return;

                const prevBtn = document.createElement('button');
                prevBtn.textContent = 'Prev';
                prevBtn.className = 'prev-btn';
                prevBtn.disabled = true;
                paginationContainer.appendChild(prevBtn);

                for (let i = 1; i <= pageCount; i++) {
                    const btn = document.createElement('button');
                    btn.textContent = i;
                    btn.dataset.page = i;
                    btn.addEventListener('click', () => showPage(i));
                    paginationContainer.appendChild(btn);
                }

                const nextBtn = document.createElement('button');
                nextBtn.textContent = 'Next';
                nextBtn.className = 'next-btn';
                if (pageCount === 1) nextBtn.disabled = true;
                paginationContainer.appendChild(nextBtn);

                prevBtn.addEventListener('click', () => {
                    const current = +paginationContainer.querySelector('button.active').dataset.page;
                    if (current > 1) showPage(current - 1);
                });
                nextBtn.addEventListener('click', () => {
                    const current = +paginationContainer.querySelector('button.active').dataset.page;
                    if (current < pageCount) showPage(current + 1);
                });
            }

            function showPage(page) {
                const start = (page - 1) * perPage;
                const end = start + perPage;
                rows.forEach((row, idx) => {
                    row.style.display = (idx >= start && idx < end) ? '' : 'none';
                });

                // update active button and prev/next disabled state
                const buttons = Array.from(paginationContainer.querySelectorAll('button')).filter(b => b.dataset.page);
                buttons.forEach(b => b.classList.toggle('active', +b.dataset.page === page));

                const prevBtn = paginationContainer.querySelector('.prev-btn');
                const nextBtn = paginationContainer.querySelector('.next-btn');
                if (prevBtn) prevBtn.disabled = (page === 1);
                if (nextBtn) nextBtn.disabled = (page === pageCount);
            }

            // initialize
            renderControls();
            showPage(1);
        });
