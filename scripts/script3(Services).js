document.addEventListener('contextmenu', event => event.preventDefault());

// Function to load the navbar
document.addEventListener("DOMContentLoaded", function () {
  fetch("Navbar/navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(data => {
      document.querySelector("#navbar-placeholder").innerHTML = data;
    })
    .catch(error => console.error("Error loading navbar:", error));
});


// function to scroll when filter is clicked
function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

window.addEventListener("scroll", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (window.scrollY > window.innerHeight) {
    // Adjusted to 1x the viewport height
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

document
  .getElementById("scrollToTopBtn")
  .addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
