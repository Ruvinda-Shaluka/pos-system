export class MobileSideBar {
    constructor() {
        this.init();
    }

    init() {
        console.log("MobileSideBar: Initializing...");

        // Use event delegation
        $(document)
            .on("click", "#sidebarToggle", () => this.toggleSidebar())
            .on("click", "#sidebarClose", () => this.hideSidebar())
            .on("click", "#sidebarOverlay", () => this.hideSidebar())
            .on("click", ".sidebar .nav-link", (e) => {
                if ($(window).width() <= 768) {
                    this.hideSidebar();
                }
            });

        $(window).on("resize", () => {
            if ($(window).width() > 768) {
                this.hideSidebar();
            }
        });
    }

    toggleSidebar() {
        $("#sidebar, #sidebarOverlay").toggleClass("show");
        $("body").css("overflow", this.isSidebarVisible() ? "hidden" : "");
    }

    showSidebar() {
        $("#sidebar, #sidebarOverlay").addClass("show");
        $("body").css("overflow", "hidden");
    }

    hideSidebar() {
        $("#sidebar, #sidebarOverlay").removeClass("show");
        $("body").css("overflow", "");
    }

    isSidebarVisible() {
        return $("#sidebar").hasClass("show");
    }
}