const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector("#cards");

const getProphetData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
    console.table(data.prophets);
  } catch (error) {
    console.log(error);
  }
};

getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    let card = document.createElement("section");
    let fullName = document.createElement("h2");
    let portrait = document.createElement("img");
    let birthdate = document.createElement("p");
    let birthplace = document.createElement("span");

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname}`,
    );
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");
    birthdate.textContent = `${prophet.birthdate} - ${prophet.death != null ? prophet.death : "Current"}`;
    birthplace.textContent = prophet.birthplace;

    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthdate);
    card.appendChild(birthplace);

    cards.appendChild(card);
  });
};
