const PASSWORD = "Pr@1407rs";
let attempts = 0;

function askPassword() {
    const entered = prompt("Enter password to access announcements:");
    if (entered === PASSWORD) {
        initApp();
    } else {
        attempts++;
        alert("Wrong password!");
        if (attempts < 3) {
            askPassword();
        } else {
            document.body.innerHTML = "<h2 style='color:red'>Access Denied</h2>";
        }
    }
}

askPassword();

function initApp() {
    // ... all your messaging.js logic goes here ...
}









const messageList = document.getElementById("message");
const textbox = document.getElementById("textbox");
const datebox = document.getElementById("datebox");
const button = document.getElementById("button");

// Load saved announcements
window.onload = async () => {
    try {
        const res = await fetch("http://localhost:3000/announcements");
        const data = await res.json();
        data.forEach(({ message, date }) => {
            addMessageToDOM(message, date);
        });
    } catch (err) {
        console.error("Failed to load announcements:", err);
    }
};

// On button click
button.addEventListener("click", async () => {
    const text = textbox.value.trim();
    const date = datebox.value;

    if (text === "") return;

    try {
        await fetch("http://localhost:3000/announcements", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text, date })
        });

        addMessageToDOM(text, date);
        textbox.value = "";
        datebox.value = "";
    } catch (err) {
        console.error("Failed to save announcement:", err);
    }
});

// Add message to screen
function addMessageToDOM(message, date) {
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="message-content">${message}</div>
        ${date ? `<div class="message-date"> ${date}</div>` : ""}
    `;

    // Add styles
    li.style.padding = "12px";
    li.style.margin = "10px 0";
    li.style.borderRadius = "10px";
    li.style.backgroundColor = "#fff8dc";
    li.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    li.style.transition = "all 0.2s ease-in-out";

    // Hover effects
    li.addEventListener("mouseenter", () => {
        li.style.transform = "scale(1.03)";
        li.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
    });

    li.addEventListener("mouseleave", () => {
        li.style.transform = "scale(1)";
        li.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    });

    messageList.appendChild(li);
}
