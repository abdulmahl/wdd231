import { places } from "../data/places.mjs";
const main = document.querySelector("main");
// Optional: create a wrapper grid container if you have one
const gridContainer = document.createElement("div");
gridContainer.classList.add("discover-grid");

places.forEach((place) => {
  // Create the card element
  const card = document.createElement("section");
  card.classList.add("card");

  // Build the card structure per WDD 231 requirements
  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.photo}" alt="${place.name}" loading="lazy" width="300" height="200">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
  `;

  // Append the card to the container
  gridContainer.appendChild(card);
});

// Append the grid to main once after the loop finishes
main.appendChild(gridContainer);

const visitMessage = document.querySelector("#visitor-message");
const lastVisit = Number(window.localStorage.getItem("last-visit-ms")) || 0;
const currentVisit = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const msToDays = 86400000; // Milliseconds in one day (1000 * 60 * 60 * 24)
  const daysBetween = Math.floor((currentVisit - lastVisit) / msToDays);

  if (daysBetween < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
  }
}

// Save current visit timestamp for next time
window.localStorage.setItem("last-visit-ms", currentVisit);
