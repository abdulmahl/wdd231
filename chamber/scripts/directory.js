const hamButton = document.querySelector("#ham-btn");
const menuItems = document.querySelector("#menuItems");

hamButton.addEventListener("click", () => {
  hamButton.classList.toggle("open");
  menuItems.classList.toggle("show");
});

const url = "https://github.com/abdulmahl/wdd231/chamber/data/members.json";

const members = document.querySelector("#members");

const fetchMemberData = async () => {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
};

fetchMemberData();
