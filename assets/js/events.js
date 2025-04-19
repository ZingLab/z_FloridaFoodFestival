// Event filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  
  // Set up filter button click handlers
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide events based on filter
      eventCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
        } else if (filterValue === 'upcoming' && card.classList.contains('upcoming')) {
          card.style.display = 'block';
        } else if (filterValue === 'past' && card.classList.contains('past')) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Newsletter form submission
  const subscriptionForm = document.querySelector('.subscription-form');
  if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput.value) {
        // Here you would typically send this to your backend or email service
        alert('Thank you for subscribing to our events newsletter!');
        emailInput.value = '';
      }
    });
  }
  
  // Add animations for event cards
  const animateElements = document.querySelectorAll('.event-card');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to add 'animate' class when element is in viewport
  function checkVisibility() {
    animateElements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('animate');
      }
    });
  }
  
  // Check visibility on scroll
  window.addEventListener('scroll', checkVisibility);
  
  // Check visibility on page load
  checkVisibility();
});
