// Chart initialization and data
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to normalize data to percentage growth
    function normalizeData(data) {
        const initial = data[0];
        return data.map(value => (value / initial) * 100);
    }

    // Main Chart Initialization
    if (document.getElementById('pdfMasterChart')) {
        const pdfInstalls = [30000, 45000, 65000, 85000, 105000, 125000];
        const pdfReviews = [1100, 1800, 2500, 3200, 3800, 4200];

        const pdfMasterCtx = document.getElementById('pdfMasterChart').getContext('2d');
        
        // Enhanced chart styling
        const gradientInstalls = pdfMasterCtx.createLinearGradient(0, 0, 0, 200);
        gradientInstalls.addColorStop(0, 'hsla(250, 96%, 64%, 1)');
        gradientInstalls.addColorStop(1, 'hsla(250, 96%, 64%, 0)');
        
        const gradientReviews = pdfMasterCtx.createLinearGradient(0, 0, 0, 200);
        gradientReviews.addColorStop(0, 'hsla(270, 91%, 65%, 1)');
        gradientReviews.addColorStop(1, 'hsla(270, 91%, 65%, 0)');
        
        const pdfMasterChart = new Chart(pdfMasterCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Installs',
                    data: normalizeData(pdfInstalls),
                    borderColor: 'hsl(250, 96%, 64%)',
                    backgroundColor: gradientInstalls,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 3
                }, {
                    label: 'Reviews',
                    data: normalizeData(pdfReviews),
                    borderColor: 'hsl(270, 91%, 65%)',
                    backgroundColor: gradientReviews,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                scales: {
                    y: {
                        display: false,
                        min: 0,
                        max: 450
                    },
                    x: {
                        display: false
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'nearest',
                        intersect: true,
                        backgroundColor: 'hsl(222, 47%, 6%)',
                        titleColor: 'hsl(210, 40%, 98%)',
                        bodyColor: 'hsl(215, 20%, 65%)',
                        borderColor: 'hsla(217, 33%, 10%, 0.5)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: (items) => {
                                return items[0].label;
                            },
                            label: function(context) {
                                const value = context.parsed.y.toFixed(1);
                                return `${context.dataset.label}: ${value}%`;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Mobile menu functionality with improved transitions
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('backdrop');
    
    function toggleMenu() {
        mobileMenu.classList.toggle('open');
        backdrop.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    }
    
    if (menuToggle && closeMenu && backdrop) {
        menuToggle.addEventListener('click', toggleMenu);
        closeMenu.addEventListener('click', toggleMenu);
        backdrop.addEventListener('click', toggleMenu);
        
        // Close menu when clicking a link
        document.querySelectorAll('.mobile-nav-link, .mobile-menu .btn').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // Enhanced navbar scroll effect with smoother transition
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('navbar-blur');
        } else {
            navbar.classList.remove('navbar-blur');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    // Initial check for page load at scrolled position
    handleNavbarScroll();

    // Improved animation on scroll with thresholds
    const animateElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add small random delay for staggered animation effect
                const delay = Math.random() * 200;
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Initial check for elements in view on page load
    setTimeout(() => {
        const visibleElements = document.querySelectorAll('.animate');
        visibleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                element.classList.add('show');
            }
        });
    }, 100);

    // Enhanced smooth scrolling with offset calculation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced particle animations
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        // We already have 5 static particles in HTML, add a few more dynamically
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 30px and 200px
            const size = Math.floor(Math.random() * 170) + 30;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random opacity between 0.02 and 0.05
            particle.style.opacity = (Math.random() * 0.03 + 0.02).toString();
            
            // Random animation delay and duration
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 15}s`; // Between 15-25s
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // Add metrics to success story cards
    const successStoryMetrics = [
        {
            installs: '82K',
            installsGrowth: '280%',
            reviews: '2.8K',
            reviewsGrowth: '250%',
            reach: '246K',
            reachGrowth: '265%'
        },
        {
            installs: '55K',
            installsGrowth: '210%',
            reviews: '2.2K',
            reviewsGrowth: '225%',
            reach: '165K',
            reachGrowth: '220%'
        },
        {
            installs: '70K',
            installsGrowth: '245%',
            reviews: '2.5K',
            reviewsGrowth: '235%',
            reach: '210K',
            reachGrowth: '240%'
        },
        {
            installs: '95K',
            installsGrowth: '290%',
            reviews: '3.2K',
            reviewsGrowth: '270%',
            reach: '285K',
            reachGrowth: '285%'
        }
    ];

    document.querySelectorAll('.success-story-card:not(.main-card)').forEach((card, index) => {
        if (index < successStoryMetrics.length) {
            const metrics = successStoryMetrics[index];
            const metricsHTML = `
                <div class="metrics-container compact">
                    <div class="metrics-summary">
                        <div class="metric">
                            <span class="metric-label">Total Installs</span>
                            <span class="metric-value">${metrics.installs}</span>
          
                        </div>
                        <div class="metric">
                            <span class="metric-label">Reviews</span>
                            <span class="metric-value">${metrics.reviews}</span>
                        
                        </div>
                        <div class="metric">
                            <span class="metric-label">Est. Reach</span>
                            <span class="metric-value">${metrics.reach}</span>
              
                        </div>
                    </div>
                </div>
            `;
            card.insertAdjacentHTML('beforeend', metricsHTML);
        }
    });

    // Add smooth reveal animations for metrics values
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(value => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    value.classList.add('revealed');
                    observer.unobserve(value);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(value);
    });

    // Enhance navigation highlight based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.scrollY >= sectionTop - navHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Add additional subtle hover effects to interactive elements
    document.querySelectorAll('.extension-link, .pricing-feature, .testimonial-avatar').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });
    
    // Optimize performance by debouncing scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    const debouncedHandleScroll = debounce(function() {
        handleNavbarScroll();
        updateActiveNavLink();
    }, 15);
    
    window.removeEventListener('scroll', handleNavbarScroll);
    window.removeEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', debouncedHandleScroll);

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const parallaxOffset = scrollPosition * 0.4;
                heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;
                
                // Move particles with scroll for added depth
                const particles = document.querySelectorAll('.particle');
                particles.forEach((particle, index) => {
                    const speed = (index % 3 + 1) * 0.1;
                    const yOffset = scrollPosition * speed;
                    particle.style.transform = `translateY(${yOffset}px)`;
                });
            }
        });
    }

    // Add responsive image loading for better performance
    document.querySelectorAll('.extension-logo').forEach(img => {
        img.loading = 'lazy';
    });

    // Add click animation to buttons
    document.querySelectorAll('.btn, .contact-button').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.classList.add('btn-active');
        });
        
        button.addEventListener('mouseup', function() {
            this.classList.remove('btn-active');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-active');
        });
    });

    // Add year to footer copyright automatically
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
        const currentYear = new Date().getFullYear();
        footerCopy.innerHTML = footerCopy.innerHTML.replace('2023', currentYear);
    }

    // Add toast notification system for future features
    function createToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = message;
        
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        toastContainer.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }

    setTimeout(() => {
        createToast('Welcome to Samwell Marketing!', 'success');
    }, 2000);

    // Detect when elements enter viewport with IntersectionObserver
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }

    const viewObserver = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .success-story-card').forEach(element => {
        viewObserver.observe(element);
    });
});