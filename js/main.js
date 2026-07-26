// Helper function to enable/disable zoom & fullscreen buttons
function setZoomControlsDisabled(isDisabled) {
    const zoomButtons = document.querySelectorAll(".zoom-controls .buttonZoom, #prevBtn, #nextBtn");
    
    zoomButtons.forEach(button => {
        button.disabled = isDisabled;
        
        // Optional: style changes when disabled
        if (isDisabled) {
            button.style.opacity = "0";
            button.style.pointerEvents = "none";
        } else {
            button.style.opacity = "1";
            button.style.pointerEvents = "auto";
        }
    });
}

// Updated toggleMenu function
function toggleMenu() {
    const navUL = document.querySelector(".navUL");
    navUL.classList.toggle("active");

    // Check if navbar is currently active
    const isActive = navUL.classList.contains("active");
    
    // Disable buttons if navbar is open, enable if closed
    setZoomControlsDisabled(isActive);
}

// Mobile dropdowns
document.querySelectorAll(".dropbtn").forEach(button => {
    button.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle("active");
        }
    });
});