function toggleMenu(event) {
  event.stopPropagation();

  const menuList = document.getElementById("menuList");
  menuList.classList.toggle("show-menu");

  if (menuList.classList.contains("show-menu")) {
    document.addEventListener("click", closeMenuOnClickOutside);
  } else {
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}

function closeMenuOnClickOutside(event) {
  const menuList = document.getElementById("menuList");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!menuList.contains(event.target) && event.target !== menuToggle) {
    menuList.classList.remove("show-menu");
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}

function toggleSearch(event) {
  event.preventDefault();
  const searchContainer = document.querySelector(".search-container");
  searchContainer.classList.toggle("active");
  document.getElementById("search-input").focus();
}

function includeNavbar() {
  const navbarElement = document.getElementById("mainNavbar");
  if (navbarElement) {
    navbarElement.innerHTML = `
      <div class="menu-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="30" height="30" fill="#FFFFFF">
          <rect x="10" y="10" width="100" height="15" rx="7" ry="7"></rect>
          <rect x="10" y="40" width="100" height="15" rx="7" ry="7"></rect>
          <rect x="10" y="70" width="100" height="15" rx="7" ry="7"></rect>
        </svg>
      </div>

      <ul class="menu" id="menuList">
        <li><a href="Index.html">Home</a></li>
        <li><a href="Index2.html">Gallery</a></li>
        <li><a href="Index3.html">Services</a></li>
        <li><a href="Index5.html">Contact</a></li>
      </ul>

      <div class="search-container">
        <input type="text" placeholder="Search..." id="search-input">
        <button type="submit" id="search-button" onclick="toggleSearch(event)">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 515.9 728.5" xml:space="preserve">
            <path fill="#FFFFFF" d="M472.8,653.9c-34.2-35.4-69.1-70.4-103.6-105.8c-12.2-12.2-23-25.4-41.9-30c-16.7-4.3-19.5-19.7-10.8-34.7
            c14.7-25,23.7-51.5,23.4-81.2c-0.7-9.7-0.3-19.3-2.4-28.2c-13.6-66.1-52.3-109.4-116.2-125.5c-64.2-16.4-124.5,8.6-162.9,64.4
            c-40.8,59-33.5,144.8,16.4,197c51.3,53.3,138.5,62.9,196.4,20.4c10.5-7.9,15.3-5.7,24.1,2.9c11.2,11.1,8.7,27.5,19.9,38.6
            c40.8,40,80.2,81.2,120.3,121.6c15.3,15.4,30.3,16.1,42.6,3.2C488.8,683.6,487.8,669.7,472.8,653.9z M184.3,523.4
            c-67.3-0.4-121-55.1-121-123.3c0-68.6,55.1-124.1,123.1-123c66.3,0.7,121.4,57.6,120.7,124.4C306.4,469.1,251.3,523.8,184.3,523.4z"/>
          </svg>
        </button>
      </div>
    `;
  }
}

window.addEventListener("DOMContentLoaded", function () {
  includeNavbar();

  setTimeout(() => {
    const searchInput = document.getElementById("search-input");
    
    if (searchInput) {
      searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          const searchQuery = searchInput.value.trim();
          if (searchQuery) {
            window.location.href = `Gallery.html?search=${encodeURIComponent(searchQuery)}`;
          }
        }
      });
    }
  }, 100); 

  document.addEventListener("click", function (event) {
    if (event.target.closest("#search-button")) {
      event.preventDefault();
      const searchInput = document.getElementById("search-input");
      const searchQuery = searchInput.value.trim();
      if (searchQuery) {
        window.location.href = `Gallery.html?search=${encodeURIComponent(searchQuery)}`;
      }
    }
  });
});

