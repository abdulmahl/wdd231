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
  const members = await response.json();
  displayMembers(members);
  console.log(members);
};

fetchMemberData();

const displayMembers = (members) => {
  members.forEach((member) => {
    let member_card = document.createElement("section");
    member_card.classList.add("member-card");
    let member_name = document.createElement("h2");
    member_name.textContent = member.name;
    let tag_line = document.createElement("p");
    tag_line.textContent = member.description;

    let title_container = document.createElement("div");
    title_container.classList.add("title-container");

    let member_image = document.createElement("img");
    member_image.setAttribute("src", member.image);
    member_image.setAttribute("alt", member.name);
    member_image.setAttribute("loading", "lazy");
    member_image.setAttribute("width", "300");
    member_image.setAttribute("height", "auto");

    let email = document.createElement("span");
    let phone = document.createElement("span");
    let url = document.createElement("span");

    let image_wrapper = document.createElement("div");
    image_wrapper.classList.add("image-wrapper");

    email.textContent = member.email;
    phone.textContent = member.phone;
    url.textContent = member.url;

    image_wrapper.append(member_image);
    image_wrapper.append(email);
    image_wrapper.append(phone);
    image_wrapper.append(url);

    title_container.append(member_name);
    title_container.append(tag_line);

    member_card.append(title_container);
    member_card.append(image_wrapper)


    business_members.append(member_card);
  });
};
