
const toggle = document.getElementById("chatbotToggle");
const closeBtn = document.getElementById("chatbotClose");
const windowChat = document.getElementById("chatbotWindow");
const input = document.getElementById("chatbotInput");
const send = document.getElementById("chatbotSend");
const messages = document.getElementById("chatbotMessages");


toggle.onclick = () => {
    windowChat.classList.toggle("active");
    document.body.style.overflow =
        windowChat.classList.contains("active") ? "hidden" : "";
};

closeBtn.onclick = () => {
    windowChat.classList.remove("active");
    document.body.style.overflow = "";
};

/* ================= UI MESSAGE ================= */
function addMsg(text, user = false) {
    const msg = document.createElement("div");
    msg.className = `msg ${user ? "user" : "bot"}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    msg.appendChild(bubble);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function isArabic(text) {
    return /[\u0600-\u06FF]/.test(text);
}

function getIntent(text) {
    const msg = text.toLowerCase();

    if (
        msg.includes("hello") ||
        msg.includes("hi") ||
        msg.includes("مرحبا") ||
        msg.includes("اهلا") ||
        msg.includes("السلام")
    ) return "greeting";

    if (
        msg.includes("services") ||
        msg.includes("what do you do") ||
        msg.includes("خدمات") ||
        msg.includes("بتعملوا ايه") ||
        msg.includes("بتقدموا ايه")
    ) return "services";

    if (
        msg.includes("contact") ||
        msg.includes("email") ||
        msg.includes("تواصل") ||
        msg.includes("ايميل") ||
        msg.includes("رقم")
    ) return "contact";

    return "unknown";
}


function botReply(message) {
    const intent = getIntent(message);
    const arabic = isArabic(message);

    if (intent === "greeting") {
        return arabic
            ? "أهلاً بيك 👋، أقدر أساعدك في إيه؟"
            : "Hello 👋 How can I help you?";
    }

    if (intent === "services") {
        return arabic
            ? "نقدّم خدمات ميديا، تسويق، CRM، ودعم عملاء 💼"
            : "We provide Media Production, Marketing, CRM & Customer Support 🚀";
    }

    if (intent === "contact") {
        return arabic
            ? "تقدر تتواصل معانا على: info@alshimimedia.com 📧"
            : "You can contact us at info@alshimimedia.com 📧";
    }

    return arabic
        ? "ممكن توضحي أكتر علشان أقدر أساعدك؟ 🙂"
        : "Can you please tell me more? 🙂";
}

send.onclick = sendMessage;
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMsg(text, true);

    setTimeout(() => {
        addMsg(botReply(text));
    }, 500);

    input.value = "";
}

