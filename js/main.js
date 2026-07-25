function toggleMenu() {
    document.querySelector(".navUL").classList.toggle("active");
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