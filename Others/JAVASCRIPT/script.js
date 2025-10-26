document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENT SELECTORS ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.getElementById('nav');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const inquiryModal = document.getElementById('inquiryModal');
    const inquiryBtn = document.getElementById('inquiryBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const slider = document.querySelector('.sutures-slider');
    const animatedElements = document.querySelectorAll('.anim-fade-in');
    
    // --- 2. UTILITY: THROTTLE FOR SCROLL PERFORMANCE ---
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            if (!inThrottle) {
                func.apply(this, arguments);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };

    // --- 3. MOBILE NAVIGATION ---
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
    });
    document.addEventListener('click', () => nav.classList.remove('active'));
    nav.addEventListener('click', (e) => e.stopPropagation());

    // --- 4. DARK MODE ---
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        darkModeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', theme);
    };
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
    darkModeBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // --- 5. SCROLL BEHAVIORS ---
    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        scrollTopBtn.style.display = scrollTop > 400 ? 'flex' : 'none';
    };
    window.addEventListener('scroll', throttle(handleScroll, 100));
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- 6. IMAGE SLIDER ---
    if (slider) {
        let currentSlide = 0;
        const slides = slider.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        if (slides.length > 0) {
            slides.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.addEventListener('click', () => showSlide(i));
                dotsContainer.appendChild(dot);
            });
            const dots = dotsContainer.querySelectorAll('.dot');
            const showSlide = (index) => {
                currentSlide = (index + slides.length) % slides.length;
                slides.forEach(s => s.classList.remove('active'));
                dots.forEach(d => d.classList.remove('active'));
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            };
            let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
            });
            showSlide(0);
        }
    }

    // --- 7. MODAL ---
    const toggleModal = (isActive) => {
        if (inquiryModal) inquiryModal.classList.toggle('active', isActive);
    };
    if (inquiryBtn) inquiryBtn.addEventListener('click', () => toggleModal(true));
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => toggleModal(false));
    if (inquiryModal) inquiryModal.addEventListener('click', (e) => {
        if (e.target === inquiryModal) toggleModal(false);
    });

    // --- 8. ANIMATIONS ON SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
});