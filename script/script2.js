
// Function to load the navbar
document.addEventListener('DOMContentLoaded', function() {
  $("#navbar-placeholder").load("Navbar/navbar.html"); 
});

// fancybox function 
$(document).ready(function () {
    // Initialize Fancybox
    $("[data-fancybox]").fancybox({
      buttons: [
        "zoom",
        "slideShow",
        "fullScreen",
        "download",
        "thumbs",
        "close",
      ],
    });
  });
document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleries = document.querySelectorAll('.gallery-container > div');

    // Function to show the selected gallery and hide others
    function showGallery(filter) {
        galleries.forEach(gallery => {
            if (gallery.classList.contains(filter)) {
                gallery.style.display = 'block';
            } else {
                gallery.style.display = 'none';
            }
        });
    }

    // Add click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = button.dataset.filter;

            // Show the selected gallery and hide others
            showGallery(filter);

            // Update active class for buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});
