// Function to load the navbar
document.addEventListener('DOMContentLoaded', function() {
    $("#navbar-placeholder").load("Navbar/navbar.html"); 
});

// function to scroll when filter is clicked 
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
