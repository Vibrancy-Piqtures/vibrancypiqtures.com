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


//More text...
document.querySelector(".more-text").addEventListener("click", function (e) {
  e.preventDefault();
  const hiddenContent = document.querySelector(".hidden-content");
  hiddenContent.classList.add("show");
  this.style.display = "none";
});

document.querySelector(".show-less").addEventListener("click", function (e) {
  e.preventDefault();
  const hiddenContent = document.querySelector(".hidden-content");
  hiddenContent.classList.remove("show");
  document.querySelector(".more-text").style.display = "inline";
});

// Package recommendation System
// Minimum prices/ Thresholds for event packages in UGX and their equivalent in USD
const packageThresholds = {
  Wedding: { silver: 2500000, platinum: 3500000, gold: 5000000 },
  Kwanjura: { silver: 2000000, platinum: 3000000, gold: 4500000 },
  Kuhingira: { silver: 2000000, platinum: 3500000, gold: 5000000 },
  Anniversary: { silver: 1800000, platinum: 2500000, gold: 4500000 },
  Kukyala: { silver: 850000, platinum: 1500000, gold: 2500000 },
  "Baby Shower": { silver: 450000, platinum: 750000, gold: 1000000 },
  "Birthday Party": { silver: 350000, platinum: 450000, gold: 750000 },
  Proposal: { silver: 250000, platinum: 350000, gold: 450000 },
  "Private Photography Session": { silver: 250000, platinum: 350000, gold: 450000 },
  "Private Video Session": { silver: 450000, platinum: 750000, gold: 1500000 },
  "Corporate Gathering/Meeting": { silver: 500000, platinum: 750000, gold: 1000000 },
  "Other": {}
};

// Conversion rate for UGX to USD
const exchangeRate = 0.00028;

// Function to format currency
function formatCurrency(amount, currency = "UGX") {
  const symbol = currency === "USD" ? "$" : "Shs.";
  return symbol + amount.toLocaleString("en-US");
}

document.getElementById("eventType").addEventListener("change", function () {
  let customInput = document.getElementById("customEvent");
  if (this.value === "Other") {
    customInput.style.display = "block";
    customInput.focus();
  } else {
    customInput.style.display = "none";
    customInput.value = ""; 
  }
});

// Function to get package details based on event type and package type
function getPackageDetails(eventType, packageType) {
  const details = {
    Wedding: {
      silver: "200 image photobook, (2) 3-5 mins Highlight reels, 1 A3 board, (1) A4 board, Secure online Gallery Accessible for atleat 5 years.",
      platinum: "350 Image Detailed Photobook, (3) 3-5 mins Highlight reels, HD Full Length video, (3) A3 boards, (1) A3 Frame Secure Online Gallery images for upto 10 years.",
      gold: "500 Image Custom Design Detailed Photobook, Upto (5) 3-5 mins HD Highlight reels, HD Full Length video, (1) A2 board/Frame, (3) A3 boards, Secure Online Gallery images for atleast 50 years."
    },
    Kwanjura: {
      silver: "200 image photobook, (2) 3-5 mins Highlight reels, 1 A3 board, (1) A4 board, Secure online Gallery Accessible for atleat 5 years.",
      platinum: "350 Image Detailed Photobook, (3) 3-5 mins Highlight reels, HD Full Length video, (3) A3 boards, (1) A3 Frame Secure Online Gallery images for upto 10 years.",
      gold: "450 Image Custom Design Detailed Photobook, Upto (5) 3-5 mins HD Highlight reels, HD Full Length video, (1) A2 board/Frame, (3) A3 boards, Secure Online Gallery images for atleast 45 years."
    },
    Kuhingira: {
      silver: "200 image photobook, (2) 3-5 mins Highlight reels, 1 A3 board, (1) A4 board, Secure online Gallery Accessible for atleat 5 years.",
      platinum: "350 Image Detailed Photobook, (3) 3-5 mins Highlight reels, HD Full Length video, (3) A3 boards, (1) A3 Frame, Secure Online Gallery images for upto 10 years.",
      gold: "450 Image Custom Design Detailed Photobook, Upto (5) 3-5 mins HD Highlight reels, HD Full Length video, (1) A2 board/Frame, (3) A3 boards, Secure Online Gallery images for atleast 45 years."
    },
    Anniversary: {
      silver: "200 image photobook, (2) 3-5 mins Highlight reels, 1 A3 board, (1) A4 board, Secure online Gallery Accessible for atleat 5 years.",
      platinum: "250 image photobook, (3) 3-5 mins Highlight reels, HD Full Length video, (2) A3 boards, (1) A4 board, Secure online Gallery Accessible for atleat 5 years.",
      gold: "350 image photobook, (5) 3-5 mins Highlight reels, 1 A3 board,  (1) A4 board, Secure online Gallery Accessible for atleat 5 years.",
    },
    Kukyala: {
      silver: "120 prints-Stick-on Album, (1) 3-5 mins Highlight reel, 2 A3 boards, Secure online Galley accessible for atleast 5 years.",
      platinum: "150 Image Detailed Photobook, (2) 3-5 mins HD Highlight reels, HD Full Length video, 3 A3 boards, Online Gallery.",
      gold: "180 Image Detailed Photobook, (3) 3-5 mins HD Highlight reels, High Definition (HD) Full Length video, 5 A3 boards, Online Gallery."
    },
    "Baby Shower": {
      silver: "75 prints-Stick-on Album, (1) 3-5 mins HD Highlight reel, Secure online Galley accessible for atleast 5 years.",
      platinum: "120 Image Detailed Photobook, (1) 3-5 mins HD Highlight reel, Online Gallery.",
      gold: "75 Image Detailed Photobook, (2) 3-5 mins HD Highlight reel, Online Gallery."
    },
    "Birthday Party": {
      silver: "50 prints-Stick-on Album, (1) 3-5 mins Highlight reel, Online Gallery.",
      platinum: "150 Image Detailed Photobook, (2) 3-5 mins HD Highlight reel, Online Gallery.",
      gold: "180 Image Detailed Photobook, (3) 3-5 mins HD Highlight reel, Online Gallery."
    },
    Proposal: {
      silver: "50 prints-Stick-on Album, (1) 3-5 mins Highlight reel, Online Gallery.",
      platinum: "150 Image Detailed Photobook, (2) 3-5 mins HD Highlight reel, Online Gallery.",
      gold: "180 Image Detailed Photobook, (3) 3-5 mins HD Highlight reel, Online Gallery."
    },
    "Private Photography Session": {
      silver: "15 softcopy High End Editted Images, Delivered via Whatsapp.",
      platinum: "45 softcopy Images all accessible on our Collection where you can access your Gallery at your convinience.",
      gold: "45 softcopy Images all accessible on our Collection where you can access your Gallery at your convinience."
    },
    "Private Video Session": {
      silver: "4-5 mins of HD Edited footage",
      platinum: "10-15 mins of HD Edited footage",
      gold: "15-30 mins of HD Edited footage"
    },
    "Corporate Gathering/Meeting": {
      silver: "Details depend on client's needs, discussable with our personnel, Please contact us for more information.",
      platinum: "Details depend on client's needs, discussable with our personnel, Please contact us for more information.",
      gold: "Details depend on client's needs, discussable with our personnel, Please contact us for more information."
    },
    "Other": {}
  };
  return details[eventType]?.[packageType] || "The package details will depend on the client’s specific needs. Please contact us for more information.";
}

// Function to recommend plan based on budget and event type
function recommendPlan() {
  showLoading();
  setTimeout(() => {
    const eventTypeSelect = document.getElementById("eventType");
    const eventType = eventTypeSelect.value;
    const budget = parseFloat(document.getElementById("budget").value);
    const currency = document.getElementById("currencySwitch").value;

    // Get package thresholds for the selected event type
    const eventThresholds = packageThresholds[eventType];
    const silverThresholdUSD = eventThresholds.silver * exchangeRate;
    const platinumThresholdUSD = eventThresholds.platinum * exchangeRate;
    const goldThresholdUSD = eventThresholds.gold * exchangeRate;

    let recommendedPlan;
    let additionalDetails;

    // Determine the recommended plan based on budget
    if ((currency === "USD" && budget < silverThresholdUSD) || (currency === "UGX" && budget < eventThresholds.silver)) {
      const minPriceInCurrency = currency === "USD" ? silverThresholdUSD : eventThresholds.silver;
      recommendedPlan = `The starting package (Silver Package) for ${eventType}s is at least ${formatCurrency(minPriceInCurrency, currency)}`;
      additionalDetails = getPackageDetails(eventType, "silver");
    } else if ((currency === "USD" && budget < platinumThresholdUSD) || (currency === "UGX" && budget < eventThresholds.platinum)) {
      recommendedPlan = "Silver Package";
      additionalDetails = getPackageDetails(eventType, "silver");
    } else if ((currency === "USD" && budget < goldThresholdUSD) || (currency === "UGX" && budget < eventThresholds.gold)) {
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
  const currentBudget = parseFloat(budgetInput.value);
  if (budgetInput.value.trim() === '') return;
  budgetInput.value = currencySwitch.value === "USD"
    ? (currentBudget * exchangeRate).toFixed(2)
    : (currentBudget / exchangeRate).toFixed(2);

}

// JavaScript to update the label
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('currencySwitch').addEventListener('change', function() {
    const selectedCurrency = this.value;
    const budgetLabel = document.getElementById('budgetLabel');
    budgetLabel.textContent = `ENTER YOUR BUDGET (${selectedCurrency})`;
    const budgetInput = document.getElementById('budget');
    budgetInput.placeholder = `Enter budget in ${selectedCurrency}`;
  });
});

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

// Functions to open and close forms and toggle visibility
function openEventForm() {
  document.getElementById("eventForm").style.top = "0";
  document.getElementById("formOverlay").style.display = "block";
}
function closeEventForm() {
  document.getElementById("eventForm").style.top = "-250px";
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
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");

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
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");

  if (!signUpForm) return;
  if (signUpForm.style.display === "none" || signUpForm.style.display === "") {
    signUpForm.style.display = "block";
    if (loginForm) loginForm.style.display = "none"; 
  } else {
    signUpForm.style.display = "none";
  }
});

document.querySelector(".log-in-link")?.addEventListener("click", function (e) {
  e.preventDefault(); 
  e.stopPropagation(); 
  
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");

  loginForm.style.display = "block";
  signUpForm.style.display = "none";
});

// Close login form
function closeLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.style.display = "none";
}

// Close sign-up form
function closeSignUpForm() {
  const signUpForm = document.getElementById("signUpForm");
  if (signUpForm) signUpForm.style.display = "none";
}

// Close forms when clicking outside of them
document.addEventListener("click", function (event) {
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");

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
  const button = document.getElementById("myButton");
  const offsetFromBottom = 112;
  const showButtonOffset = 250;

  const scrollHeight = document.documentElement.scrollHeight;
  const scrollPosition = window.innerHeight + window.scrollY;

  if (window.scrollY >= showButtonOffset) {
    button.classList.add("show-button");
  } else {
    button.classList.remove("show-button");
  }

  if (window.innerWidth <= 768) { 
    if (scrollHeight - scrollPosition <= offsetFromBottom) {
      button.classList.add("sticky");
    } else {
      button.classList.remove("sticky");
    }
  }
});

  // Scroll to top button
window.addEventListener("scroll", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (window.scrollY > window.innerHeight) {
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

// Initializing Swiper js
let swiper;

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
// Triggering the modal
document.getElementById("model-cta").addEventListener("click", function () {
  openQuizModal();
});

window.addEventListener("scroll", function () {
  const tooltip = document.getElementById("model-cta");

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
  document.getElementById("current-step").textContent = currentStep + 1; 
  document.getElementById("total-steps").textContent = totalSteps;
}

// Close the quiz modal
function closeQuizModal() {
  document.getElementById("quiz-modal").classList.add("hidden");
  document.getElementById("quiz-overlay").classList.add("hidden");
}

let currentStep = 0;
const totalSteps = 18;

function navigateQuiz(direction) {
  const questions = document.querySelectorAll(".quiz-question");

  if (currentStep === 0 && direction === "next") {
    const name = document.getElementById("name").value;
    document.getElementById("user-name-display").textContent =
      name || "[Name/Alias]";
  }

  // Hide the current question
  questions[currentStep].classList.add("hidden");

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
  if (e.key === "ArrowRight") {
    navigateQuiz("next");
  }
  if (e.key === "ArrowLeft") {
    navigateQuiz("prev");
  }
  if (e.key === "Enter") {
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement.tagName === "INPUT") {
      navigateQuiz("next");
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const otherOption = document.getElementById('other-option');
  const otherInput = document.getElementById('other-input');

  otherInput.classList.add('hidden');

  document.querySelectorAll('input[name="Type of model"]').forEach((radio) => {
    radio.addEventListener('change', function () {
      if (otherOption.checked) {
        otherInput.classList.remove('hidden');
      } else {
        otherInput.classList.add('hidden');
        otherInput.value = ''; 
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const customAnswerOption = document.getElementById('custom-answer-option');
  const customAnswerInput = document.getElementById('custom-answer-input');

  customAnswerInput.classList.add('hidden');

  document.querySelectorAll('input[name="Intent to Collab"]').forEach((radio) => {
    radio.addEventListener('change', function () {
      if (customAnswerOption.checked) {
        customAnswerInput.classList.remove('hidden');
      } else {
        customAnswerInput.classList.add('hidden');
        customAnswerInput.value = ''; 
      }
    });
  });
});

// Collect form data into a JSON object
function collectFormData() {
  const formData = new FormData(document.getElementById("quiz-form"));
  const data = {};

  formData.forEach((value, key) => {
    if (key === "Type of model-custom" && value.trim() !== "") {
      data["Type of model"] = value;
      return;
    }
    if (key === "Intent to Collab-custom" && value.trim() !== "") {
      data["Intent to Collab"] = value;
      return;
    }
    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]]; 
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  return data;
}

// Send data to WhatsApp
function sendToWhatsApp(data) {
  const phoneNumber = "+256767810246"; 
  const message = encodeURIComponent(
    `New Model Questionnaire Submission:\n\n${JSON.stringify(data, null, 2)}`
  );
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}

// Submit the quiz
function submitQuiz() {
  const formData = collectFormData();
  sendToWhatsApp(formData);
  closeQuizModal();
}



