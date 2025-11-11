import { MobileSideBar } from "./MobileSideBar.js";
import { SectionController } from "./SectionController.js";
import { AuthController } from "./AuthController.js";
import { initializeCustomerManagement } from "./CustomerManagement.js";
import { initializeItemManagement } from "./ItemManagement.js";
import { initializeOrderManagement, update_dashboard_stats, load_recent_orders } from "./OrderManagement.js";
import { get_customers } from "../model/CustomerModel.js";
import { get_items } from "../model/ItemModel.js";

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

            // Initialize dashboard stats
            this.initializeDashboardStats();

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
            } else if (section === 'item-management') {
                console.log("Item management section activated");
                setTimeout(() => {
                    initializeItemManagement();
                }, 100);
            } else if (section === 'place-order') {
                console.log("Place order section activated");
                setTimeout(() => {
                    initializeOrderManagement();
                }, 100);
            } else if (section === 'dashboard') {
                console.log("Dashboard section activated");
                this.initializeDashboardStats();
            }
        });

        // Initialize if already on specific pages
        if ($('#customer-management-content').is(':visible')) {
            console.log("Already on customer management page, initializing...");
            setTimeout(() => {
                initializeCustomerManagement();
            }, 100);
        }

        if ($('#item-management-content').is(':visible')) {
            console.log("Already on item management page, initializing...");
            setTimeout(() => {
                initializeItemManagement();
            }, 100);
        }

        if ($('#place-order-content').is(':visible')) {
            console.log("Already on place order page, initializing...");
            setTimeout(() => {
                initializeOrderManagement();
            }, 100);
        }

        // Always initialize dashboard stats
        this.initializeDashboardStats();
    }

    initializeDashboardStats() {
        // Update customer count
        const customers = get_customers();
        $("#total-customers").text(customers.length);

        // Update item count
        const items = get_items();
        $("#total-items").text(items.length);

        // Update order stats
        update_dashboard_stats();
        load_recent_orders();
    }

    handleResize() {
        // Auto-close sidebar when switching to desktop view
        if ($(window).width() > 768 && this.mobileSidebar.isSidebarVisible()) {
            this.mobileSidebar.hideSidebar();
        }
    }
}