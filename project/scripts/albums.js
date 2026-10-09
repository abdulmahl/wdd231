import { initNavigation } from './navigation.js';

initNavigation();
document.querySelectorAll('#current-year').forEach((el) => el.textContent = new Date().getFullYear());

const grid = document.querySelector('#albums-grid');
const status = document.querySelector('#albums-status');

async function loadAlbums() {
  try {
    const response = await fetch('./data/albums.json');
    if (!response.ok) throw new Error(`Album data request failed: ${response.status}`);
    const albums = await response.json();
    grid.innerHTML = albums.map((album) => `
      <article class="album-feature">
        <div class="cover-large cover-${album.cover}" role="img" aria-label="Abstract cover for ${album.title}">
          <span>${album.year}</span>
          <strong>${album.short}</strong>
        </div>
        <div class="album-copy">
          <p class="eyebrow">${album.scene}</p>
          <h2>${album.title}</h2>
          <p class="artist">${album.artist}</p>
          <p>${album.retrospective}</p>
          <dl class="album-meta">
            <div><dt>Producer focus</dt><dd>${album.producer}</dd></div>
            <div><dt>Standout track</dt><dd>${album.standout}</dd></div>
            <div><dt>Year</dt><dd>${album.year}</dd></div>
          </dl>
          <button class="button button-secondary album-button" type="button" data-note="${album.note}" data-title="${album.title}">Read the note</button>
        </div>
      </article>
    `).join('');
    status.textContent = `${albums.length} retrospective albums loaded.`;
    grid.querySelectorAll('.album-button').forEach((button) => button.addEventListener('click', () => {
      const note = document.createElement('aside');
      note.className = 'inline-note';
      note.innerHTML = `<strong>${button.dataset.title}</strong><p>${button.dataset.note}</p>`;
      button.replaceWith(note);
    }));
  } catch (error) {
    status.textContent = 'The album archive could not load right now.';
    console.error(error);
  }
}

loadAlbums();
