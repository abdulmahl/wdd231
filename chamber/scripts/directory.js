const hamButton = document.querySelector("#ham-btn");
const menuItems = document.querySelector("#menuItems");

hamButton.addEventListener("click", () => {
  hamButton.classList.toggle("open");
  menuItems.classList.toggle("show");
});

const url = "https://abdulmahl.github.io/wdd231/chamber/data/members.json";

const business_members = document.querySelector("#members");

const fetchMemberData = async () => {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
};

fetchMemberData();

const displayMembers = (members) => {
  members.forEach((member) => {
    let member_card = document.createElement("section");
    let member_name = document.createElement("h2");
    let tag_line = document.createElement("p");

    let member_image = document.createElement("img");
    member_image.setAttribute("src", member.image)
  });
};
