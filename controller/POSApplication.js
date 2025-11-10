import { MobileSideBar } from "./MobileSideBar.js";
import { SectionController } from "./SectionController.js";
import { AuthController } from "./AuthController.js";
import { initializeCustomerManagement } from "./CustomerManagement.js";

export class POSApplication {
    constructor() {
        this.mobileSidebar = null;
        this.sectionController = null;
        this.authController = null;
        this.init();
    }

    init() {
        console.log("POSApplication: Starting initialization...");

        try {
            // Initialize all controllers
            this.mobileSidebar = new MobileSideBar();
            this.sectionController = new SectionController();
            this.authController = new AuthController();

            // Initialize feature controllers
            this.initializeFeatureControllers();

            // Make mobileSidebar globally accessible for logout
            window.mobileSidebar = this.mobileSidebar;

            // Handle screen resizing
            $(window).on("resize", () => this.handleResize());

            console.log("POS System initialized successfully");
        } catch (error) {
            console.error("POSApplication: Error during initialization:", error);
        }
    }

    initializeFeatureControllers() {
        // Listen for section changes using jQuery
        $(document).on('sectionChanged', (event, section) => {
            if (section === 'customer-management') {
                console.log("Customer management section activated");
                setTimeout(() => {
                    initializeCustomerManagement();
                }, 100);
            }
        });

        // Also trigger when sidebar links are clicked
        $('.sidebar .nav-link').on('click', (e) => {
            const section = $(e.currentTarget).data('section');
            if (section === 'customer-management') {
                console.log("Customer management link clicked");
                setTimeout(() => {
                    initializeCustomerManagement();
                }, 100);
            }
        });

        // Initialize if already on customer management page
        if ($('#customer-management-content').is(':visible')) {
            console.log("Already on customer management page, initializing...");
            setTimeout(() => {
                initializeCustomerManagement();
            }, 100);
        }
    }

    handleResize() {
        // Auto-close sidebar when switching to desktop view
        if ($(window).width() > 768 && this.mobileSidebar.isSidebarVisible()) {
            this.mobileSidebar.hideSidebar();
        }
    }
}