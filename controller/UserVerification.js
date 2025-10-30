document.addEventListener('DOMContentLoaded', function() {
    console.log('POS System loaded');

    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));

            this.classList.add('active');

            contentSections.forEach(section => section.classList.add('d-none'));

            const targetSection = this.getAttribute('data-section');
            document.getElementById(`${targetSection}-content`).classList.remove('d-none');
        });
    });

    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            loginSection.classList.add('d-none');
            dashboardSection.classList.remove('d-none');
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();

            dashboardSection.classList.add('d-none');
            loginSection.classList.remove('d-none');

            if (loginForm) loginForm.reset();
        });
    }
});