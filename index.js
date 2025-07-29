document.addEventListener("DOMContentLoaded", function () {
  // Initialize the mobile menu
  initMobileMenu();

  // Initialize dropdown menus
  initDropdowns();

  // Initialize smooth scrolling for anchor links
  initSmoothScroll();

  // Initialize the sticky header
  initStickyHeader();

  // Initialize flash message close buttons
  initFlashMessages();

  // Initialize newsletter form validation
  initNewsletterForm();

  // Initialize contact form validation if on contact page
  if (document.querySelector(".contact-form")) {
    initContactForm();
  }

  // Initialize donation options if on donate page
  if (document.querySelector(".donation-options")) {
    initDonationOptions();
  }

  // Initialize statistics animation
  if (document.querySelector(".statistics")) {
    initStatisticsAnimation();
  }
});

// Mobile Menu Toggle
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !event.target.closest(".nav-container") &&
        navMenu.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }
}

// Dropdown Menu Functionality
function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");

  if (window.innerWidth < 768) {
    // Mobile dropdown behavior
    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector(".nav-link");

      link.addEventListener("click", function (e) {
        e.preventDefault();
        dropdown.classList.toggle("active");

        // Close other dropdowns
        dropdowns.forEach((otherDropdown) => {
          if (
            otherDropdown !== dropdown &&
            otherDropdown.classList.contains("active")
          ) {
            otherDropdown.classList.remove("active");
          }
        });
      });
    });
  }
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        const navMenu = document.querySelector(".nav-menu");
        const hamburger = document.querySelector(".hamburger");

        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          hamburger.classList.remove("active");
          document.body.classList.remove("menu-open");
        }

        // Scroll to target with offset for header
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });
}

// Sticky Header
function initStickyHeader() {
  const header = document.querySelector(".header");
  const heroSection = document.querySelector(".hero");

  if (header && heroSection) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > heroSection.offsetHeight - header.offsetHeight) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
}

// Flash Messages
function initFlashMessages() {
  const flashMessages = document.querySelectorAll(".flash");
  const closeButtons = document.querySelectorAll(".flash-close");

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const flashMessage = this.parentElement;
      flashMessage.style.opacity = "0";

      setTimeout(() => {
        flashMessage.remove();
      }, 300);
    });
  });

  // Auto-hide flash messages after 5 seconds
  if (flashMessages.length > 0) {
    setTimeout(() => {
      flashMessages.forEach((message) => {
        message.style.opacity = "0";

        setTimeout(() => {
          message.remove();
        }, 300);
      });
    }, 5000);
  }
}

// Newsletter Form Validation
function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!isValidEmail(email)) {
        e.preventDefault();
        showFormError(emailInput, "Please enter a valid email address");
      }
    });
  }
}

// Contact Form Validation
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      let isValid = true;

      // Name validation
      const nameInput = this.querySelector('input[name="name"]');
      if (!nameInput.value.trim()) {
        isValid = false;
        showFormError(nameInput, "Please enter your name");
      } else {
        clearFormError(nameInput);
      }

      // Email validation
      const emailInput = this.querySelector('input[name="email"]');
      if (!isValidEmail(emailInput.value.trim())) {
        isValid = false;
        showFormError(emailInput, "Please enter a valid email address");
      } else {
        clearFormError(emailInput);
      }

      // Subject validation
      const subjectInput = this.querySelector('input[name="subject"]');
      if (!subjectInput.value.trim()) {
        isValid = false;
        showFormError(subjectInput, "Please enter a subject");
      } else {
        clearFormError(subjectInput);
      }

      // Message validation
      const messageInput = this.querySelector('textarea[name="message"]');
      if (!messageInput.value.trim()) {
        isValid = false;
        showFormError(messageInput, "Please enter your message");
      } else {
        clearFormError(messageInput);
      }

      if (!isValid) {
        e.preventDefault();
      }
    });
  }
}

// Donation Options
function initDonationOptions() {
  const donationOptions = document.querySelectorAll(".donation-option");
  const paymentMethods = document.querySelectorAll(".payment-method");

  // Handle donation option selection
  donationOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      donationOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      // Update donation amount in form if applicable
      const amount = this.getAttribute("data-amount");
      const amountInput = document.querySelector('input[name="amount"]');

      if (amountInput && amount) {
        amountInput.value = amount;
      }
    });
  });

  // Handle payment method selection
  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      // Remove active class from all methods
      paymentMethods.forEach((m) => m.classList.remove("active"));

      // Add active class to clicked method
      this.classList.add("active");

      // Update payment method in form
      const paymentType = this.getAttribute("data-method");
      const paymentInput = document.querySelector(
        'input[name="payment_method"]'
      );

      if (paymentInput && paymentType) {
        paymentInput.value = paymentType;
      }
    });
  });
}

// Statistics Animation
function initStatisticsAnimation() {
  const statistics = document.querySelectorAll(".statistic-number");

  // Check if IntersectionObserver is supported
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statElement = entry.target;
            const targetValue = parseInt(
              statElement.getAttribute("data-value")
            );
            const suffix = statElement.getAttribute("data-suffix") || "";
            animateCounter(statElement, targetValue, suffix);
            observer.unobserve(statElement);
          }
        });
      },
      { threshold: 0.5 }
    );

    statistics.forEach((stat) => {
      observer.observe(stat);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    statistics.forEach((stat) => {
      const targetValue = parseInt(stat.getAttribute("data-value"));
      const suffix = stat.getAttribute("data-suffix") || "";
      stat.textContent = targetValue + suffix;
    });
  }
}

// Helper Functions
function showFormError(inputElement, message) {
  // Clear any existing error
  clearFormError(inputElement);

  // Create error message element
  const errorElement = document.createElement("div");
  errorElement.className = "form-error";
  errorElement.textContent = message;

  // Add error class to input
  inputElement.classList.add("form-error-input");

  // Insert error message after input
  inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
}

function clearFormError(inputElement) {
  // Remove error class from input
  inputElement.classList.remove("form-error-input");

  // Remove any existing error message
  const errorElement = inputElement.parentNode.querySelector(".form-error");
  if (errorElement) {
    errorElement.remove();
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function animateCounter(element, target, suffix = "") {
  let current = 0;
  const increment = target / 50; // Adjust for animation speed
  const duration = 1500; // Animation duration in ms
  const interval = duration / 50;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, interval);
}

// Reveal Elements on Scroll (if needed)
function revealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    revealElements.forEach((element) => {
      element.classList.add("revealed");
    });
  }
}
