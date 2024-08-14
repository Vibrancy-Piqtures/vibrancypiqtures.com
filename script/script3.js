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

window.addEventListener("scroll", function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (window.scrollY > window.innerHeight) {  // Adjusted to 1x the viewport height
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });
  
  document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
