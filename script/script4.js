
// Function to load the navbar
document.addEventListener('DOMContentLoaded', function() {
    $("#navbar-placeholder").load("Navbar/navbar.html"); 
});

document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const accordionItem = button.parentElement;
      const content = accordionItem.querySelector('.accordion-content');
  
      // Toggle the active class
      if (accordionItem.classList.contains('active')) {
        accordionItem.classList.remove('active');
        content.style.maxHeight = 0;
      } else {
        document.querySelectorAll('.accordion-item').forEach(item => {
          item.classList.remove('active');
          item.querySelector('.accordion-content').style.maxHeight = 0;
        });
        accordionItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
  