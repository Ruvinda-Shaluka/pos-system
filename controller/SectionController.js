export class SectionController {
    constructor() {
        this.$navLinks = $('.sidebar .nav-link');
        this.$contentSections = $('.content-section');
        this.init();
    }

    init() {
        this.$navLinks.on('click', (e) => {
            e.preventDefault();
            this.showSection($(e.currentTarget).data('section'));
        });
    }

    showSection(sectionName) {
        // Remove active class from all links
        this.$navLinks.removeClass('active');

        // Add active class to clicked link
        const $activeLink = $(`[data-section="${sectionName}"]`);
        if ($activeLink.length) {
            $activeLink.addClass('active');
        }

        // Hide all content sections
        this.$contentSections.addClass('d-none');

        // Show the selected content section
        const $targetSection = $(`#${sectionName}-content`);
        if ($targetSection.length) {
            $targetSection.removeClass('d-none');
        }
    }
}