const sidebarButton = document.getElementById("sidebar-button");
const sidebar = document.querySelector("ul");
const body = document.querySelector("body");
const mediaQuery = window.matchMedia("(min-width: 1000px)");
const outsideSidebar = document.querySelectorAll("body *:not(.navigation):not(#sidebar-button):not(nav):not(nav *)");
const sidebarButtonToOpenContent = '<i class="fa-solid fa-bars"></i>';
const sidebarButtonToCloseContent = '<i class="fa-solid fa-xmark"></i>';
let sidebarIsOpen = false;

sidebarButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the document's click handler from firing
    toggleSidebar();
});

// Toggle sidebar
function toggleSidebar() {
    if (sidebarIsOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

// Open sidebar
function openSidebar() {
    sidebarButton.innerHTML = sidebarButtonToCloseContent;
    sidebar.style.width = "calc(300px + 10vw)";
    body.style.overflow = "hidden";
    sidebarIsOpen = true;
    applyBlur();
}

// Close sidebar
function closeSidebar() {
    sidebarButton.innerHTML = sidebarButtonToOpenContent;
    sidebar.style.width = "0";
    body.style.overflow = "";
    sidebarIsOpen = false;
    applyBlur();
}

// Apply blur to elements outside sidebar
function applyBlur() {
    outsideSidebar.forEach(element => {
        element.style.filter = sidebarIsOpen ? "blur(3px)" : "";
        element.style.transition = "filter 0.3s ease";
    });
}

// Close sidebar when clicking outside
document.addEventListener("click", (event) => {
    if (!sidebarButton.contains(event.target) && !sidebar.contains(event.target)) {
        closeSidebar();
    }
});

// Close sidebar on viewport resize or orientation change
function handleMediaQueryChange(event) {
    if (!event.matches) {
        window.addEventListener("resize", closeSidebar);
        window.addEventListener("orientationchange", closeSidebar);
    } else {
        window.removeEventListener("resize", closeSidebar);
        window.removeEventListener("orientationchange", closeSidebar);
        sidebar.style.width = "";
    }
}
mediaQuery.addEventListener("change", handleMediaQueryChange);
handleMediaQueryChange(mediaQuery);

// Fetch and display the total visit count
function updateVisitCount() {
    fetch("https://web-stats.onrender.com/total-visits")
        .then((response) => response.json())
        .then((data) => {
            const visitCountElement = document.getElementById("total-visits");
            visitCountElement.textContent = `Total Visits: ${data.totalVisits}`;
        })
        .catch((error) => {
            console.error("Error fetching total visits:", error);
            const visitCountElement = document.getElementById("total-visits");
            visitCountElement.textContent = "Error loading visits.";
        });
}