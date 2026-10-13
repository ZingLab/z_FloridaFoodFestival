// Applies festival end dates in the visitor's browser, so nothing waits on the next site build:
// ended festivals disappear from lists, and featured/sponsored placements end on schedule
// (the build already caps every placement at the festival's end date).
// Loaded at the end of <body> (not deferred) so it runs before other DOMContentLoaded handlers.
(function() {
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var now = new Date();
  var today = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  window.FFF_TODAY = today;

  function each(selector, fn) { Array.prototype.forEach.call(document.querySelectorAll(selector), fn); }

  // Ended festivals leave every list
  each('.fest-card[data-end]', function(card) {
    if (card.getAttribute('data-end') < today) card.parentNode.removeChild(card);
  });

  // Featured placements
  each('.featured-card[data-featured-until]', function(card) {
    if (card.getAttribute('data-featured-until') < today) card.parentNode.removeChild(card);
  });
  each('.fest-card[data-featured-until]', function(card) {
    if (card.getAttribute('data-featured-until') < today) {
      card.classList.remove('is-featured');
      Array.prototype.forEach.call(card.querySelectorAll('.fest-flag--featured'), function(flag) { flag.parentNode.removeChild(flag); });
    }
  });
  var empty = document.querySelector('.featured-empty');
  if (empty && !document.querySelector('.featured-card')) empty.hidden = false;

  // "Presented by" sponsorships
  each('.fest-card[data-sponsor-until]', function(card) {
    if (card.getAttribute('data-sponsor-until') < today) {
      card.classList.remove('is-sponsored');
      Array.prototype.forEach.call(card.querySelectorAll('.fest-flag--sponsor'), function(flag) { flag.parentNode.removeChild(flag); });
    }
  });
  var page = document.querySelector('.festival-page');
  if (page) {
    var sponsorUntil = page.getAttribute('data-sponsor-until');
    if (sponsorUntil && sponsorUntil < today) {
      // Sponsorship over: drop the sponsor bar and "Event is sponsored" labels, offer the slot again
      each('[data-sponsor-block], [data-sponsor-status]', function(el) { el.parentNode.removeChild(el); });
      each('[data-sponsor-cta]', function(el) { el.hidden = false; });
    }
    if (page.getAttribute('data-festival-end') < today) {
      each('[data-ended-notice]', function(el) { el.hidden = false; });
      each('[data-sponsor-cta]', function(el) { el.parentNode.removeChild(el); });
    }
  }

  // Lists render a few spare cards; trim back to their intended length
  each('[data-limit]', function(grid) {
    var limit = parseInt(grid.getAttribute('data-limit'), 10);
    Array.prototype.slice.call(grid.querySelectorAll('.fest-card'), limit).forEach(function(card) {
      card.parentNode.removeChild(card);
    });
    if (!grid.querySelector('.fest-card')) {
      var section = grid.closest('section');
      if (section) section.hidden = true;
    }
  });
})();
