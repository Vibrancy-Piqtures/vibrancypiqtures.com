
function toggleMenu(event) {
    event.stopPropagation();
    const menuList = document.getElementById('menuList');
    const menuToggle = document.querySelector('.menu-toggle');
    menuList.classList.toggle('show-menu');

    if (menuList.classList.contains('show-menu')) {
        menuToggle.style.color = '#ffffff'; 
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        menuToggle.style.color = '#ffffff'; 
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

function hoverMenu(element) {
    if (!document.getElementById('menuList').classList.contains('show-menu')) {
        element.style.color = '#f8c18e'; 
    }
}

function unhoverMenu(element) {
    if (!document.getElementById('menuList').classList.contains('show-menu')) {
        element.style.color = '#ffffff'; 
    }
}

function closeMenuOnClickOutside(event) {
    const menuList = document.getElementById('menuList');
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuList.contains(event.target) && event.target !== menuToggle) {
        menuList.classList.remove('show-menu');
        menuToggle.style.color = '#ffffff'; 
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}
