document.addEventListener('DOMContentLoaded', function() {
  // Schedule tabs functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const daySchedules = document.querySelectorAll('.day-schedule');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and schedules
      tabButtons.forEach(btn => btn.classList.remove('active'));
      daySchedules.forEach(schedule => schedule.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding schedule
      const day = this.getAttribute('data-day');
      document.getElementById(day).classList.add('active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (emailInput.value) {
        // Here you would typically send this to your backend
        // For demo purposes, we'll just show an alert
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }
  
  // Sticky navigation on scroll
  const mainNav = document.querySelector('.main-nav');
  const heroSection = document.querySelector('.hero');
  
  if (mainNav && heroSection) {
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 200) {
        mainNav.classList.add('sticky');
      } else {
        mainNav.classList.remove('sticky');
      }
    });
  }
  
  // Countdown to festival (if it's in the future)
  const festivalDate = new Date('June 15, 2025 10:00:00').getTime();
  const countdownElement = document.getElementById('countdown');
  
  if (countdownElement) {
    // Update the countdown every second
    const countdownInterval = setInterval(function() {
      const now = new Date().getTime();
      const distance = festivalDate - now;
      
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Display the result
      countdownElement.innerHTML = `
        <div class="countdown-unit">
          <span class="countdown-number">${days}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-number">${hours}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-number">${minutes}</span>
          <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-number">${seconds}</span>
          <span class="countdown-label">Seconds</span>
        </div>
      `;
      
      // If the countdown is finished, clear interval and display message
      if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "<p>The festival has begun!</p>";
      }
    }, 1000);
  }
  
  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('active');
      }
    }
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on page load too
});