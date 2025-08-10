// Python & Django Portfolio Website JavaScript

// Project data
const projectsData = [
  {
  id: 1,
  title: "Mr.Doc AI Chatbot",
  shortDescription: "AI-powered mental health support platform built with React and Django",
  longDescription: "Mr.Doc is an intuitive web application designed to support mental well-being through empathetic, AI-driven conversations. Built with React for the frontend and Django REST Framework for the backend, it offers secure, responsive interactions and personalized guidance. Hosted on Vercel for fast deployment and scalability.",
  image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
  technologies: ["React", "Django", "Django REST Framework", "JavaScript", "Vercel", "HTML", "CSS"],
  category: "web-app",
  features: [
    "AI-driven conversational interface",
    "User-friendly mental health support",
    "Responsive design across devices",
    "Secure backend with Django REST Framework",
    "Fast deployment on Vercel",
    "Scalable architecture for real-time interactions"
  ],
  challenges: "Integrating conversational AI with Django backend and ensuring secure, real-time communication across platforms",
  githubUrl: "https://github.com/sanket180/Mr.Doc",
  liveUrl: "https://mr-doc-23wi.vercel.app/",
  codeSnippet: `# Django REST Framework view for AI chat
class ChatAPIView(APIView):
    def post(self, request):
        user_input = request.data.get('message')
        response = generate_ai_response(user_input)
        return Response({'reply': response})`

  },
  {
  id: 2,
  title: "Blog API",
  shortDescription: "RESTful API for managing blog posts using Django REST Framework",
  longDescription: "Blog-Api-DRF is a structured and scalable backend solution for blog platforms. Built with Django REST Framework, it supports user authentication, post creation, and schema documentation. Ideal for developers looking to integrate blog functionality into web apps or mobile platforms.",
  image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
  technologies: ["Python", "Django", "Django REST Framework"],
  category: "api",
  features: [
    "User registration and authentication",
    "CRUD operations for blog posts",
    "Structured endpoints for post management",
    "Browsable API interface",
    "Schema documentation with DRF",
    "Scalable and secure architecture"
  ],
  challenges: "Designed clean API endpoints and ensured secure access control while maintaining scalability for future extensions",
  githubUrl: "https://github.com/sanket180/Blog-Api-DRF",
  codeSnippet: `# Blog post serializer
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at']
        read_only_fields = ['author', 'created_at']`

  },
  {
  id: 3,
  title: "TodoListApp",
  shortDescription: "Secure task management web app built with Django",
  longDescription: "TodoListApp-Django is a simple yet effective task management platform that allows users to create, update, and delete personal to-do items. Built entirely with Django, it includes user authentication, session control, and a clean interface for managing daily tasks.",
  image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
  technologies: ["Python", "Django", "HTML", "CSS"],
  category: "web-app",
  features: [
    "User registration and login system",
    "CRUD operations for personal tasks",
    "Session-based user data protection",
    "Simple and intuitive UI",
    "Secure backend with Django",
    "Responsive layout for desktop and mobile"
  ],
  challenges: "Ensured secure user authentication and built a clean, maintainable structure for task operations",
  githubUrl: "https://github.com/sanket180/TodoListApp-Django",
  liveUrl: "https://sanketdhotre.pythonanywhere.com/",
  codeSnippet: `# Django view for task creation
@login_required
def create_task(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.save()
            return redirect('task_list')
    else:
        form = TaskForm()
    return render(request, 'create_task.html', {'form': form})`

  }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing website...');
    // Initialize all functionality
    initializeNavigation();
    initializeHeroAnimations();
    initializeSkillsAnimation();
    initializePortfolioFilters();
    initializeProjectModals();
    initializeContactForm();
    initializeScrollEffects();
    initializeAnimations();
    initializeCopyEmail();
});

// Navigation functionality with proper offset calculations and working smooth scroll
function initializeNavigation() {
    console.log('Initializing navigation...');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = 70; // Fixed navbar height

    console.log('Found nav elements:', { hamburger, navMenu, navLinks: navLinks.length });

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links with proper offset - Fixed version
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            console.log('Clicking nav link with target:', targetId);
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                console.log('Target section found:', targetSection);
                
                if (targetSection) {
                    // Calculate proper offset based on section
                    let offset = navbarHeight;
                    
                    // For home section, go to very top
                    if (targetId === '#home') {
                        offset = 0;
                    } else {
                        // Add extra offset for other sections to ensure proper spacing
                        offset = navbarHeight + 10;
                    }
                    
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                    console.log('Scrolling to position:', targetPosition, 'for section:', targetId);
                    
                    // Use requestAnimationFrame for smoother scrolling
                    smoothScrollTo(Math.max(0, targetPosition));
                }
            }
        });
    });

    // Update active navigation link on scroll with proper thresholds
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Custom smooth scroll function that works reliably
function smoothScrollTo(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Smooth scroll duration in milliseconds
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = 70;
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + navbarHeight + 50;
    
    // Special handling for hero section
    if (window.pageYOffset < navbarHeight) {
        currentSection = 'home';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Hero section animations
function initializeHeroAnimations() {
    console.log('Initializing hero animations...');
    // Typing animation
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) {
        console.log('Typing element not found');
        return;
    }
    
    const text = "Web Developer Specializing in Python & Django";
    let index = 0;
    
    typingElement.textContent = '';
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeText, 1000);
}

// Skills animation with improved intersection observer
function initializeSkillsAnimation() {
    console.log('Initializing skills animation...');
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsSection = document.getElementById('about');
    
    console.log('Found skill items:', skillItems.length);
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Skills section in view, animating skills...');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                        const skillLevel = item.getAttribute('data-skill');
                        const progressBar = item.querySelector('.skill-progress');
                        
                        if (progressBar && skillLevel) {
                            setTimeout(() => {
                                progressBar.style.width = skillLevel + '%';
                            }, 300);
                        }
                    }, index * 150);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '-50px 0px'
    });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Portfolio filtering functionality
function initializePortfolioFilters() {
    console.log('Initializing portfolio filters...');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found portfolio items:', portfolioItems.length);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            console.log('Filter clicked:', filterValue);
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items with smooth animation
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                console.log('Item category:', itemCategory, 'Filter:', filterValue);
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    // Show item
                    console.log('Showing item');
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    item.style.position = 'relative';
                    item.style.left = 'auto';
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide item with animation
                    console.log('Hiding item');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project modal functionality
function initializeProjectModals() {
    console.log('Initializing project modals...');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');

    console.log('Found view details buttons:', viewDetailsButtons.length);
    console.log('Modal elements:', { modal, modalClose, modalOverlay, modalBody });

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const projectIndex = parseInt(this.getAttribute('data-project'));
            console.log('View details clicked for project:', projectIndex);
            const project = projectsData[projectIndex];
            
            if (project) {
                console.log('Showing project modal for:', project.title);
                showProjectModal(project);
            } else {
                console.error('Project not found at index:', projectIndex);
            }
        });
    });

    // Close modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Modal close clicked');
            closeModal();
        });
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            console.log('Modal overlay clicked');
            closeModal();
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            console.log('Escape key pressed, closing modal');
            closeModal();
        }
    });

    function showProjectModal(project) {
        console.log('Showing modal for project:', project.title);
        if (!modal || !modalBody) {
            console.error('Modal elements not found');
            return;
        }

        const modalContent = `
            <div class="project-detail-header">
                <h2 class="project-detail-title">${project.title}</h2>
                <p class="project-detail-description">${project.longDescription}</p>
                <div class="project-tech" style="margin-bottom: 24px;">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links" style="margin-bottom: 24px;">
                    <a href="${project.githubUrl}" target="_blank" class="btn btn--outline" style="margin-right: 16px;">GitHub Repository</a>
                    <a href="${project.liveUrl}" target="_blank" class="btn btn--primary">Live Demo</a>
                </div>
            </div>
            
            <div class="project-features">
                <h4>Key Features</h4>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-challenges">
                <h4>Technical Challenges & Solutions</h4>
                <p style="color: var(--color-text-secondary); line-height: 1.6;">${project.challenges}</p>
            </div>
            
            <div class="code-snippet">
                <h4>Code Preview</h4>
                <pre><code class="language-python">${project.codeSnippet}</code></pre>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modal.classList.remove('hidden');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Highlight code syntax if Prism is available
        if (window.Prism) {
            Prism.highlightAll();
        }
        
        console.log('Modal shown successfully');
    }

    function closeModal() {
        if (!modal) return;
        
        console.log('Closing modal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Contact form functionality
function initializeContactForm() {
    console.log('Initializing contact form...');
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }
    
    const formInputs = contactForm.querySelectorAll('.form-control');

    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Contact form submitted');
        
        let isValid = true;
        
        // Clear all previous errors first
        formInputs.forEach(input => {
            const fieldName = input.name;
            const errorElement = document.getElementById(`${fieldName}-error`);
            input.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
        
        // Validate each field
        formInputs.forEach(input => {
            const value = input.value.trim();
            const fieldName = input.name;
            const errorElement = document.getElementById(`${fieldName}-error`);
            
            // Validation rules
            if (!value) {
                showFieldError(input, errorElement, `${capitalize(fieldName)} is required`);
                isValid = false;
            } else if (fieldName === 'email' && !isValidEmail(value)) {
                showFieldError(input, errorElement, 'Please enter a valid email address');
                isValid = false;
            } else if (fieldName === 'message' && value.length < 10) {
                showFieldError(input, errorElement, 'Message must be at least 10 characters long');
                isValid = false;
            }
        });

        if (isValid) {
            submitForm();
        } else {
            // Scroll to first error with proper offset
            const firstError = contactForm.querySelector('.form-control.error');
            if (firstError) {
                const rect = firstError.getBoundingClientRect();
                const scrollTop = window.pageYOffset + rect.top - 100;
                smoothScrollTo(scrollTop);
                firstError.focus();
            }
        }
    });

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error on input
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(`${this.name}-error`);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
    });
}

// Show field error
function showFieldError(input, errorElement, message) {
    if (input && errorElement) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Validate individual field
function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (!errorElement) return true;
    
    input.classList.remove('error');
    errorElement.classList.remove('show');
    
    if (!value) {
        showFieldError(input, errorElement, `${capitalize(fieldName)} is required`);
        return false;
    } else if (fieldName === 'email' && !isValidEmail(value)) {
        showFieldError(input, errorElement, 'Please enter a valid email address');
        return false;
    } else if (fieldName === 'message' && value.length < 10) {
        showFieldError(input, errorElement, 'Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Submit form (simulation)
function submitForm() {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    if (!submitButton) return;
    
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg, var(--success-green), var(--color-teal-500))';
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Clear any remaining errors
        const errorElements = document.querySelectorAll('.error-message.show');
        const errorInputs = document.querySelectorAll('.form-control.error');
        
        errorElements.forEach(el => el.classList.remove('show'));
        errorInputs.forEach(input => input.classList.remove('error'));
        
        // Reset button after delay
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '';
            submitButton.style.background = '';
        }, 3000);
        
        // Show success notification
        showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
    }, 1500);
}

// Copy email functionality
function initializeCopyEmail() {
    console.log('Initializing copy email...');
    const copyEmailBtn = document.getElementById('copy-email');
    if (!copyEmailBtn) {
        console.log('Copy email button not found');
        return;
    }
    
    const email = copyEmailBtn.getAttribute('data-email');
    
    copyEmailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Copy email clicked');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                const copyText = this.querySelector('.copy-text');
                const successText = this.querySelector('.copy-success');
                
                if (copyText && successText) {
                    copyText.style.display = 'none';
                    successText.style.display = 'inline';
                    
                    setTimeout(() => {
                        copyText.style.display = 'inline';
                        successText.style.display = 'none';
                    }, 2000);
                }
                
                showNotification('Email address copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy email. Please try selecting the text manually.', 'error');
            });
        } else {
            // Fallback for browsers that don't support clipboard API
            showNotification('Email: ' + email, 'info');
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 300);
}

// Enhanced scroll effects with better navbar handling
function initializeScrollEffects() {
    console.log('Initializing scroll effects...');
    const navbar = document.getElementById('navbar');
    let scrollTopBtn = null;
    
    // Create scroll to top button
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    // Scroll event handler
    window.addEventListener('scroll', throttle(function() {
        const scrollY = window.scrollY;
        
        // Enhanced navbar background on scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.background = 'rgba(252, 252, 249, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(55, 118, 171, 0.15)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(252, 252, 249, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.borderBottom = '1px solid var(--color-border)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    }, 100));
    
    // Scroll to top functionality using our custom smooth scroll
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            smoothScrollTo(0);
        });
    }
}

// Initialize animations with improved intersection observer
function initializeAnimations() {
    console.log('Initializing animations...');
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .blog-card, .about-content > *, .contact-content > *');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const projectCard = item.querySelector('.project-card');
        
        if (projectCard) {
            item.addEventListener('mouseenter', function() {
                if (!this.classList.contains('hidden')) {
                    projectCard.style.transform = 'translateY(-10px)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                projectCard.style.transform = 'translateY(0)';
            });
        }
    });
}

// Utility function to throttle scroll events
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
    }
}

// Add loading animation for portfolio images
document.addEventListener('DOMContentLoaded', function() {
    const portfolioImages = document.querySelectorAll('.project-image img');
    
    portfolioImages.forEach(img => {
        img.addEventListener('load', function() {
            const portfolioItem = this.closest('.portfolio-item');
            if (portfolioItem) {
                portfolioItem.classList.remove('loading');
            }
        });
        
        // Add loading class initially if image not loaded
        if (!img.complete) {
            const portfolioItem = img.closest('.portfolio-item');
            if (portfolioItem) {
                portfolioItem.classList.add('loading');
            }
        }
    });
});

// Enhanced floating elements animation
function startFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const moveElement = () => {
            const x = Math.sin(Date.now() * 0.001 + index) * 50;
            const y = Math.cos(Date.now() * 0.0015 + index) * 30;
            element.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.2}deg)`;
            requestAnimationFrame(moveElement);
        };
        
        setTimeout(() => {
            moveElement();
        }, index * 1000);
    });
}

// Start floating animation when page loads
window.addEventListener('load', () => {
    startFloatingElements();
});

// Handle page visibility change to pause animations when tab is not active
document.addEventListener('visibilitychange', function() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (document.hidden) {
        floatingElements.forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    } else {
        floatingElements.forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
});

// Add subtle parallax effect to hero section with performance optimization
window.addEventListener('scroll', throttle(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        
        if (scrolled <= hero.offsetHeight) {
            // hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
}, 16));

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading when DOM is ready
document.addEventListener('DOMContentLoaded', preloadImages);
