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

    // --- 6. MODAL ---
    const toggleModal = (isActive) => {
        if (inquiryModal) inquiryModal.classList.toggle('active', isActive);
    };
    if (inquiryBtn) inquiryBtn.addEventListener('click', () => toggleModal(true));
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => toggleModal(false));
    if (inquiryModal) inquiryModal.addEventListener('click', (e) => {
        if (e.target === inquiryModal) toggleModal(false);
    });

    // --- 7. ANIMATIONS ON SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
    
    // --- 8. DYNAMIC YEAR IN FOOTER ---
    const currentYearEl = document.getElementById('currentYear');
    if(currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- 9. FORM SUBMISSION ---
    const inquiryForm = document.getElementById('inquiryForm');
    if(inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(inquiryForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            console.log('Form submitted:', data);
            alert('Thank you for your inquiry! We will get back to you soon.');
            
            // Close modal and reset form
            if(inquiryModal) inquiryModal.classList.remove('active');
            inquiryForm.reset();
        });
    }
});