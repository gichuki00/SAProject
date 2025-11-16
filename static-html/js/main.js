// Recipe Finder Static HTML JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSearch();
    initFilters();
    initModals();
    initToasts();
    initAnimations();
    initForms();
    initScrollEffects();
    initializePageSpecificFeatures();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        showToast('Searching for: ' + query, 'info');
        // In a real app, this would trigger an API call
        setTimeout(() => {
            showToast('Found 12 recipes matching "' + query + '"', 'success');
        }, 1000);
    }
}

// Filter functionality
function initFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');
            
            const filter = this.textContent.trim();
            showToast('Filtering by: ' + filter, 'info');
            // In a real app, this would filter the recipes
        });
    });
}

// Modal functionality
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Toast notifications
function initToasts() {
    // Toast container is created dynamically
}

function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = getToastIcon(type);
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

function getToastIcon(type) {
    const icons = {
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-exclamation-circle"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        info: '<i class="fas fa-info-circle"></i>'
    };
    return icons[type] || icons.info;
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .recipe-card, .testimonial-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Form functionality
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="loading"></span> Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        if (form.classList.contains('newsletter-form')) {
            showToast('Successfully subscribed to newsletter!', 'success');
            form.reset();
        } else {
            showToast('Form submitted successfully!', 'success');
        }
    }, 1500);
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background on scroll
        if (scrollTop > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Recipe card interactions
function initRecipeCards() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        const heartButton = card.querySelector('.recipe-badge');
        
        if (heartButton) {
            heartButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    showToast('Added to favorites!', 'success');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    showToast('Removed from favorites', 'info');
                }
            });
        }
        
        // Card click handler
        card.addEventListener('click', function() {
            const recipeName = this.querySelector('h3').textContent;
            showToast('Opening recipe: ' + recipeName, 'info');
            // In a real app, this would navigate to recipe detail
        });
    });
}

// Initialize recipe cards after DOM is loaded
document.addEventListener('DOMContentLoaded', initRecipeCards);

// Tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Accordion functionality
function initAccordions() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        if (header) {
            header.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all accordion items
                accordionItems.forEach(accordionItem => {
                    accordionItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Initialize tabs and accordions
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initAccordions();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add CSS for toast slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes toastSlideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Page-specific functionality
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'recipes.html':
            initializeRecipesPage();
            break;
        case 'about.html':
            initializeAboutPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        case 'signup.html':
            initializeSignupPage();
            break;
    }
}

// Recipes page functionality
function initializeRecipesPage() {
    initializeFilters();
    initializeSearch();
    initializePagination();
    initRecipeCards();
}

// About page functionality
function initializeAboutPage() {
    // Add scroll animations for team members and value cards
    const animateElements = document.querySelectorAll('.value-card, .team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact page functionality
function initializeContactPage() {
    initializeContactForm();
    initAccordions();
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        }, 1500);
    });
}

// Pagination functionality
function initializePagination() {
    const paginationItems = document.querySelectorAll('.pagination-item');
    if (!paginationItems.length) return;
    
    paginationItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            paginationItems.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked item (if it's a number)
            if (!item.querySelector('i')) {
                item.classList.add('active');
            }
            
            // Scroll to top of recipes section
            document.querySelector('.recipes-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Signup page functionality
function initializeSignupPage() {
    initializeSignupForm();
}

// Signup form handling
function initializeSignupForm() {
    const signupForm = document.querySelector('.signup-form');
    if (!signupForm) return;
    
    // Password validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    function validatePasswords() {
        if (confirmPassword.value && password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }
    
    password.addEventListener('change', validatePasswords);
    confirmPassword.addEventListener('input', validatePasswords);
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate passwords
        validatePasswords();
        if (!this.checkValidity()) {
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        submitBtn.disabled = true;
        
        // Simulate account creation
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showToast('Account created successfully! Welcome to Recipe Finder!', 'success');
            
            // Redirect to home page after delay
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        }, 2000);
    });
}

// Initialize page-specific features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePageSpecificFeatures();
});

// Export functions for external use if needed
window.RecipeFinder = {
    showToast,
    openModal,
    closeModal,
    performSearch,
    initializePageSpecificFeatures
};
