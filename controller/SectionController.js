export class SectionController {
    constructor() {
        this.init();
    }

    init() {
        // Use event delegation for sidebar links
        $(document).on('click', '.sidebar .nav-link', (e) => {
            e.preventDefault();
            const section = $(e.currentTarget).data('section');
            this.showSection(section);

            // Trigger custom event for section change
            $(document).trigger('sectionChanged', [section]);
        });

        // Show dashboard by default
        this.showSection('dashboard');
    }

    showSection(sectionName) {
        // Remove active class from all links
        $('.sidebar .nav-link').removeClass('active');

        // Add active class to clicked link
        $(`[data-section="${sectionName}"]`).addClass('active');

        // Hide all content sections
        $('.content-section').addClass('d-none');

        // Show the selected content section
        $(`#${sectionName}-content`).removeClass('d-none');
    }
}