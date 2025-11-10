export class AuthController {
    constructor() {
        // Hardcoded valid credentials (you can later import from DB.js)
        this.validCredentials = {
            username: "ruvinda",
            password: "ruvinda1234"
        };

        this.init();
    }

    // ==================== Initialize ====================
    init() {
        // Bind login form submit
        $("#login-form").on("submit", (e) => this.handleLogin(e));

        // Bind logout buttons (desktop + mobile)
        $("#desktop-logout-btn, #mobile-logout-btn").on("click", (e) =>
            this.handleLogout(e)
        );

        // Check login state
        this.checkAuthStatus();
    }

    // ==================== Handle Login ====================
    handleLogin(e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        // Validate inputs
        if (!username || !password) {
            Swal.fire("Error", "Please enter both username and password!", "error");
            return;
        }

        // Validate credentials
        if (
            username === this.validCredentials.username &&
            password === this.validCredentials.password
        ) {
            // Save to localStorage
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);

            this.showDashboard();

            Swal.fire({
                icon: "success",
                title: "Welcome!",
                text: `Logged in as ${username}`,
                timer: 1200,
                showConfirmButton: false,
            });
        } else {
            Swal.fire(
                "Invalid Credentials",
                "Please Re check your username and password.",
                "error"
            );
        }
    }

    // ==================== Handle Logout ====================
    handleLogout(e) {
        e.preventDefault();

        // Close sidebar if open
        if (window.mobileSidebar && window.mobileSidebar.isSidebarVisible()) {
            window.mobileSidebar.hideSidebar();
        }

        // Clear session
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");

        this.showLogin();

        Swal.fire({
            icon: "info",
            title: "Logged out",
            text: "You have been successfully logged out.",
            timer: 1000,
            showConfirmButton: false,
        });
    }

    // ==================== Check Auth State ====================
    checkAuthStatus() {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    // ==================== Show Dashboard ====================
    showDashboard() {
        $("#login-section").addClass("d-none");
        $("#dashboard-section").removeClass("d-none");

        // Update username in navbar
        const username = localStorage.getItem("username");
        if (username) {
            $("#username-display").text(username);
        }
    }

    // ==================== Show Login ====================
    showLogin() {
        $("#dashboard-section").addClass("d-none");
        $("#login-section").removeClass("d-none");
        $("#login-form")[0].reset();
    }
}
