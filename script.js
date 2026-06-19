/* =========================
   AOS Animation
========================= */

AOS.init({
    duration: 1000,
    once: true
});

/* =========================
   Dynamic Footer Year
========================= */

document.getElementById("year").textContent =
new Date().getFullYear();

/* =========================
   Mobile Menu
========================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

/* =========================
   Project Modal
========================= */

const projects = {
    1: {
        title: "Portfolio Website",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        description: "Responsive portfolio website showcasing skills and projects.",
        tech: "HTML, CSS, JavaScript",
        link: "https://github.com/susmitha-rajlin"
    },

    2: {
        title: "AI Chatbot",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        description: "AI chatbot integrated using Groq API.",
        tech: "JavaScript, Groq API",
        link: "https://github.com/susmitha-rajlin"
    },

    3: {
        title: "Quiz Application",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        description: "Interactive quiz application with score tracking.",
        tech: "HTML, CSS, JavaScript",
        link: "https://github.com/susmitha-rajlin"
    },

    4: {
        title: "JavaScript Projects",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        description: "Collection of mini JavaScript applications.",
        tech: "JavaScript",
        link: "https://github.com/susmitha-rajlin"
    }
};

function openModal(id) {

    document.getElementById("projectModal").style.display = "flex";

    document.getElementById("modalImage").src =
        projects[id].image;

    document.getElementById("modalTitle").textContent =
        projects[id].title;

    document.getElementById("modalDescription").textContent =
        projects[id].description;

    document.getElementById("modalTech").textContent =
        "Tech Stack: " + projects[id].tech;

    document.getElementById("modalLink").href =
        projects[id].link;
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
}

/* =========================
   Testimonials Auto Rotate
========================= */

const testimonials =
document.querySelectorAll(".testimonial");

let currentTestimonial = 0;

setInterval(() => {

    testimonials[currentTestimonial]
        .classList.remove("active");

    currentTestimonial =
        (currentTestimonial + 1) %
        testimonials.length;

    testimonials[currentTestimonial]
        .classList.add("active");

}, 6000);

/* =========================
   Gallery Lightbox
========================= */

const galleryImages =
document.querySelectorAll(".gallery-img");

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightboxImg");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImg.src = img.src;

    });

});

document.getElementById("closeLightbox")
.addEventListener("click", () => {

    lightbox.style.display = "none";

});

/* =========================
   EmailJS Contact Form
========================= */

emailjs.init("Ul4bruxAKiSnsp2Xv");

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener("submit",
async function(e) {

    e.preventDefault();

    const status =
        document.getElementById("formStatus");

    status.textContent = "Sending...";

    try {

        await emailjs.send(
            "service_lge29iu",
            "template_1e8zjpf",
            {
                from_name:
                    document.getElementById("name").value,

                from_email:
                    document.getElementById("email").value,

                message:
                    document.getElementById("message").value
            }
        );

        status.textContent =
            "Message sent successfully!";

        contactForm.reset();

    }

    catch(error) {

        status.textContent =
            "Failed to send message.";

        console.error(error);
    }

});

/* =========================
   Chatbot
========================= */

const chatBox =
document.getElementById("chatBox");

const userInput =
document.getElementById("userInput");

const sendBtn =
document.getElementById("sendBtn");

const typingIndicator =
document.getElementById("typingIndicator");

/* Load Session History */

let chatHistory =
JSON.parse(
    sessionStorage.getItem("chatHistory")
) || [];

chatHistory.forEach(msg => {

    addMessage(msg.role, msg.content);

});

/* Send Message */

sendBtn.addEventListener("click",
sendMessage);

userInput.addEventListener("keypress",
(e) => {

    if(e.key === "Enter")
        sendMessage();

});

async function sendMessage() {

    const message =
        userInput.value.trim();

    if(!message) return;

    addMessage("user", message);

    chatHistory.push({
        role: "user",
        content: message
    });

    userInput.value = "";

    typingIndicator.style.display =
        "block";

    try {

        const reply =
            await askGroq(message);

        typingIndicator.style.display =
            "none";

        addMessage("bot", reply);

        chatHistory.push({
            role: "bot",
            content: reply
        });

        sessionStorage.setItem(
            "chatHistory",
            JSON.stringify(chatHistory)
        );

    }

    catch(error) {

        typingIndicator.style.display =
            "none";

        addMessage(
            "bot",
            "Error connecting to AI."
        );

        console.error(error);

    }

}

function addMessage(role, text) {

    const div =
        document.createElement("div");

    div.classList.add(
        "message",
        role === "user"
            ? "user"
            : "bot"
    );

    div.textContent = text;

    chatBox.appendChild(div);

    chatBox.scrollTop =
        chatBox.scrollHeight;

}

async function askGroq(message) {

    const response =
        await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer gsk_c2rywDf81Vljzfiyrebjyb3FYfJCXxSTKjTaAH8gGNko6RF9Y"
                },

                body: JSON.stringify({

                   model: 
                   "llama-3.3-70b-versatile",

                    messages: [
                        {
                            role: "user",
                            content: message
                        }
                    ]

                })

            }
        );

    const data =
        await response.json();

    return data.choices[0]
        .message.content;

}