const myInfo = new URLSearchParams(window.location.search);

console.log(myInfo.get("first-name"));

const thankYouMessage = document.querySelector("#thank-you-msg");

thankYouMessage.innerHTML = `<p>Thank you ${myInfo.get("first-name")}</p><p></p><p></p><p></p>`;
