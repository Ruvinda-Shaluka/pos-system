// Mobile Sidebar Functionality
class MobileSidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.sidebarClose = document.getElementById('sidebarClose');
        this.mainContent = document.getElementById('mainContent');

        this.init();
    }

    init() {
        // Toggle sidebar when hamburger menu is clicked
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Close sidebar when X button is clicked
        if (this.sidebarClose) {
            this.sidebarClose.addEventListener('click', () => {
                this.hideSidebar();
            });
        }

        // Close sidebar when overlay is clicked
        if (this.sidebarOverlay) {
            this.sidebarOverlay.addEventListener('click', () => {
                this.hideSidebar();
            });
        }

        // Close sidebar when a nav link is clicked (on mobile)
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.hideSidebar();
                }
            });
        });

        // Close sidebar when window is resized to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.hideSidebar();
            }
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('show');
        this.sidebarOverlay.classList.toggle('show');
        document.body.style.overflow = this.sidebar.classList.contains('show') ? 'hidden' : '';
    }

    showSidebar() {
        this.sidebar.classList.add('show');
        this.sidebarOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideSidebar() {
        this.sidebar.classList.remove('show');
        this.sidebarOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    isSidebarVisible() {
        return this.sidebar.classList.contains('show');
    }
}

// Section Navigation Controller
class SectionController {
    constructor() {
        this.navLinks = document.querySelectorAll('.sidebar .nav-link');
        this.contentSections = document.querySelectorAll('.content-section');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.getAttribute('data-section'));
            });
        });
    }

    showSection(sectionName) {
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to clicked link
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Hide all content sections
        this.contentSections.forEach(section => section.classList.add('d-none'));

        // Show the selected content section
        document.getElementById(`${sectionName}-content`).classList.remove('d-none');
    }
}

// Authentication Controller
class AuthController {
    constructor() {
        this.loginForm = document.getElementById('login-form');
        this.loginSection = document.getElementById('login-section');
        this.dashboardSection = document.getElementById('dashboard-section');
        this.logoutBtn = document.getElementById('logout-btn');

        this.init();
    }

    init() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', (e) => this.handleLogout(e));
        }

        // Check if user is already logged in (from localStorage)
        this.checkAuthStatus();
    }

    handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation - in real app, you'd check against database
        if (username && password) {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            this.showDashboard();
        } else {
            alert('Please enter both username and password');
        }
    }

    handleLogout(e) {
        e.preventDefault();

        // Clear login state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');

        this.showLogin();
    }

    checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    showDashboard() {
        this.loginSection.classList.add('d-none');
        this.dashboardSection.classList.remove('d-none');

        // Update username in navbar if available
        const username = localStorage.getItem('username');
        if (username) {
            const usernameElement = document.querySelector('.navbar .nav-link.dropdown-toggle');
            if (usernameElement) {
                usernameElement.innerHTML = `<i class="bi bi-person-circle me-1"></i> ${username}`;
            }
        }
    }

    showLogin() {
        this.dashboardSection.classList.add('d-none');
        this.loginSection.classList.remove('d-none');

        // Reset form
        if (this.loginForm) {
            this.loginForm.reset();
        }
    }
}

// Main Application
class POSApplication {
    constructor() {
        this.mobileSidebar = null;
        this.sectionController = null;
        this.authController = null;
        this.init();
    }

    init() {
        // Initialize all controllers
        this.mobileSidebar = new MobileSidebar();
        this.sectionController = new SectionController();
        this.authController = new AuthController();

        // Add window resize handler
        window.addEventListener('resize', () => this.handleResize());

        console.log('POS System initialized successfully');
    }

    handleResize() {
        // Auto-close sidebar when switching to desktop
        if (window.innerWidth > 768 && this.mobileSidebar.isSidebarVisible()) {
            this.mobileSidebar.hideSidebar();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new POSApplication();
});

// Global functions for table actions (to be implemented later)
function editCustomer(customerId) {
    console.log('Edit customer:', customerId);
    // Implementation for editing customer
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        console.log('Delete customer:', customerId);
        // Implementation for deleting customer
    }
}