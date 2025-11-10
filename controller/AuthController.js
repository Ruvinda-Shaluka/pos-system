export class AuthController {
    constructor() {
        this.validCredentials = {
            username: "ruvinda",
            password: "ruvinda1234"
        };
        this.init();
    }

    init() {
        console.log("AuthController: Initializing...");

        // Use event delegation for dynamic elements
        $(document)
            .on("submit", "#login-form", (e) => this.handleLogin(e))
            .on("click", "#desktop-logout-btn, #mobile-logout-btn", (e) => this.handleLogout(e));

        this.checkAuthStatus();
    }

    handleLogin(e) {
        e.preventDefault();
        console.log("AuthController: Login attempt");

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        if (!username || !password) {
            Swal.fire("Error", "Please enter both username and password!", "error");
            return;
        }

        if (username === this.validCredentials.username && password === this.validCredentials.password) {
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
            Swal.fire("Invalid Credentials", "Please re-check your username and password.", "error");
        }
    }

    handleLogout(e) {
        e.preventDefault();

        if (window.mobileSidebar) {
            window.mobileSidebar.hideSidebar();
        }

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

    checkAuthStatus() {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    showDashboard() {
        $("#login-section").addClass("d-none");
        $("#dashboard-section").removeClass("d-none");

        const username = localStorage.getItem("username");
        if (username) {
            $("#username-display").text(username);
        }
    }

    showLogin() {
        $("#dashboard-section").addClass("d-none");
        $("#login-section").removeClass("d-none");
        $("#login-form").trigger("reset");
    }
}