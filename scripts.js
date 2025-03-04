// Chart initialization and data
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to normalize data to percentage growth
    function normalizeData(data) {
        const initial = data[0];
        return data.map(value => (value / initial) * 100);
    }

    // Charts for metrics
    if (document.getElementById('pdfMasterChart')) {
        const pdfInstalls = [30000, 45000, 65000, 85000, 105000, 125000];
        const pdfReviews = [1100, 1800, 2500, 3200, 3800, 4200];

        const pdfMasterCtx = document.getElementById('pdfMasterChart').getContext('2d');
        const pdfMasterChart = new Chart(pdfMasterCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Installs',
                    data: normalizeData(pdfInstalls),
                    borderColor: 'hsl(250, 96%, 64%)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0
                }, {
                    label: 'Reviews',
                    data: normalizeData(pdfReviews),
                    borderColor: 'hsl(270, 91%, 65%)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0
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
                            title: () => '', // Remove title
                            label: function(context) {
                                return `${context.dataset.label}`;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: true,
                    mode: 'nearest'
                }
            }
        });
    }

    if (document.getElementById('tabMasterChart')) {
        const tabInstalls = [15000, 25000, 40000, 55000, 70000, 82000];
        const tabReviews = [600, 1200, 1800, 2200, 2500, 2800];

        const tabMasterCtx = document.getElementById('tabMasterChart').getContext('2d');
        const tabMasterChart = new Chart(tabMasterCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Installs',
                    data: normalizeData(tabInstalls),
                    borderColor: 'hsl(250, 96%, 64%)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0
                }, {
                    label: 'Reviews',
                    data: normalizeData(tabReviews),
                    borderColor: 'hsl(270, 91%, 65%)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0
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
                            title: () => '',
                            label: function(context) {
                                return `${context.dataset.label}`;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: true,
                    mode: 'nearest'
                }
            }
        });
    }

    // Mobile menu functionality
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

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('navbar-blur');
        } else {
            navbar.classList.remove('navbar-blur');
        }
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Initial check
    setTimeout(() => {
        const visibleElements = document.querySelectorAll('.animate');
        visibleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                element.classList.add('show');
            }
        });
    }, 100);

    // Smooth scrolling for anchor links
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

    // Add particle animations
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        const particleCount = 5; // Already have 5 defined in HTML
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 30px and 150px
            const size = Math.floor(Math.random() * 120) + 30;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random opacity between 0.02 and 0.05
            particle.style.opacity = (Math.random() * 0.03 + 0.02).toString();
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // Form handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all required fields
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    input.addEventListener('input', () => input.classList.remove('error'));
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = `
                    <span>Sending...</span>
                    <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                `;
                
                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    submitButton.innerHTML = `
                        <span>Message Sent!</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                    `;
                }, 2000);
            }
        });
    }
});