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
    <button>Learn More</button>
  `;

  // Append the card to the container
  gridContainer.appendChild(card);
});

// Append the grid to main once after the loop finishes
main.appendChild(gridContainer);
