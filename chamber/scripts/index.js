const membersUrl =
  "https://abdulmahl.github.io/wdd231/chamber/data/members.json";

const spotlightContainer = document.querySelector("#spotlight-container");

const getRandomMembers = (members, number) => {
  const eligibleMembers = members.filter(
    (member) => member.membership === "Gold" || member.membership === "Silver",
  );

  const shuffled = [...eligibleMembers].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, number);
};

const displaySpotlights = (members) => {
  spotlightContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");

    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img
        src="${member.image}"
        alt="${member.name} logo"
        loading="lazy"
        width="350"
        height="auto"
      >

      <div class="home-member-card">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <p><strong>Membership:</strong> ${member.membership}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a
          href="${member.url}"
          target="_blank"
          rel="noopener"
        >
          Visit Website
        </a>
      </div>
    `;

    spotlightContainer.appendChild(card);
  });
};

const fetchMembers = async () => {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error("Unable to load member data.");
    }

    const members = await response.json();

    const numberOfSpotlights = Math.random() < 0.5 ? 2 : 3;

    const selectedMembers = getRandomMembers(members, numberOfSpotlights);

    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error("Error loading members:", error);
    spotlightContainer.innerHTML = "<p>Unable to load business spotlights.</p>";
  }
};

fetchMembers();
