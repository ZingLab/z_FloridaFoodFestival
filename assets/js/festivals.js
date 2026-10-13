// Festival directory: filtering, sorting and shareable URL state
document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('fest-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.fest-card'));
  const countEl = document.getElementById('fest-count');
  const emptyEl = document.getElementById('fest-empty');
  const resetBtn = document.getElementById('fest-reset');

  // Form controls, keyed by their URL parameter name
  const controls = {
    q: document.getElementById('f-q'),
    region: document.getElementById('f-region'),
    type: document.getElementById('f-cat'),
    month: document.getElementById('f-month'),
    admission: document.getElementById('f-admission'),
    size: document.getElementById('f-tier'),
    sort: document.getElementById('f-sort')
  };

  // Ended festivals and expired placements were already removed by festival-expiry.js
  const today = window.FFF_TODAY;
  document.getElementById('fest-total').textContent = cards.length;
  cards.forEach(card => {
    if (card.dataset.start <= today) {
      card.classList.add('is-live');
      card.querySelector('.fest-card-when').insertAdjacentHTML('afterbegin', '<span class="fest-live">Happening now</span> ');
    }
  });

  // Restore state from the URL so filtered views can be shared and bookmarked
  const params = new URLSearchParams(window.location.search);
  Object.keys(controls).forEach(key => {
    if (params.has(key) && controls[key]) controls[key].value = params.get(key);
  });

  function apply() {
    const q = controls.q.value.trim().toLowerCase();
    const region = controls.region.value;
    const type = controls.type.value;
    const month = controls.month.value;
    const admission = controls.admission.value;
    const size = controls.size.value;
    const sort = controls.sort.value;

    let shown = 0;
    cards.forEach(card => {
      const d = card.dataset;
      const match =
        (!q || q.split(/\s+/).every(term => d.search.includes(term))) &&
        (!region || d.region === region) &&
        (!type || d.cats.split('|').includes(type)) &&
        (!month || d.months.split('|').includes(month)) &&
        (!admission || d.admission === admission) &&
        (!size || d.tier === size);
      card.hidden = !match;
      if (match) shown++;
    });

    const sorted = cards.slice().sort((a, b) => {
      if (sort === 'date') return a.dataset.start.localeCompare(b.dataset.start);
      if (sort === 'name') return a.dataset.name.localeCompare(b.dataset.name);
      // Default "Biggest first" order pins featured festivals to the top
      const fa = a.classList.contains('is-featured'), fb = b.classList.contains('is-featured');
      if (fa !== fb) return fa ? -1 : 1;
      return Number(a.dataset.rank) - Number(b.dataset.rank);
    });
    sorted.forEach(card => grid.appendChild(card));

    countEl.textContent = 'Showing ' + shown + ' of ' + cards.length + ' festivals';
    emptyEl.hidden = shown !== 0;

    // Sync URL (omit defaults)
    const next = new URLSearchParams();
    Object.keys(controls).forEach(key => {
      const v = controls[key].value.trim();
      if (v && !(key === 'sort' && v === 'rank')) next.set(key, v);
    });
    resetBtn.hidden = next.toString() === '';
    const qs = next.toString();
    history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
  }

  Object.values(controls).forEach(el => {
    el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', apply);
  });

  resetBtn.addEventListener('click', function() {
    Object.keys(controls).forEach(key => {
      controls[key].value = key === 'sort' ? 'rank' : '';
    });
    apply();
  });

  apply();
});
