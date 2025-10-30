export class AuthController {
    constructor() {
        this.loginForm = document.getElementById('login-form');
        this.loginSection = document.getElementById('login-section');
        this.dashboardSection = document.getElementById('dashboard-section');
        this.desktopLogoutBtn = document.getElementById('desktop-logout-btn');
        this.mobileLogoutBtn = document.getElementById('mobile-logout-btn');
        this.usernameDisplay = document.getElementById('username-display');

        this.validCredentials = {
            username: 'ruvinda',
            password: 'ruvinda1234'
        };

        this.init();
    }

    init() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (this.desktopLogoutBtn) {
            this.desktopLogoutBtn.addEventListener('click', (e) => this.handleLogout(e));
        }

        if (this.mobileLogoutBtn) {
            this.mobileLogoutBtn.addEventListener('click', (e) => this.handleLogout(e));
        }

        // Check if user is already logged in (from localStorage)
        this.checkAuthStatus();
    }

    handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validate credentials
        if (username === this.validCredentials.username && password === this.validCredentials.password) {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            this.showDashboard();
        } else {
            alert('Invalid username or password! Please use:\nUsername: ruvinda\nPassword: ruvinda1234');
        }
    }

    handleLogout(e) {
        e.preventDefault();

        // Close mobile sidebar if open
        if (window.mobileSidebar && window.mobileSidebar.isSidebarVisible()) {
            window.mobileSidebar.hideSidebar();
        }

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
        if (this.loginSection) this.loginSection.classList.add('d-none');
        if (this.dashboardSection) this.dashboardSection.classList.remove('d-none');

        // Update username in navbar if available
        const username = localStorage.getItem('username');
        if (username && this.usernameDisplay) {
            this.usernameDisplay.textContent = username;
        }
    }

    showLogin() {
        if (this.dashboardSection) this.dashboardSection.classList.add('d-none');
        if (this.loginSection) this.loginSection.classList.remove('d-none');

        // Reset form
        if (this.loginForm) {
            this.loginForm.reset();
        }
    }
}