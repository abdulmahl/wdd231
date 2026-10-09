import { initNavigation } from './navigation.js';

initNavigation();
document.querySelectorAll('#current-year').forEach((el) => el.textContent = new Date().getFullYear());

const grid = document.querySelector('#producers-grid');
const status = document.querySelector('#producers-status');

async function loadProducers() {
  try {
    const response = await fetch('./data/producers.json');
    if (!response.ok) throw new Error(`Producer data request failed: ${response.status}`);
    const producers = await response.json();
    grid.innerHTML = producers.map((producer, index) => `
      <article class="producer-card">
        <div class="producer-index">0${index + 1}</div>
        <div>
          <p class="eyebrow">${producer.scene}</p>
          <h2>${producer.name}</h2>
          <p class="producer-style">${producer.signature}</p>
          <dl class="mini-meta producer-meta">
            <div><dt>Known for</dt><dd>${producer.knownFor}</dd></div>
            <div><dt>Era</dt><dd>${producer.era}</dd></div>
            <div><dt>Notable work</dt><dd>${producer.notable}</dd></div>
            <div><dt>Approach</dt><dd>${producer.approach}</dd></div>
          </dl>
        </div>
      </article>
    `).join('');
    status.textContent = `${producers.length} producer spotlights loaded.`;
  } catch (error) {
    status.textContent = 'The producer archive could not load right now.';
    console.error(error);
  }
}

loadProducers();
