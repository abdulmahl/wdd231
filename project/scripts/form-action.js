document.querySelectorAll('#current-year').forEach((el) => el.textContent = new Date().getFullYear());

const submission = document.querySelector('#submission');
const params = new URLSearchParams(window.location.search);
const fields = [
  ['Artist / group', 'artist'],
  ['Track', 'track'],
  ['Album', 'album'],
  ['Producer', 'producer'],
  ['Release year', 'year'],
  ['Your name', 'name'],
  ['Why it should be archived', 'reason']
];

const rows = fields.map(([label, key]) => `<div><dt>${label}</dt><dd>${escapeHTML(params.get(key) || 'Not provided')}</dd></div>`).join('');
submission.innerHTML = `<dl class="submission-list">${rows}</dl>`;

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
  })[character]);
}
