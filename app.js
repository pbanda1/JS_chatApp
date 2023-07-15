// @ts-nocheck

const markoSelectorBtn = document.querySelector("#marko-selector");
const ivaSelectorBtn = document.querySelector("#iva-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

const messages = JSON.parse(localStorage.getItem("messages")) || [];

// kreiranje elemenata
const createChatMessageElement = (message) => `

  <div class="message ${message.sender === "Marko" ? "blue-bg" : "red-bg"}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
    });
};

let messageSender = "Marko";

const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`;

    if (name === "Marko") {
        markoSelectorBtn.classList.add("active-person");
        ivaSelectorBtn.classList.remove("active-person");
    }
    if (name === "Iva") {
        ivaSelectorBtn.classList.add("active-person");
        markoSelectorBtn.classList.remove("active-person");
    }

    /* fokusiranje na input field */
    chatInput.focus();
};

markoSelectorBtn.onclick = () => updateMessageSender("Marko");
ivaSelectorBtn.onclick = () => updateMessageSender("Iva");

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString("hr-HR", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    });
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    };

    /* spremanje poruke u storage*/
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));

    /* dodavanje poruke u dom*/
    chatMessages.innerHTML += createChatMessageElement(message);

    /* resetiranje input fielda*/
    chatInputForm.reset();

    /*  scrolanje unutar chatboxa prilikom overloada visine porukama */
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener("submit", sendMessage);

clearChatBtn.addEventListener("click", () => {
    localStorage.clear();
    chatMessages.innerHTML = "";
});
