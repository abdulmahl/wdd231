const hamButton = document.querySelector("#ham-btn");
const menuItems = document.querySelector("#menuItems");

hamButton.addEventListener("click", () => {
  hamButton.classList.toggle("open");
  menuItems.classList.toggle("show");
});

const url =
  "https://github.com/abdulmahl/wdd231/blob/64a430d30c89d6b03e945fec7a54f1beff33c58d/chamber/data/members.json";

const members = document.querySelector("#members");

const fetchMemberData = async () => {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
};

fetchMemberData();
