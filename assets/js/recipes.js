// Recipe filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.event-card[data-category="recipe"]');
   
    // Set up filter button click handlers
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
       
        // Add active class to clicked button
        this.classList.add('active');
       
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
       
        // Only show recipe cards
        document.querySelectorAll('.event-card').forEach(card => {
          // Hide all cards first
          card.style.display = 'none';
        });
        
        // Then only show recipe cards that match the filter
        recipeCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else if (filterValue === 'upcoming' && card.classList.contains('upcoming')) {
            card.style.display = 'block';
          } else if (filterValue === 'past' && card.classList.contains('past')) {
            card.style.display = 'block';
          }
        });
      });
    });
   
    // Add animations for recipe cards only
    const animateElements = document.querySelectorAll('.event-card[data-category="recipe"]');
   
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