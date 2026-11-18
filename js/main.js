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

// NAVBAR
document.querySelectorAll(".sub-dropbtn").forEach(btn => {
    btn.addEventListener("click", function(e){
        if(window.innerWidth <= 768){
            e.preventDefault();
            this.parentElement.classList.toggle("active");
        }
    });
});

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

// TABS
function openLabTab(evt, tabId) {
    // Hide all lab tab contents
    const contents = document.querySelectorAll('.lab-tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Remove active class from all tab buttons
    const buttons = document.querySelectorAll('.lab-tab-btn');
    buttons.forEach(button => button.classList.remove('active'));

    // Show current tab content and activate button
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// IMAGE pop up

const swordImages = document.querySelectorAll(".sword-gallery-img");
const swordPopup = document.getElementById("swordImagePopup");
const swordPopupImage = document.getElementById("swordPopupImage");
const swordClose = document.querySelector(".sword-popup-close");

swordImages.forEach(image => {
    image.addEventListener("click", function () {

        swordPopup.style.display = "flex";
        swordPopupImage.src = this.src;
        swordPopupImage.alt = this.alt;

    });
});

// CLOSE BUTTON
swordClose.addEventListener("click", function () {
    swordPopup.style.display = "none";
});

// CLOSE WHEN CLICKING OUTSIDE THE IMAGE
swordPopup.addEventListener("click", function (event) {

    if (event.target === swordPopup) {
        swordPopup.style.display = "none";
    }

});

// CLOSE USING ESCAPE KEY
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        swordPopup.style.display = "none";
    }

});


/* ===========================
   SCHOOL CLUBS TAB FUNCTION
=========================== */

function showClubTab(tabName, clickedButton) {

    // Hide all tab contents
    const contents = document.querySelectorAll(
        '.club-tab-content'
    );

    contents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active state from all buttons
    const buttons = document.querySelectorAll('.club-tab');

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Highlight selected button
    clickedButton.classList.add('active');
}
