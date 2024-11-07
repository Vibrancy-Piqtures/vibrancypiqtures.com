// Function to load the navbar
document.addEventListener("DOMContentLoaded", function () {
  $("#navbar-placeholder").load("Navbar/navbar.html");
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/scripts/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
}

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
  hiddenContent.classList.remove("show");
  document.querySelector(".more-text").style.display = "inline";
});


// Function to format currency with commas
function formatCurrency(amount, currency = "UGX") {
  const symbol = currency === "USD" ? "$" : "Shs.";
  return symbol + amount.toLocaleString("en-US");
}

// Function to get package details based on event type and package type
function getPackageDetails(eventType, packageType) {
  const details = {
    Wedding: {
      silver: "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards, All softcopy images on our Online Gallery.",
      platinum: "200 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 3 A3 boards, Online Gallery.",
      gold: "250 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 5 A3 boards, Online Gallery."
  },
  Kwanjura: {
      silver: "120 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards, All softcopy images on our Online Gallery.",
      platinum: "200 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 3 A3 boards, Online Gallery.",
      gold: "250 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 5 A3 boards, Online Gallery."
  },
  Kuhingira: {
      silver: "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards, All softcopy images on our Online Gallery.",
      platinum: "200 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 3 A3 boards, Online Gallery.",
      gold: "250 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 5 A3 boards, Online Gallery."
  },
  Anniversary: {
      silver: "150 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards, All softcopy images on our Online Gallery.",
      platinum: "160 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 3 A3 boards, Online Gallery.",
      gold: "200 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 5 A3 boards, Online Gallery."
  },
  Kukyala: {
      silver: "120 prints-Stick-on Album, 3-5 mins Highlight reel, 2 A3 boards, All softcopy images on our Online Gallery.",
      platinum: "150 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 3 A3 boards, Online Gallery.",
      gold: "180 Image Detailed Photobook, 3-5 mins HD Highlight reel, HD Full Length video, 5 A3 boards, Online Gallery."
  },
  "Baby Shower": {
      silver: "45 prints-Stick-on Album, 2 A3 boards, All softcopy images on our Online Gallery.",
      platinum: "50 Image Detailed Photobook, 3-5 mins HD Highlight reel, Online Gallery.",
      gold: "75 Image Detailed Photobook, 3-5 mins HD Highlight reel, Online Gallery."
  },
  "Birthday Party": {
      silver: "50 prints-Stick-on Album, 3-5 mins Highlight reel, Online Gallery.",
      platinum: "150 Image Detailed Photobook, 3-5 mins HD Highlight reel, Online Gallery.",
      gold: "180 Image Detailed Photobook, 3-5 mins HD Highlight reel, Online Gallery."
  },
  Proposal: {
      silver: "50 prints-Stick-on Album, 3-5 mins Highlight reel, Online Gallery.",
      platinum: "150 Image Detailed Photobook, 3-5 mins HD Highlight reel, Online Gallery.",
      gold: "180 Image Detailed Photobook, 3-5 mins HD Highlight reel, Online Gallery."
  },
  "Private Photography Session": {
      silver: "20 All softcopy images on our Online Gallery, Prints are to be discussed.",
      platinum: "150 Image Detailed Photobook, Online Gallery.",
      gold: "180 Image Detailed Photobook, 3-5 mins HD Portrait reel, Online Gallery."
  },
  "Private Video Session": {
      silver: "4-5 mins of HD Edited footage",
      platinum: "10-15 mins of HD Edited footage",
      gold: "15-30 mins of HD Edited footage"
  },
  "Corporate Gathering/Meeting": {
      silver: "Details depend on client's needs, discussable with personnel.",
      platinum: "Details depend on client's needs, discussable with personnel.",
      gold: "Details depend on client's needs, discussable with personnel."
  }
};
  return details[eventType]?.[packageType] || "Details depend on client’s needs. Contact for more information.";
}

// Function to recommend plan based on budget and event type
function recommendPlan() {
  showLoading();
  setTimeout(() => {
    const eventTypeSelect = document.getElementById("eventType");
    const eventType = eventTypeSelect.value;
    const minimumPrice = parseFloat(eventTypeSelect.options[eventTypeSelect.selectedIndex].dataset.minimumPrice);
    const budget = parseFloat(document.getElementById("budget").value);
    const currency = document.getElementById("currencySwitch").value;
    const thresholdUSD = minimumPrice * 0.00028; // Conversion rate if using USD

    let recommendedPlan;
    let additionalDetails;

    if (currency === "USD" && budget < thresholdUSD || currency === "UGX" && budget < minimumPrice) {
      recommendedPlan = `The starting package (Silver Package) for ${eventType}s is at least ${formatCurrency(minimumPrice, currency)}`;
      additionalDetails = getPackageDetails(eventType, "silver");
    } else if (budget < (currency === "USD" ? 700 : 2500000)) {
      recommendedPlan = "Silver Package";
      additionalDetails = getPackageDetails(eventType, "silver");
    } else if (budget < (currency === "USD" ? 1250 : 4500000)) {
      recommendedPlan = "Platinum Package";
      additionalDetails = getPackageDetails(eventType, "platinum");
    } else {
      recommendedPlan = "Gold Package";
      additionalDetails = getPackageDetails(eventType, "gold");
    }

    hideLoading();
    displayRecommendation(recommendedPlan, additionalDetails);
  }, 2000);
}

// Currency conversion function
function convertCurrency() {
  const budgetInput = document.getElementById("budget");
  const currencySwitch = document.getElementById("currencySwitch");
  const exchangeRate = 0.00028;
  const currentBudget = parseFloat(budgetInput.value);
  budgetInput.value = currencySwitch.value === "USD"
    ? (currentBudget * exchangeRate).toFixed(2)
    : (currentBudget / exchangeRate).toFixed(2);
}

// Functions to show/hide loading animation and display recommendation
function showLoading() {
  document.getElementById("loading").style.display = "block";
}
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
function displayRecommendation(plan, details) {
  document.getElementById("planResult").style.display = "block";
  document.getElementById("recommendedPlan").textContent = plan;
  document.getElementById("additionalDetails").innerHTML = `<h3>Comes with:</h3><p>${details}</p>`;
}

// Event listeners
document.getElementById("eventForm").addEventListener("click", (event) => {
  if (event.target.id === "eventForm") closeEventForm();
});
document.querySelector(".packages-system").addEventListener("click", openEventForm);
document.getElementById("currencySwitch").addEventListener("mouseover", function () {
  this.classList.add("hovered");
});
document.getElementById("currencySwitch").addEventListener("mouseout", function () {
  this.classList.remove("hovered");
});

// Functions to open/close forms and toggle visibility
function openEventForm() {
  document.getElementById("eventForm").style.top = "0";
  document.getElementById("formOverlay").style.display = "block";
}
function closeEventForm() {
  document.getElementById("eventForm").style.top = "-500px";
  document.getElementById("formOverlay").style.display = "none";
}
function toggleForm() {
  const form = document.getElementById("planContent");
  form.style.display = form.style.display === "none" ? "block" : "none";
}
function closePlanResult() {
  document.getElementById("planResult").style.display = "none";
}



//Log in And Sign up
// Function to toggle login form visibility
function toggleLoginForm() {
  var loginForm = document.getElementById("loginForm");
  var signUpForm = document.getElementById("signUpForm");

  if (!loginForm) return; 
  if (loginForm.style.display === "none" || loginForm.style.display === "") {
    loginForm.style.display = "block";
    if (signUpForm) signUpForm.style.display = "none"; 
  } else {
    loginForm.style.display = "none";
  }
}

// Function to toggle sign-up form visibility
document.querySelector(".sign-up-link")?.addEventListener("click", function () {
  var loginForm = document.getElementById("loginForm");
  var signUpForm = document.getElementById("signUpForm");

  if (!signUpForm) return; // Ensure signUpForm exists
  if (signUpForm.style.display === "none" || signUpForm.style.display === "") {
    signUpForm.style.display = "block";
    if (loginForm) loginForm.style.display = "none"; 
  } else {
    signUpForm.style.display = "none";
  }
});

// Close login form
function closeLoginForm() {
  var loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.style.display = "none";
}

// Close sign-up form
function closeSignUpForm() {
  var signUpForm = document.getElementById("signUpForm");
  if (signUpForm) signUpForm.style.display = "none";
}

// Close forms when clicking outside of them
document.addEventListener("click", function (event) {
  var loginForm = document.getElementById("loginForm");
  var signUpForm = document.getElementById("signUpForm");

  if (loginForm && !loginForm.contains(event.target) && 
      !document.querySelector(".Log-in-form-container")?.contains(event.target)) {
    loginForm.style.display = "none";
  }

  if (signUpForm && !signUpForm.contains(event.target) &&
      !document.querySelector(".form-container")?.contains(event.target)) {
    signUpForm.style.display = "none";
  }
});

// Go to Gallery Button
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


  // Scroll to top button
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

// Swiper for Niche Images
var swiper;

function initializeSwiper() {
  swiper = new Swiper(".swiper", {
    effect: "coverflow",
    loop: true,
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


// Models` Questionnaire
// Triggerring the modal when the user clicks the "Are you a Model" button
document.getElementById("model-cta").addEventListener("click", function () {
  openQuizModal();
});

window.addEventListener("scroll", function () {
  var tooltip = document.getElementById("model-cta");

  // Show tooltip after scrolling down a bit
  if (window.scrollY >= 1000) {
    tooltip.classList.add("show-tooltip");
  } else {
    tooltip.classList.remove("show-tooltip");
  }
});

// Open the quiz modal
function openQuizModal() {
  document.getElementById("quiz-modal").classList.remove("hidden");
  document.getElementById("quiz-overlay").classList.remove("hidden");
  document.getElementById("current-step").textContent = currentStep + 1; // Show step count
  document.getElementById("total-steps").textContent = totalSteps;
}

// Close the quiz modal
function closeQuizModal() {
  document.getElementById("quiz-modal").classList.add("hidden");
  document.getElementById("quiz-overlay").classList.add("hidden");
}

// Initialization of variables for current step and total steps
let currentStep = 0;
const totalSteps = 18;

// Navigation logic for the quiz (combined function)
function navigateQuiz(direction) {
  const questions = document.querySelectorAll(".quiz-question");

  // Save the name for the final message
  if (currentStep === 0 && direction === "next") {
    const name = document.getElementById("name").value;
    document.getElementById("user-name-display").textContent =
      name || "[Name/Alias]";
  }

  // Hide the current question
  questions[currentStep].classList.add("hidden");

  // Determine the next step
  if (direction === "next" && currentStep < totalSteps - 1) {
    currentStep++;
  } else if (direction === "prev" && currentStep > 0) {
    currentStep--;
  }

  // Show the next/previous question
  questions[currentStep].classList.remove("hidden");

  // Update the progress status
  document.getElementById("current-step").textContent = currentStep + 1;

  document
    .getElementById("prev-btn")
    .classList.toggle("hidden", currentStep === 0);
  document
    .getElementById("next-btn")
    .classList.toggle("hidden", currentStep === questions.length - 1);
}

// Keyboard event listeners
document.addEventListener("keydown", function (e) {
  // Right arrow key (Next)
  if (e.key === "ArrowRight") {
    navigateQuiz("next");
  }
  // Left arrow key (Previous)
  if (e.key === "ArrowLeft") {
    navigateQuiz("prev");
  }
  // Enter key (Next)
  if (e.key === "Enter") {
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement.tagName === "INPUT") {
      navigateQuiz("next");
    }
  }
});

// Submit the quiz
function submitQuiz() {
  alert("Submitted successfully, Thank you.");
  closeQuizModal();
}

