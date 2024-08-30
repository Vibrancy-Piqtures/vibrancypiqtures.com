//Reload on connection
window.addEventListener("online", function () {
  location.load();
});

// Function to load the navbar
document.addEventListener("DOMContentLoaded", function () {
  $("#navbar-placeholder").load("Navbar/navbar.html");
});

//More text...
document.querySelector(".more-text").addEventListener("click", function (e) {
  e.preventDefault();
  var hiddenContent = document.querySelector(".hidden-content");
  hiddenContent.classList.add("show"); 
  this.style.display = "none"; 
});

document.querySelector(".show-less").addEventListener("click", function (e) {
  e.preventDefault();
  var hiddenContent = document.querySelector(".hidden-content");
  hiddenContent.classList.remove("show"); y
  document.querySelector(".more-text").style.display = "inline"; 
});

// Function to recommend plan based on budget and event type
function recommendPlan(event) {
  // Retrieve necessary elements
  const eventTypeSelect = document.getElementById("eventType");
  const eventType = eventTypeSelect.value;
  const minimumPrice = parseFloat(
    eventTypeSelect.options[eventTypeSelect.selectedIndex].dataset.minimumPrice
  );
  const budgetInput = document.getElementById("budget");
  const budget = parseFloat(budgetInput.value);

  let recommendedPlan;
  let additionalDetails;

  if (budget < minimumPrice) {
    recommendedPlan = `The starting package (Silver Package) for ${eventType}s is at least ${formatCurrency(
      minimumPrice
    )}`;

    // Additional details for the Silver Package
    if (eventType === "Wedding") {
      additionalDetails =
        "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
    } else if (eventType === "Kwanjura") {
      additionalDetails =
        "120 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
    } else if (eventType === "Kuhingira") {
      additionalDetails =
        "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
    } else if (eventType === "Anniversary") {
      additionalDetails =
        "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
    } else if (eventType === "Kukyala") {
      additionalDetails =
        "120 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
    } else if (eventType === "Baby Shower") {
      additionalDetails =
        "45 prints-Stick-on Album, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
    } else if (eventType === "Birthday Party") {
      additionalDetails =
        "50 prints-Stick-on Album, 3-5 mins Highlight reel, All the softcopy images are made available our Online Gallery.";
    } else if (eventType === "Proposal") {
      additionalDetails =
        "50 prints-Stick-on Album, 3-5 mins Highlight reel, All the softcopy images are made available our Online Gallery.";
    } else if (eventType === "Private Photography Session") {
      additionalDetails =
        "20 All the softcopy images are made available our Online Gallery, Prints are to be discussed.";
    } else if (eventType === "Private Video Session") {
      additionalDetails = "4-5 mins of HD (High Definition) Edited footage";
    } else if (eventType === "Corporate Gathering/Meeting") {
      additionalDetails =
        "Details depend on the client`s needs, so disscussable with our personnel.";
    } else {
      additionalDetails =
        "The details of price are not fixed and depend entirely on the client`s needs. Please Contact For More Information.";
    }
  } else if (budget < 2500000) {
    recommendedPlan = "Silver Package";
    // Additional details for the Platinum Package
    additionalDetails = getPackageDetails(eventType, "silver");
  } else if (budget < 4500000) {
    recommendedPlan = "Platinum Package";
    // Additional details for the Platinum Package
    additionalDetails = getPackageDetails(eventType, "platinum");
  } else {
    recommendedPlan = "Gold Package";
    // Additional details for the Gold Package
    additionalDetails = getPackageDetails(eventType, "gold");
  }

  const planResult = document.getElementById("planResult");
  const additionalDetailsElement = document.getElementById("additionalDetails");

  // Show the plan result section
  planResult.style.display = "block";

  // Display recommended plan
  document.getElementById("recommendedPlan").textContent = recommendedPlan;

  // Display additional details
  additionalDetailsElement.innerHTML = `<h3>Comes with:</h3><p>${additionalDetails}</p>`;
}

// Function to format currency with commas
function formatCurrency(amount) {
  return "Shs. " + amount.toLocaleString("en-US");
}

// Function to convert currency
function convertCurrency() {
  const budgetInput = document.getElementById("budget");
  const currencySwitch = document.getElementById("currencySwitch");

  // Conversion rate (replace with actual rate)
  const exchangeRate = 0.00028;

  const currentBudget = parseFloat(budgetInput.value);

  if (currencySwitch.value === "USD") {
    const convertedBudget = (currentBudget * exchangeRate).toFixed(2);
    budgetInput.value = convertedBudget;
  } else {
    const convertedBudget = (currentBudget / exchangeRate).toFixed(2);
    budgetInput.value = convertedBudget;
  }
}

// Function to open event form
function openEventForm() {
  const eventForm = document.getElementById("eventForm");
  const formContainer = document.getElementById("formContainer");
}

// JavaScript function to add a class when an option is hovered over
document.addEventListener("DOMContentLoaded", function () {
  var selectElement = document.getElementById("currencySwitch");
  selectElement.addEventListener("mouseover", function () {
    this.classList.add("hovered");
  });
  selectElement.addEventListener("mouseout", function () {
    this.classList.remove("hovered");
  });
});

// Function to close event form
function closeEventForm() {
  const eventForm = document.getElementById("eventForm");
  const formOverlay = document.getElementById("formOverlay");

  // Hide the form and overlay
  eventForm.style.top = "-500px";
  formOverlay.style.display = "none";
}

// Attach the closeEventForm function to the button click event in the form
document
  .getElementById("eventForm")
  .addEventListener("click", function (event) {
    if (event.target.id === "eventForm") {
      closeEventForm();
    }
  });

// Attach the openEventForm function to the "Our Packages" button
document
  .querySelector(".packages-system")
  .addEventListener("click", function () {
    openEventForm();
  });

// Function to toggle form visibility
function toggleForm() {
  var form = document.getElementById("planContent");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function recommendPlan(event) {
  // Show loading animation
  showLoading();

  // Simulate delay with setTimeout
  setTimeout(function () {
    // Retrieve necessary elements
    const eventTypeSelect = document.getElementById("eventType");
    const eventType = eventTypeSelect.value;
    const minimumPrice = parseFloat(
      eventTypeSelect.options[eventTypeSelect.selectedIndex].dataset
        .minimumPrice
    );
    const budgetInput = document.getElementById("budget");
    const budget = parseFloat(budgetInput.value);

    let recommendedPlan;
    let additionalDetails;

    if (budget < minimumPrice) {
      recommendedPlan = `The starting package (Silver Package) for ${eventType}s is at least ${formatCurrency(
        minimumPrice
      )}`;

      // Additional details for the Silver Package
      if (eventType === "Wedding") {
        additionalDetails =
          "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
      } else if (eventType === "Kwanjura") {
        additionalDetails =
          "120 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
      } else if (eventType === "Kuhingira") {
        additionalDetails =
          "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
      } else if (eventType === "Anniversary") {
        additionalDetails =
          "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
      } else if (eventType === "Kukyala") {
        additionalDetails =
          "120 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
      } else if (eventType === "Baby Shower") {
        additionalDetails =
          "45 prints-Stick-on Album, 2 A3 boards of your choice, All the softcopy images are made available our Online Gallery.";
      } else if (eventType === "Birthday Party") {
        additionalDetails =
          "50 prints-Stick-on Album, 3-5 mins Highlight reel, All the softcopy images are made available our Online Gallery.";
      } else if (eventType === "Proposal") {
        additionalDetails =
          "50 prints-Stick-on Album, 3-5 mins Highlight reel, All the softcopy images are made available our Online Gallery.";
      } else if (eventType === "Private Photography Session") {
        additionalDetails =
          "20 All the softcopy images are made available our Online Gallery, Prints are to be discussed.";
      } else if (eventType === "Private Video Session") {
        additionalDetails = "4-5 mins of HD (High Definition) Edited footage";
      } else if (eventType === "Corporate Gathering/Meeting") {
        additionalDetails =
          "Details depend on the client`s needs, so discussable with our personnel.";
      } else {
        additionalDetails =
          "The details of price are not fixed and depend entirely on the client`s needs. Please Contact For More Info";
      }
    } else if (budget < 2500000) {
      recommendedPlan = "Silver Package";
      // Additional details for the Platinum Package
      additionalDetails = getPackageDetails(eventType, "silver");
    } else if (budget < 4500000) {
      recommendedPlan = "Platinum Package";
      // Additional details for the Platinum Package
      additionalDetails = getPackageDetails(eventType, "platinum");
    } else {
      recommendedPlan = "Gold Package";
      // Additional details for the Gold Package
      additionalDetails = getPackageDetails(eventType, "gold");
    }

    // Function to get package details based on event type and package type
    function getPackageDetails(eventType, packageType) {
      // Package details based on event type and package type
      const details = {
        Wedding: {
          platinum:
            "200 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 3 A3 boards of your choice, All your softcopy images on our Online Gallery.",
          gold:
            "250 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 5 A3 boards of your choice, All your softcopy images avail on our Online Gallery."
        },
        Kwanjura: {
          platinum:
            "200 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 3 A3 boards of your choice, All your softcopy images on our Online Gallery.",
          gold:
            "250 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 5 A3 boards of your choice, All your softcopy images avail on our Online Gallery."
        },
        Kuhinjira: {
          platinum:
            "200 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 3 A3 boards of your choice, All your softcopy images on our Online Gallery.",
          gold:
            "200 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 5 A3 boards of your choice, All your softcopy images avail on our Online Gallery."
        },
        Anniversary: {
          platinum:
            "160 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 3 A3 boards of your choice, All your softcopy images on our Online Gallery.",
          gold:
            "200 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 5 A3 boards of your choice, All your softcopy images avail on our Online Gallery."
        },
        Kukyala: {
          platinum:
            "150 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 3 A3 boards of your choice, All your softcopy images on our Online Gallery.",
          gold:
            "180 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, HD (High Definition) Full Length video of the event, 5 A3 boards of your choice, All your softcopy images avail on our Online Gallery."
        },
        "Baby Shower": {
          platinum:
            "50 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, All your softcopy images on our Online Gallery.",
          gold:
            "75 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, All your softcopy images avail on our Online Gallery."
        },
        "Birthday Party": {
          platinum:
            "150 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, All your softcopy images on our Online Gallery.",
          gold:
            "180 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, All your softcopy images avail on our Online Gallery."
        },
        Proposal: {
          platinum:
            "150 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, All your softcopy images on our Online Gallery.",
          gold:
            "180 Image Detailed Photobook,  3-5 mins HD (High Definition) Highlight reel, All your softcopy images avail on our Online Gallery."
        },
        "Private Photography Session": {
          platinum:
            "150 Image Detailed Photobook,All your softcopy images on our Online Gallery.",
          gold:
            "180 Image Detailed Photobook,  3-5 mins HD (High Definition) Portrait reel, All your softcopy images avail on our Online Gallery."
        },
        "Private Video Session": {
          platinum: "10-15 mins of HD (High Definition) Edited footage",
          gold: "15-30 mins of HD (High Definition) Edited footage"
        },
        "Corporate Gathering/Meeting": {
          platinum:
            "Details depend on the client`s needs, disscussable with our personnel.",
          gold:
            "Details depend on the client`s needs, disscussable with our personnel."
        }
      };

      return (
        details[eventType][packageType] ||
        "The service details entirely depend on the client`s needs, all the prices are not fixed or final, Please contact for more information."
      );
    }

    // Hide loading animation
    hideLoading();

    // Show the plan result section
    const planResult = document.getElementById("planResult");
    planResult.style.display = "block";

    // Display recommended plan
    document.getElementById("recommendedPlan").textContent = recommendedPlan;

    // Display additional details
    const additionalDetailsElement = document.getElementById(
      "additionalDetails"
    );
    additionalDetailsElement.innerHTML = `<h3>Comes with:</h3><p>${additionalDetails}</p>`;
  }, 2000); // Adjust the delay time (in milliseconds) as needed
}

function showLoading() {
  // Show loading animation
  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "block";
}

function hideLoading() {
  // Hide loading animation
  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("planContent");
  form.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      recommendPlan(event);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".slides");
  let isPaused = false;

  // Function to start or stop the animation
  function toggleAnimation(state) {
    slidesContainer.style.animationPlayState = state ? "paused" : "running";
  }

  // Event listeners to pause and resume on mouse events
  slidesContainer.addEventListener("mouseenter", () => {
    isPaused = true;
    toggleAnimation(isPaused);
  });

  slidesContainer.addEventListener("mouseleave", () => {
    isPaused = false;
    toggleAnimation(isPaused);
  });
});

// Function to close plan recommendation section
function closePlanResult() {
  const planResult = document.getElementById("planResult");
  planResult.style.display = "none";
}

// Function to toggle login form visibility
function toggleLoginForm() {
  var loginForm = document.getElementById("loginForm");
  var signUpForm = document.getElementById("signUpForm");

  if (loginForm.style.display === "none" || loginForm.style.display === "") {
    loginForm.style.display = "block";
    signUpForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
  }
}

// Function to toggle sign-up form visibility
document.querySelector(".sign-up-link").addEventListener("click", function () {
  var loginForm = document.getElementById("loginForm");
  var signUpForm = document.getElementById("signUpForm");

  if (signUpForm.style.display === "none" || signUpForm.style.display === "") {
    signUpForm.style.display = "block";
    loginForm.style.display = "none";
  } else {
    signUpForm.style.display = "none";
  }
});

// Close login form
function closeLoginForm() {
  var loginForm = document.getElementById("loginForm");
  loginForm.style.display = "none";
}

// Close sign-up form
function closeSignUpForm() {
  var signUpForm = document.getElementById("signUpForm");
  signUpForm.style.display = "none";
}

// Close forms when clicking outside of them
document.addEventListener("click", function (event) {
  var loginForm = document.getElementById("loginForm");
  var signUpForm = document.getElementById("signUpForm");

  if (
    !loginForm.contains(event.target) &&
    !document.querySelector(".Log-in-form-container").contains(event.target)
  ) {
    loginForm.style.display = "none";
  }

  if (
    !signUpForm.contains(event.target) &&
    !document.querySelector(".form-container").contains(event.target)
  ) {
    signUpForm.style.display = "none";
  }
});

window.addEventListener("scroll", function () {
  var button = document.getElementById("myButton");
  var offsetFromBottom = 112;
  var showButtonOffset = 150;

  var scrollHeight = document.documentElement.scrollHeight;
  var scrollPosition = window.innerHeight + window.scrollY;

  // Show button after scrolling past a certain point
  if (window.scrollY >= showButtonOffset) {
    button.classList.add("show-button");
  } else {
    button.classList.remove("show-button");
  }

  // Make button sticky near the bottom of the page
  if (scrollHeight - scrollPosition <= offsetFromBottom) {
    button.classList.add("sticky");
  } else {
    button.classList.remove("sticky");
  }
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

// Swiper for offers and campaigns
var swiper;

function initializeSwiper() {
  swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 2,
    speed: 600,
    preventClicks: true,
    slidesPerView: "auto",
    coverflowEffect: {
      stretch: 50,
      depth: 250,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      hide: false
    },
    mousewheel: {
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: true
    }
  });

  document.querySelectorAll(".swiper-slide").forEach((slide, index) => {
    slide.addEventListener("click", () => {
      swiper.slideTo(index, 600);
    });
  });
}

function openModal() {
  const modal = document.getElementById("sliderModal");
  modal.classList.add("show");
  modal.classList.remove("closing");

  if (!swiper) {
    initializeSwiper();
  } else {
    swiper.update();
  }
}

function closeModal() {
  const modal = document.getElementById("sliderModal");
  modal.classList.add("closing");
  setTimeout(() => {
    modal.classList.remove("show");
  }, 10);
}
