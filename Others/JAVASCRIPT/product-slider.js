// AIPRI LIFESCIENCES - PRODUCT PAGE SLIDER
// Reusable slider script for all product pages

(function() {
    'use strict';

    function initProductSlider() {
        const track = document.querySelector('.slider-track');
        if (!track) return;

        const slides = Array.from(track.children);
        if (slides.length === 0) return;

        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const sliderContainer = track.closest('.slider-container');
        
        if (!sliderContainer) return;

        let currentIndex = 0;
        let isInitialized = false;

        // Function to get container dimensions
        function getContainerDimensions() {
            const rect = sliderContainer.getBoundingClientRect();
            let width = rect.width || sliderContainer.offsetWidth;
            let height = rect.height || sliderContainer.offsetHeight;
            
            // If height is 0, calculate from padding-bottom
            if (height === 0 || height < 100) {
                const computedStyle = window.getComputedStyle(sliderContainer);
                const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
                if (paddingBottom > 0 && width > 0) {
                    height = (width * paddingBottom) / 100;
                } else {
                    height = (width * 75) / 100; // Fallback 4:3 ratio
                }
            }
            
            return {
                width: width > 0 ? width : 600,
                height: height > 0 ? height : 450
            };
        }

        // Function to update slide position
        function updateSlidePosition() {
            if (!track || !sliderContainer || !isInitialized) return;
            
            const dims = getContainerDimensions();
            const translateX = -(dims.width * currentIndex);
            track.style.transform = `translateX(${translateX}px)`;
        }

        // Function to go to next slide
        function goToNext(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (!isInitialized) return;
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            updateSlidePosition();
        }

        // Function to go to previous slide
        function goToPrev(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (!isInitialized) return;
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = slides.length - 1;
            }
            updateSlidePosition();
        }

        // Initialize slider
        function initSlider() {
            const dims = getContainerDimensions();
            
            if (dims.width <= 0) {
                setTimeout(initSlider, 100);
                return;
            }

            // Calculate total width needed for all slides
            const totalWidth = dims.width * slides.length;
            
            // Set track dimensions
            track.style.width = totalWidth + 'px';
            track.style.minWidth = totalWidth + 'px';
            track.style.height = dims.height + 'px';
            
            // Ensure each slide has the exact container width
            slides.forEach((slide) => {
                slide.style.width = dims.width + 'px';
                slide.style.minWidth = dims.width + 'px';
                slide.style.maxWidth = dims.width + 'px';
                slide.style.height = dims.height + 'px';
                slide.style.flexShrink = '0';
                slide.style.flexGrow = '0';
            });

            // Set initial position to show first slide
            currentIndex = 0;
            updateSlidePosition();
            
            isInitialized = true;
        }

        // Event listeners for buttons
        if (nextButton) {
            nextButton.addEventListener('click', goToNext);
        }

        if (prevButton) {
            prevButton.addEventListener('click', goToPrev);
        }

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (isInitialized) {
                    initSlider();
                }
            }, 250);
        });

        // Wait for images to load
        function waitForImages(callback) {
            const images = track.querySelectorAll('img');
            let loadedCount = 0;
            let errorCount = 0;
            const totalImages = images.length;

            if (totalImages === 0) {
                callback();
                return;
            }

            const checkComplete = () => {
                if (loadedCount + errorCount >= totalImages) {
                    callback();
                }
            };

            images.forEach(img => {
                if (img.complete && img.naturalHeight > 0) {
                    loadedCount++;
                    checkComplete();
                } else {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        checkComplete();
                    }, { once: true });
                    img.addEventListener('error', () => {
                        errorCount++;
                        checkComplete();
                    }, { once: true });
                }
            });

            // Fallback timeout
            setTimeout(callback, 2000);
        }

        // Initialize when ready
        function startInit() {
            let attempts = 0;
            const maxAttempts = 50;
            
            function tryInit() {
                attempts++;
                const dims = getContainerDimensions();
                
                if (dims.width > 0) {
                    waitForImages(() => {
                        setTimeout(() => {
                            initSlider();
                        }, 150);
                    });
                } else if (attempts < maxAttempts) {
                    setTimeout(tryInit, 100);
                }
            }
            
            tryInit();
        }

        // Wait for DOM and window load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(startInit, 300);
            });
        } else {
            if (document.readyState === 'complete') {
                setTimeout(startInit, 300);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(startInit, 300);
                });
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProductSlider);
    } else {
        setTimeout(initProductSlider, 150);
    }
})();
