const hamButton = document.querySelector("#ham-btn");
const menuItems = document.querySelector("#menuItems");

hamButton.addEventListener("click", () => {
  hamButton.classList.toggle("open");
  menuItems.classList.toggle("show");
});

const url = "https://abdulmahl.github.io/wdd231/chamber/data/members.json";
const business_members = document.querySelector("#members");

// Targeting explicit IDs directly
const gridBtn = document.querySelector("#grid-view-btn");
const listBtn = document.querySelector("#list-view-btn");

business_members.classList.add("grid-view");
gridBtn.classList.add("active-view");

gridBtn.addEventListener("click", () => {
  business_members.classList.add("grid-view");
  business_members.classList.remove("list-view");
  gridBtn.classList.add("active-view");
  listBtn.classList.remove("active-view");
});

listBtn.addEventListener("click", () => {
  business_members.classList.add("list-view");
  business_members.classList.remove("grid-view");
  listBtn.classList.add("active-view");
  gridBtn.classList.remove("active-view");
});

const fetchMemberData = async () => {
  try {
    const response = await fetch(url);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading member data:", error);
  }
};

fetchMemberData();

const displayMembers = (members) => {
  business_members.innerHTML = "";

  members.forEach((member) => {
    const member_card = document.createElement("section");
    member_card.classList.add("member-card");

    member_card.innerHTML = `<div class="title-container">
      <h2>${member.name}</h2>
      <p>${member.description}</p>
      </div>
      <div class="image-wrapper">
        <img src="${member.image}" alt="${member.name}" loading="lazy" width="350" height="auto" />
        <div class="contact-wrapper">
          <a href="mailto:${member.email}">${member.email}</a>
          <a href="tel:${member.phone.replace(/[^0-9+]/g, "")}">${member.phone}</a>
          <a href="${member.url}" target="_blank" rel="noopener">${member.url}</a>
        </div>
      </div>`;

    business_members.append(member_card);
  });
};

// Dynamic Year & Last Modified Footer Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;
