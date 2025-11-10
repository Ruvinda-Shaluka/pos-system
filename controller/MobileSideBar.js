export class MobileSidebar {
    constructor() {
        // Cache all required DOM elements
        this.$sidebar = $("#sidebar");
        this.$sidebarOverlay = $("#sidebarOverlay");
        this.$sidebarToggle = $("#sidebarToggle");
        this.$sidebarClose = $("#sidebarClose");
        this.$mainContent = $("#mainContent");

        this.init();
    }

    // ==================== Initialize Listeners ====================
    init() {
        const self = this;

        // Toggle sidebar when hamburger menu is clicked
        this.$sidebarToggle.on("click", function () {
            self.toggleSidebar();
        });

        // Close sidebar when X button is clicked
        this.$sidebarClose.on("click", function () {
            self.hideSidebar();
        });

        // Close sidebar when overlay is clicked
        this.$sidebarOverlay.on("click", function () {
            self.hideSidebar();
        });

        // Close sidebar when a sidebar nav link is clicked (mobile only)
        $(".sidebar .nav-link").on("click", function () {
            if ($(window).width() <= 768) {
                self.hideSidebar();
            }
        });

        // Auto-close sidebar when resized to desktop
        $(window).on("resize", function () {
            if ($(window).width() > 768) {
                self.hideSidebar();
            }
        });
    }

    // ==================== Toggle Sidebar ====================
    toggleSidebar() {
        this.$sidebar.toggleClass("show");
        this.$sidebarOverlay.toggleClass("show");

        $("body").css(
            "overflow",
            this.$sidebar.hasClass("show") ? "hidden" : ""
        );
    }

    // ==================== Show Sidebar ====================
    showSidebar() {
        this.$sidebar.addClass("show");
        this.$sidebarOverlay.addClass("show");
        $("body").css("overflow", "hidden");
    }

    // ==================== Hide Sidebar ====================
    hideSidebar() {
        this.$sidebar.removeClass("show");
        this.$sidebarOverlay.removeClass("show");
        $("body").css("overflow", "");
    }

    // ==================== Check Sidebar Visibility ====================
    isSidebarVisible() {
        return this.$sidebar.hasClass("show");
    }
}
