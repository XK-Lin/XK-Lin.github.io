// Toggle sidebar button
const sidebarButton = document.getElementById("sidebar-button");
const sidebar = document.querySelector("ul");
sidebarButton.addEventListener("click", toggleSidebar);
function toggleSidebar() {
    if (sidebarButton.innerHTML === '<i class="fa-solid fa-bars"></i>') {
        sidebarButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        sidebar.style.width = "calc(200px + 5vw)";
    } else {
        reset();
    }
}
function reset() {
    sidebarButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    sidebar.style.width = "0";
}

// Update viewport height when resizing
window.addEventListener("resize", updateViewportHeight);
function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}