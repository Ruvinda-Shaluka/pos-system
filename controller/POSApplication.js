// controller/POSApplication.js
import { MobileSideBar } from "./MobileSideBar.js";
import { SectionController } from "./SectionController.js";
import { AuthController } from "./AuthController.js";
import { initializeCustomerManagement } from "./CustomerManagement.js";
import { initializeItemManagement } from "./ItemManagement.js";
import { initializeOrderManagement, update_dashboard_stats, load_recent_orders } from "./OrderManagement.js";
import { get_customers } from "../model/CustomerModel.js";
import { get_items } from "../model/ItemModel.js";
import { initializeDummyData } from "../db/InitializeData.js";

export class POSApplication {
    constructor() {
        this.mobileSidebar = null;
        this.sectionController = null;
        this.authController = null;
        this.customerManagementInitialized = false;
        this.itemManagementInitialized = false;
        this.orderManagementInitialized = false;
        this.init();
    }

    init() {
        console.log("POSApplication: Starting initialization...");

        try {
            // Initialize dummy data for testing (comment this out if you don't want dummy data)
            this.initializeDummyData();

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
            this.fallbackInitialization();
        }
    }

    initializeDummyData() {
        try {
            console.log("Initializing dummy data...");
            initializeDummyData();
            console.log("Dummy data initialized successfully");
        } catch (error) {
            console.warn("Could not initialize dummy data:", error);
            console.log("Continuing without dummy data...");
        }
    }

    initializeFeatureControllers() {
        // Listen for section changes using jQuery
        $(document).on('sectionChanged', (event, section) => {
            console.log(`Section changed to: ${section}`);

            if (section === 'customer-management' && !this.customerManagementInitialized) {
                console.log("Customer management section activated");
                setTimeout(() => {
                    try {
                        initializeCustomerManagement();
                        this.customerManagementInitialized = true;
                    } catch (error) {
                        console.error("Error initializing customer management:", error);
                    }
                }, 100);
            } else if (section === 'item-management' && !this.itemManagementInitialized) {
                console.log("Item management section activated");
                setTimeout(() => {
                    try {
                        initializeItemManagement();
                        this.itemManagementInitialized = true;
                    } catch (error) {
                        console.error("Error initializing item management:", error);
                    }
                }, 100);
            } else if (section === 'place-order' && !this.orderManagementInitialized) {
                console.log("Place order section activated");
                setTimeout(() => {
                    try {
                        initializeOrderManagement();
                        this.orderManagementInitialized = true;
                    } catch (error) {
                        console.error("Error initializing order management:", error);
                    }
                }, 100);
            } else if (section === 'dashboard') {
                console.log("Dashboard section activated");
                this.initializeDashboardStats();
            }
        });

        // Initialize dashboard immediately
        this.initializeDashboardOnStartup();

        // Initialize specific sections if they are already visible
        this.initializeVisibleSections();
    }

    initializeDashboardOnStartup() {
        // Always initialize dashboard stats on startup
        console.log("Initializing dashboard on startup...");
        this.initializeDashboardStats();

        // Set up periodic dashboard updates (every 30 seconds)
        setInterval(() => {
            if ($('#dashboard-content').is(':visible')) {
                this.initializeDashboardStats();
            }
        }, 30000);
    }

    initializeVisibleSections() {
        // Initialize if already on specific pages
        if ($('#customer-management-content').is(':visible') && !this.customerManagementInitialized) {
            console.log("Already on customer management page, initializing...");
            setTimeout(() => {
                try {
                    initializeCustomerManagement();
                    this.customerManagementInitialized = true;
                } catch (error) {
                    console.error("Error initializing customer management:", error);
                }
            }, 100);
        }

        if ($('#item-management-content').is(':visible') && !this.itemManagementInitialized) {
            console.log("Already on item management page, initializing...");
            setTimeout(() => {
                try {
                    initializeItemManagement();
                    this.itemManagementInitialized = true;
                } catch (error) {
                    console.error("Error initializing item management:", error);
                }
            }, 100);
        }

        if ($('#place-order-content').is(':visible') && !this.orderManagementInitialized) {
            console.log("Already on place order page, initializing...");
            setTimeout(() => {
                try {
                    initializeOrderManagement();
                    this.orderManagementInitialized = true;
                } catch (error) {
                    console.error("Error initializing order management:", error);
                }
            }, 100);
        }
    }

    initializeDashboardStats() {
        try {
            console.log("Updating dashboard stats...");

            // Update customer count
            const customers = get_customers();
            $("#total-customers").text(customers.length);
            console.log(`Total customers: ${customers.length}`);

            // Update item count
            const items = get_items();
            $("#total-items").text(items.length);
            console.log(`Total items: ${items.length}`);

            // Update order stats
            update_dashboard_stats();
            load_recent_orders();

            console.log("Dashboard stats updated successfully");
        } catch (error) {
            console.error("Error updating dashboard stats:", error);
            this.setDefaultDashboardValues();
        }
    }

    setDefaultDashboardValues() {
        // Set default values if there's an error
        $("#total-customers").text("0");
        $("#total-items").text("0");
        $("#today-orders").text("0");
        $("#today-revenue").text("$0.00");

        const $recentOrdersTable = $("#recent-orders-table tbody");
        if ($recentOrdersTable.length) {
            $recentOrdersTable.empty();
            $recentOrdersTable.append(`
                <tr>
                    <td colspan="7" class="text-center text-muted">Unable to load recent orders</td>
                </tr>
            `);
        }
    }

    handleResize() {
        try {
            // Auto-close sidebar when switching to desktop view
            if ($(window).width() > 768 && this.mobileSidebar && this.mobileSidebar.isSidebarVisible()) {
                this.mobileSidebar.hideSidebar();
            }
        } catch (error) {
            console.error("Error handling resize:", error);
        }
    }

    fallbackInitialization() {
        console.log("Using fallback initialization...");

        // Basic auth check fallback
        try {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn === "true") {
                $("#login-section").addClass("d-none");
                $("#dashboard-section").removeClass("d-none");
            }
        } catch (error) {
            console.error("Fallback initialization failed:", error);
        }
    }

    // Method to reset all initialized flags (useful for testing)
    resetInitializationFlags() {
        this.customerManagementInitialized = false;
        this.itemManagementInitialized = false;
        this.orderManagementInitialized = false;
        console.log("Initialization flags reset");
    }
}