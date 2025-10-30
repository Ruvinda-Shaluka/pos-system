export class SectionController {
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
        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Hide all content sections
        this.contentSections.forEach(section => section.classList.add('d-none'));

        // Show the selected content section
        const targetSection = document.getElementById(`${sectionName}-content`);
        if (targetSection) {
            targetSection.classList.remove('d-none');
        }
    }
}