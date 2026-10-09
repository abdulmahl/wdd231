import { getSavedIds, isSaved, toggleSaved } from './storage.js';

let tracks = [];
let dialog = null;

const elements = {
  grid: document.querySelector('#archive-grid'),
  status: document.querySelector('#archive-status'),
  search: document.querySelector('#search-input'),
  era: document.querySelector('#era-filter'),
  savedOnly: document.querySelector('#saved-only'),
  count: document.querySelector('#crate-count'),
  dialog: document.querySelector('#detail-dialog'),
  close: document.querySelector('#dialog-close'),
  cover: document.querySelector('#dialog-cover'),
  kicker: document.querySelector('#dialog-kicker'),
  title: document.querySelector('#dialog-title'),
  subtitle: document.querySelector('#dialog-subtitle'),
  meta: document.querySelector('#dialog-meta'),
  note: document.querySelector('#dialog-note')
};

export async function initArchive() {
  if (!elements.grid) return;

  dialog = elements.dialog;
  elements.search.addEventListener('input', render);
  elements.era.addEventListener('change', render);
  elements.savedOnly.addEventListener('change', render);
  elements.close.addEventListener('click', () => dialog.close());

  try {
    const response = await fetch('./data/tracks.json');
    if (!response.ok) throw new Error(`Archive data request failed: ${response.status}`);
    tracks = await response.json();
    render();
  } catch (error) {
    elements.status.textContent = 'The archive could not load right now. Please refresh and try again.';
    console.error(error);
  }
}

function render() {
  const query = elements.search.value.trim().toLowerCase();
  const era = elements.era.value;
  const saved = new Set(getSavedIds());

  const filtered = tracks.filter((item) => {
    const matchesQuery = !query || [item.track, item.artist, item.album, item.producer, item.region].some((value) => value.toLowerCase().includes(query));
    const matchesEra = era === 'all' || item.era === era;
    const matchesSaved = !elements.savedOnly.checked || saved.has(item.id);
    return matchesQuery && matchesEra && matchesSaved;
  });

  elements.status.textContent = `${filtered.length} archive ${filtered.length === 1 ? 'item' : 'items'} shown.`;
  elements.grid.innerHTML = filtered.map(createCard).join('');
  updateCount(saved.size);
  bindCards();
}

function createCard(item) {
  const saved = isSaved(item.id);
  return `
    <article class="archive-card">
      <div class="cover cover-${item.cover}" role="img" aria-label="Abstract archive cover for ${item.album}">
        <span>${item.year}</span>
        <strong>${item.short}</strong>
      </div>
      <div class="card-body">
        <p class="tag">${item.type} · ${item.era}</p>
        <h3>${item.track}</h3>
        <p class="artist">${item.artist}</p>
        <dl class="mini-meta">
          <div><dt>Album</dt><dd>${item.album}</dd></div>
          <div><dt>Producer</dt><dd>${item.producer}</dd></div>
          <div><dt>Region</dt><dd>${item.region}</dd></div>
        </dl>
        <div class="card-actions">
          <button class="text-button detail-button" data-id="${item.id}" type="button">View breakdown</button>
          <button class="save-button ${saved ? 'saved' : ''}" data-save="${item.id}" type="button" aria-pressed="${saved}">${saved ? '★ Saved' : '☆ Save'}</button>
        </div>
      </div>
    </article>`;
}

function bindCards() {
  elements.grid.querySelectorAll('[data-save]').forEach((button) => {
    button.addEventListener('click', () => {
      const ids = toggleSaved(button.dataset.save);
      updateCount(ids.length);
      render();
    });
  });

  elements.grid.querySelectorAll('.detail-button').forEach((button) => {
    button.addEventListener('click', () => openDialog(button.dataset.id));
  });
}

function openDialog(id) {
  const item = tracks.find((entry) => entry.id === id);
  if (!item) return;

  elements.cover.className = `dialog-cover cover cover-${item.cover}`;
  elements.cover.innerHTML = `<span>${item.year}</span><strong>${item.short}</strong>`;
  elements.kicker.textContent = `${item.type} · ${item.era}`;
  elements.title.textContent = item.track;
  elements.subtitle.textContent = `${item.artist} · ${item.album}`;
  elements.meta.innerHTML = `
    <div><dt>Producer</dt><dd>${item.producer}</dd></div>
    <div><dt>Region</dt><dd>${item.region}</dd></div>
    <div><dt>Focus</dt><dd>${item.focus}</dd></div>`;
  elements.note.textContent = item.note;
  dialog.showModal();
}

function updateCount(count) {
  elements.count.textContent = `${count} saved`;
}
