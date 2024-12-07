document.addEventListener('contextmenu', event => event.preventDefault());

// Function to load the navbar
document.addEventListener("DOMContentLoaded", function () {
  $("#navbar-placeholder").load("Navbar/navbar.html");
});

document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionItem = button.parentElement;
    const content = accordionItem.querySelector(".accordion-content");

    // Toggle the active class
    if (accordionItem.classList.contains("active")) {
      accordionItem.classList.remove("active");
      content.style.maxHeight = 0;
    } else {
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".accordion-content").style.maxHeight = 0;
      });
      accordionItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

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
