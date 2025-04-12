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

  document.getElementById('current-year').textContent = new Date().getFullYear();