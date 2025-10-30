import { MobileSidebar } from './MobileSidebar.js';
import { SectionController } from './SectionController.js';
import { AuthController } from './AuthController.js';

export class POSApplication {
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

        // Make mobileSidebar globally accessible for logout
        window.mobileSidebar = this.mobileSidebar;

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