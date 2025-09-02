// Portfolio Website JavaScript

// Application data
const portfolioData = {
  "profile": {
    "name": "Your Name",
    "title": "Computer Science Student & Aspiring Software Developer",
    "email": "your.email@example.com",
    "phone": "+91-XXXXXXXXXX",
    "bio": "Passionate computer science student with a strong foundation in programming, algorithms, and emerging technologies like AI/ML and quantum computing. Currently preparing for placements while working on innovative projects that combine theoretical knowledge with practical applications.",
    "location": "India",
    "resumeLink": "https://your-resume-link.pdf"
  },
  "skills": [
    {"name": "Python", "category": "Programming", "proficiency": 85, "years": 2.5},
    {"name": "Java", "category": "Programming", "proficiency": 80, "years": 2},
    {"name": "JavaScript", "category": "Web Development", "proficiency": 75, "years": 1.5},
    {"name": "React", "category": "Web Development", "proficiency": 70, "years": 1},
    {"name": "FastAPI", "category": "Backend", "proficiency": 75, "years": 0.5},
    {"name": "PostgreSQL", "category": "Database", "proficiency": 70, "years": 1},
    {"name": "Machine Learning", "category": "AI/ML", "proficiency": 65, "years": 1},
    {"name": "Data Structures & Algorithms", "category": "Computer Science", "proficiency": 80, "years": 2},
    {"name": "Git/GitHub", "category": "Tools", "proficiency": 85, "years": 2},
    {"name": "Docker", "category": "DevOps", "proficiency": 60, "years": 0.5}
  ],
  "projects": [
    {
      "id": 1,
      "title": "Me-API Playground",
      "description": "A comprehensive personal portfolio API with advanced querying capabilities, built with FastAPI and PostgreSQL. Features CRUD operations, search functionality, and auto-generated documentation.",
      "technologies": ["Python", "FastAPI", "PostgreSQL", "React", "Docker"],
      "startDate": "2025-08-01",
      "endDate": "2025-09-02",
      "demoUrl": "https://me-api-demo.vercel.app",
      "repoUrl": "https://github.com/yourusername/me-api-playground",
      "featured": true,
      "status": "completed"
    },
    {
      "id": 2,
      "title": "Polynomial Solver & Validator",
      "description": "Java-based application for solving polynomial equations with comprehensive test case validation. Implements multiple solving algorithms and provides detailed analysis of roots.",
      "technologies": ["Java", "JSON", "JUnit", "Maven"],
      "startDate": "2025-09-01",
      "endDate": "2025-09-02",
      "demoUrl": null,
      "repoUrl": "https://github.com/yourusername/polynomial-solver",
      "featured": true,
      "status": "completed"
    },
    {
      "id": 3,
      "title": "Machine Learning Study Tracker",
      "description": "Web application to track progress through ML courses and projects. Features progress visualization, resource recommendations, and study analytics.",
      "technologies": ["Python", "Flask", "SQLite", "Chart.js"],
      "startDate": "2025-07-01",
      "endDate": "2025-08-15",
      "demoUrl": "https://ml-tracker-demo.herokuapp.com",
      "repoUrl": "https://github.com/yourusername/ml-study-tracker",
      "featured": false,
      "status": "completed"
    },
    {
      "id": 4,
      "title": "Quantum Computing Learning Path",
      "description": "Interactive learning platform for quantum computing fundamentals with visual circuit simulators and progress tracking.",
      "technologies": ["Python", "Qiskit", "JavaScript", "D3.js"],
      "startDate": "2025-06-01",
      "endDate": null,
      "demoUrl": null,
      "repoUrl": "https://github.com/yourusername/quantum-learning",
      "featured": false,
      "status": "in-progress"
    }
  ],
  "apiEndpoints": [
    {
      "method": "GET",
      "endpoint": "/api/v1/profile",
      "description": "Get complete user profile",
      "sampleResponse": {
        "name": "Your Name",
        "email": "your.email@example.com",
        "bio": "Passionate CS student...",
        "skills": ["Python", "Java", "React"],
        "projects": 4
      }
    },
    {
      "method": "GET",
      "endpoint": "/api/v1/projects?skill=python",
      "description": "Get projects filtered by skill",
      "sampleResponse": {
        "projects": [
          {"title": "Me-API Playground", "technologies": ["Python", "FastAPI"]},
          {"title": "ML Study Tracker", "technologies": ["Python", "Flask"]}
        ]
      }
    },
    {
      "method": "GET",
      "endpoint": "/api/v1/skills/top?limit=5",
      "description": "Get top skills by proficiency",
      "sampleResponse": {
        "skills": [
          {"name": "Python", "proficiency": 85},
          {"name": "Git/GitHub", "proficiency": 85},
          {"name": "Java", "proficiency": 80}
        ]
      }
    },
    {
      "method": "GET",
      "endpoint": "/api/v1/health",
      "description": "Health check endpoint",
      "sampleResponse": {
        "status": "ok",
        "timestamp": "2025-09-02T19:49:00Z",
        "database": "healthy"
      }
    }
  ]
};

// State
let currentTheme = localStorage.getItem('theme') || 'light';
let currentSkillFilter = 'all';
let currentProjectFilter = 'all';
let filteredProjects = [...portfolioData.projects];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    initializeTheme();
    initializeNavigation();
    initializeSkillsSection();
    initializeProjectsSection();
    initializeApiDemo();
    initializeContactForm();
    initializeAnimations();
    
    // Set initial theme
    applyTheme(currentTheme);
});

// Theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon();
        console.log('Theme toggle initialized');
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    console.log('Theme toggled to:', currentTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    console.log('Applied theme:', theme);
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.slice(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    console.log('Scrolling to section:', targetId);
                }
            }
            
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    console.log('Navigation initialized');
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Skills section functionality
function initializeSkillsSection() {
    renderSkills();
    setupSkillFilters();
    console.log('Skills section initialized');
}

function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;
    
    const skills = currentSkillFilter === 'all' 
        ? portfolioData.skills 
        : portfolioData.skills.filter(skill => skill.category === currentSkillFilter);

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card fade-in">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-proficiency">${skill.proficiency}%</span>
            </div>
            <div class="skill-category">${skill.category}</div>
            <div class="skill-bar">
                <div class="skill-progress" data-width="${skill.proficiency}%"></div>
            </div>
            <div class="skill-years">${skill.years} years experience</div>
        </div>
    `).join('');

    // Animate skill bars
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }, 100);
}

function setupSkillFilters() {
    const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
    
    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter
            currentSkillFilter = this.getAttribute('data-category');
            renderSkills();
            console.log('Skills filtered by:', currentSkillFilter);
        });
    });
}

// Projects section functionality
function initializeProjectsSection() {
    renderProjects();
    setupProjectFilters();
    setupProjectSearch();
    console.log('Projects section initialized');
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                No projects match your search criteria.
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card ${project.featured ? 'featured' : ''} fade-in">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
                <div class="project-status ${project.status}">
                    ${project.status === 'completed' ? '✅ Completed' : '🚧 In Progress'}
                </div>
                <div class="project-links">
                    ${project.demoUrl ? `
                        <a href="${project.demoUrl}" target="_blank" class="project-link">
                            Live Demo
                        </a>
                    ` : ''}
                    <a href="${project.repoUrl}" target="_blank" class="project-link">
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function setupProjectFilters() {
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    
    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter
            currentProjectFilter = this.getAttribute('data-filter');
            filterProjects();
            console.log('Projects filtered by:', currentProjectFilter);
        });
    });
}

function setupProjectSearch() {
    const projectSearch = document.getElementById('project-search');
    if (projectSearch) {
        projectSearch.addEventListener('input', function() {
            console.log('Search term:', this.value);
            filterProjects();
        });
    }
}

function filterProjects() {
    const projectSearch = document.getElementById('project-search');
    const searchTerm = projectSearch ? projectSearch.value.toLowerCase() : '';
    
    filteredProjects = portfolioData.projects.filter(project => {
        // Filter by technology
        const matchesFilter = currentProjectFilter === 'all' || 
            project.technologies.some(tech => tech.toLowerCase().includes(currentProjectFilter.toLowerCase()));
        
        // Filter by search term
        const matchesSearch = searchTerm === '' || 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
        
        return matchesFilter && matchesSearch;
    });
    
    renderProjects();
}

// API Demo functionality
function initializeApiDemo() {
    populateEndpointSelect();
    setupApiDemo();
    console.log('API Demo initialized');
}

function populateEndpointSelect() {
    const endpointSelect = document.getElementById('endpoint-select');
    if (!endpointSelect) return;
    
    endpointSelect.innerHTML = '<option value="">Select an endpoint to test</option>' +
        portfolioData.apiEndpoints.map((endpoint, index) => `
            <option value="${index}">
                ${endpoint.method} ${endpoint.endpoint}
            </option>
        `).join('');
}

function setupApiDemo() {
    const endpointSelect = document.getElementById('endpoint-select');
    const testEndpointBtn = document.getElementById('test-endpoint');
    
    if (endpointSelect) {
        endpointSelect.addEventListener('change', function() {
            const selectedIndex = this.value;
            if (selectedIndex !== '') {
                displayEndpointInfo(parseInt(selectedIndex));
            } else {
                clearEndpointInfo();
            }
        });
    }

    if (testEndpointBtn) {
        testEndpointBtn.addEventListener('click', testSelectedEndpoint);
    }
}

function displayEndpointInfo(index) {
    const endpoint = portfolioData.apiEndpoints[index];
    const endpointDetails = document.getElementById('endpoint-details');
    
    if (endpointDetails) {
        endpointDetails.innerHTML = `
            <div class="endpoint-method">${endpoint.method}</div>
            <div class="endpoint-url">${endpoint.endpoint}</div>
            <p>${endpoint.description}</p>
        `;
    }
}

function clearEndpointInfo() {
    const endpointDetails = document.getElementById('endpoint-details');
    if (endpointDetails) {
        endpointDetails.innerHTML = '<p>Select an endpoint to view details</p>';
    }
}

async function testSelectedEndpoint() {
    const endpointSelect = document.getElementById('endpoint-select');
    if (!endpointSelect) return;
    
    const selectedIndex = endpointSelect.value;
    if (selectedIndex === '') {
        alert('Please select an endpoint to test');
        return;
    }

    const endpoint = portfolioData.apiEndpoints[parseInt(selectedIndex)];
    const loadingIndicator = document.getElementById('loading-indicator');
    const responseOutput = document.getElementById('response-output');
    
    // Show loading indicator
    if (loadingIndicator) {
        loadingIndicator.classList.remove('hidden');
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.classList.add('hidden');
    }
    
    // Display mock response
    const response = {
        status: 200,
        timestamp: new Date().toISOString(),
        endpoint: endpoint.endpoint,
        method: endpoint.method,
        data: endpoint.sampleResponse
    };
    
    if (responseOutput) {
        responseOutput.textContent = JSON.stringify(response, null, 2);
    }
    
    console.log('API endpoint tested:', endpoint.endpoint);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
        
        console.log('Contact form submitted:', data);
    });
}

// Animation functionality
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Re-observe new elements when they're added (for dynamic content)
    const mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const animateElements = node.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
                    animateElements.forEach(el => {
                        observer.observe(el);
                    });
                }
            });
        });
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('Animations initialized');
}

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

// Add debounced scroll listener for performance
const debouncedScrollHandler = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedScrollHandler);

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    const navMenu = document.getElementById('nav-menu');
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    
    // Theme toggle with Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

// Console welcome message
console.log(`
🚀 Welcome to My Portfolio!
   
This website showcases my projects and demonstrates the Me-API Playground.
   
Built with:
- Vanilla JavaScript (ES6+)
- CSS Grid & Flexbox
- Intersection Observer API
- Local Storage API
- Modern web standards

Feel free to explore the code and reach out if you have any questions!
`);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        portfolioData,
        toggleTheme,
        filterProjects
    };
}