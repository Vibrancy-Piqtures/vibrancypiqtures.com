// Function to include the navbar dynamically
function includeNavbar() {
    const navbarElement = document.getElementById('mainNavbar');
    if (navbarElement) {
        navbarElement.innerHTML = `
            <div class="menu-toggle" onclick="toggleMenu(event)" onmouseover="hoverMenu(this)" onmouseout="unhoverMenu(this)">☰</div>
            <ul class="menu" id="menuList">
                <li><a href="./Index.html">Home</a></li>
                <li><a href="./Index2.html">Gallery</a></li>
                <li><a href="./Index3.html">Blog</a></li>
                <li><a href="./Index5.html">Contact</a></li>
            </ul>
            <div class="container">
                <div class="search-container">
                    <input type="text" placeholder="Search...">
                    <button type="submit">Search</button>
                </div>
            </div>
        `;
    }
}

// Function to toggle menu visibility
function toggleMenu(event) {
    event.stopPropagation();
    const menuList = document.getElementById('menuList');
    menuList.classList.toggle('show-menu');

    const menuToggle = document.querySelector('.menu-toggle');
    if (menuList.classList.contains('show-menu')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Function to close the menu when clicking outside of it
function closeMenuOnClickOutside(event) {
    const menuList = document.getElementById('menuList');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuList.contains(event.target) && event.target !== menuToggle) {
        menuList.classList.remove('show-menu');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Function to change the color of the hamburger menu on hover
function hoverMenu(element) {
    element.style.color = '#f8c18e'; 
}

// Function to revert the color of the hamburger menu after hovering
function unhoverMenu(element) {
    element.style.color = '#ffffff'; 
}

// jQuery function for menu and navbar toggle
$('.menu-toggle').on('click', function() {
    $(this).toggleClass('open');
    $('#mainNavbar').toggleClass('rounded');
});

// Function to toggle the search bar visibility
function toggleSearch(event) {
    event.preventDefault(); // Prevent the form from submitting when the button is clicked
    var searchContainer = document.querySelector('.search-container');
    if (searchContainer.classList.contains('active')) {
        // If the container is active, remove the active class to hide the input
        searchContainer.classList.remove('active');
    } else {
        // If the container is not active, add the active class to show the input
        searchContainer.classList.add('active');
        // Focus the input after displaying it
        document.getElementById('searchInput').focus();
    }
}

// Function to change the search icon size on hover
function hoverSearchIcon(element) {
    element.getElementsByTagName('img')[0].style.transform = 'scale(1.1)'; // Scale up the image on hover
}

// Function to revert the search icon size after hovering
function unhoverSearchIcon(element) {
    element.getElementsByTagName('img')[0].style.transform = 'scale(1)'; // Restore original scale on mouseout
}

// Event listener to include the navbar once the DOM is loaded
window.addEventListener('DOMContentLoaded', includeNavbar);
