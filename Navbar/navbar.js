// Menu toggle function
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('show-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.classList.toggle('show-menu');
}
function toggleMenu(event) {
    event.stopPropagation();
    const menuList = document.getElementById('menuList');
    menuList.classList.toggle('show-menu');

    if (menuList.classList.contains('show-menu')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

function closeMenuOnClickOutside(event) {
    const menuList = document.getElementById('menuList');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuList.contains(event.target) && event.target !== menuToggle) {
        menuList.classList.remove('show-menu');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

function hoverMenu(element) {
    element.style.color = '#f8c18e'; 
}

function unhoverMenu(element) {
    element.style.color = '#000'; 
}


// Function to toggle menu visibility
$('.menu-toggle').on('click', function() {
    $(this).toggleClass('open');
    $('#mainNavbar').toggleClass('rounded');
});

// Function for search toggle
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

// Function to change the icon on hover
function hoverSearchIcon(element) {
    element.getElementsByTagName('img')[0].style.transform = 'scale(1.1)'; // Scale up the image on hover
}

// Function to change the icon on mouseout
function unhoverSearchIcon(element) {
    element.getElementsByTagName('img')[0].style.transform = 'scale(1)'; // Restore original scale on mouseout
}

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

window.addEventListener('DOMContentLoaded', includeNavbar);

// Function to close the menu
function closeMenu() {
    const menu = document.querySelector('.menu'); // Adjust this selector to match your menu
    const hamburger = document.querySelector('.hamburger'); // Adjust this selector to match your hamburger icon

    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        hamburger.classList.remove('is-active'); // Adjust this to match your active state
    }
}

// Event listener for page navigation
window.addEventListener('popstate', closeMenu);

// Optional: Close the menu when a link is clicked
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
