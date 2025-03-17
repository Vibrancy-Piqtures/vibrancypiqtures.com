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

// Search Functionality
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  if (searchQuery) {
    const filterButtons = document.querySelectorAll(".filter-button");
    let foundMatch = false;

    filterButtons.forEach((button) => {
      const filter = button.dataset.filter.toLowerCase();
      const searchTerms = button.dataset.searchTerms ? button.dataset.searchTerms.toLowerCase().split(",") : [];

      if (filter === searchQuery.toLowerCase() || searchTerms.includes(searchQuery.toLowerCase())) {
        showGallery(filter);

        // Active class to the matching filter
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        foundMatch = true;
      }
    });

    if (!foundMatch) {
      console.log("No matching Category found for:", searchQuery);
    }
  }
});

// Function show the Gallery
function showGallery(filter) {
  const galleries = document.querySelectorAll(".gallery-container > div");

  galleries.forEach((gallery) => {
    if (gallery.classList.contains(filter.toLowerCase())) {
      gallery.style.display = "block";
    } else {
      gallery.style.display = "none";
    }
  });
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-button");
  const galleries = document.querySelectorAll(".gallery-container > div");
  const dropdownArrow = document.querySelector("#dropdown-arrow");

  // Event listeners for the filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter.toLowerCase();
      showGallery(filter); 

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Dropdown toggle
  dropdownArrow.addEventListener("click", function () {
    const container = document.querySelector(".horizontal-list-container");
    container.classList.toggle("active");

    // Tooltip text for the dropdown arrows
    if (container.classList.contains("active")) {
      dropdownArrow.setAttribute("title", "Show less Categories");
    } else {
      dropdownArrow.setAttribute("title", "More Categories");
    }
  });
});

// Initializing the Fancybox function
$(document).ready(function () {
  // Initializing Fancybox
  $("[data-fancybox]").fancybox({
    buttons: ["zoom", "slideShow", "fullScreen", "close"]
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-button");
  const galleries = document.querySelectorAll(".gallery-container > div");

  // Function to show the selected gallery and hide others
  function showGallery(filter) {
    galleries.forEach((gallery) => {
      if (gallery.classList.contains(filter)) {
        gallery.style.display = "block";
      } else {
        gallery.style.display = "none";
      }
    });
  }

  // Click event listener to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;

      // Show the selected gallery and hide others
      showGallery(filter);

      // Update active class for buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryItems = document.querySelectorAll('.gallery-container > div');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Ensure the image has loaded
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.onload = () => {
        img.classList.add("loaded");
      };
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
