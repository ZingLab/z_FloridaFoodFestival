// Sponsor / claim inquiry form: URL prefill, conditional fields, mailto fallback
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  const type = form.querySelector('#iq-type');
  const festival = form.querySelector('#iq-festival');
  const status = document.getElementById('inquiry-status');
  const params = new URLSearchParams(window.location.search);

  // Prefill from ?type= and ?festival= (links from festival pages)
  const wantedType = params.get('type') || form.dataset.defaultType;
  if (type.querySelector('option[value="' + wantedType + '"]')) type.value = wantedType;
  const wantedFestival = params.get('festival');
  if (wantedFestival && festival.querySelector('option[value="' + wantedFestival + '"]')) {
    festival.value = wantedFestival;
  }

  // Show fields relevant to the selected inquiry type
  function toggleFields() {
    form.querySelectorAll('[data-show-for]').forEach(el => {
      el.hidden = !el.dataset.showFor.split(' ').includes(type.value);
    });
  }
  type.addEventListener('change', toggleFields);
  toggleFields();

  // With a form backend configured the form posts normally; otherwise open a prefilled email
  form.addEventListener('submit', function(e) {
    if (form.querySelector('#iq-website').value) { e.preventDefault(); return; }
    if (form.getAttribute('action')) return;
    e.preventDefault();
    if (!form.reportValidity()) return;

    const label = sel => sel.options[sel.selectedIndex].text;
    const lines = [];
    form.querySelectorAll('input, select, textarea').forEach(el => {
      if (!el.name || el.name === '_gotcha' || el.closest('[hidden]') || !el.value) return;
      const fieldLabel = form.querySelector('label[for="' + el.id + '"]').textContent.replace('*', '').trim();
      lines.push(fieldLabel + ': ' + (el.tagName === 'SELECT' ? label(el) : el.value));
    });
    const subject = '[Florida Food Festival] ' + label(type) + (festival.value ? ' - ' + label(festival) : '');
    window.location.href = 'mailto:' + form.dataset.email +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    status.hidden = false;
    status.textContent = 'Your email app should open with your inquiry filled in. If it doesn\'t, email ' + form.dataset.email + ' directly.';
  });
});
