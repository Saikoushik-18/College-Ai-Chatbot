
const WEBSITE = "https://www.trr.org.in/";

const userMessage = [
  ["hi", "hello", "hey", "good morning", "good evening"],
  ["principal", "who is the principal", "principal of college"],
  ["secretary", "who is the secretary", "name of the secretary"],
  ["vice principal", "who is the vice principal"],
  ["how are you", "how is life", "how are things"],
  ["courses", "courses offered", "branches", "departments", "groups offered"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you a bot"],
  ["who created you", "who made you"],
  ["your name", "what is your name", "name please"],
  ["college timings", "college time", "opening time"],
  ["when was college established", "college established"],
  ["cse faculty", "faculty of cse", "computer science faculty"],
  ["about college", "tell me about college", "college information"],
  ["why join this college", "college advantages"],
  ["hostel", "boys hostel", "girls hostel"],
  ["rules", "rules and regulations"],
  ["fests", "college festivals", "cultural activities"],
  ["founder", "college founder"],
  ["fees", "fee structure", "college fee"],
  ["extracurricular activities", "cultural programs", "college events"],
  ["health care", "health facilities", "medical facilities"],
  ["boring", "i am bored"],
  ["i am tired", "im tired"],
  ["admission", "admission process", "documents required"],
  ["college name", "name of college"],
  ["address", "location", "where is the college"],
  ["contact", "contact details", "phone number"],
  ["goodbye", "bye", "take care"]
];

const botReply = [
  ["Hello! Welcome to TRR College of Technology."],
  ["Please check the official website for current principal details: " + WEBSITE + "faculty"],
  ["Please visit the official website for management details: " + WEBSITE + "about-us"],
  ["Please check the official faculty page for vice principal details: " + WEBSITE + "faculty"],
  ["I'm doing great! How can I help you with college information?"],
  ["TRR offers programs in Engineering, Pharmacy, and Polytechnic. Explore the courses here: " + WEBSITE + "courses"],
  ["I'm here to answer your questions about TRR College!"],
  ["I'm an AI chatbot, so I don't have a human age."],
  ["I'm Smart Connect, a college information chatbot."],
  ["I was created by students using JavaScript."],
  ["My name is Smart Connect."],
  ["Please contact the college to confirm current timings: " + WEBSITE],
  ["TRR Polytechnic was established in 2004. See the official website for institutional history: " + WEBSITE + "about-us"],
  ["Find the current Computer Science faculty details here: " + WEBSITE + "faculty"],
  ["TRR Group of Institutions provides educational programs in Hyderabad, Telangana. Learn more: " + WEBSITE + "about-us"],
  ["Explore courses, facilities, and admission information before choosing your college: " + WEBSITE],
  ["Please contact the college to confirm current hostel availability: " + WEBSITE + "on-campus"],
  ["Please refer to the college for its current rules and regulations: " + WEBSITE],
  ["For college events and activities, check the official website: " + WEBSITE],
  ["Read about the institution's founder on the official website: " + WEBSITE + "about-us"],
  ["Fees vary by course and admission category. Contact the college for the latest fee structure: " + WEBSITE],
  ["For campus activities and events, please visit: " + WEBSITE],
  ["Please contact the college to confirm current healthcare facilities: " + WEBSITE],
  ["Sorry you're bored! Let's explore the courses or campus facilities."],
  ["Take a short break and get some rest!"],
  ["Admission requirements and required documents depend on the course. Check: " + WEBSITE + "admissions"],
  ["The institution is TRR Group of Institutions, which includes TRR College of Technology."],
  ["TRR is located in Meerpet, Hyderabad, Telangana. Confirm the full address here: " + WEBSITE + "contact-us"],
  ["For current contact details, visit: " + WEBSITE + "contact-us"],
  ["Goodbye! Thank you for chatting with Smart Connect."]
];

const alternative = [
  "Sorry, I couldn't find an answer. Please try asking about courses, admissions, faculty, fees, or campus facilities."
];

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\bwhats\b/g, "what is")
    .replace(/\bplease\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function compare(triggerArray, replyArray, text) {
  const matches = [];

  triggerArray.forEach((triggers, index) => {
    triggers.forEach(trigger => {
      const normalizedTrigger = normalize(trigger);

      if (
        text === normalizedTrigger ||
        text.includes(normalizedTrigger)
      ) {
        matches.push({
          index,
          length: normalizedTrigger.length
        });
      }
    });
  });

  // Prefer the most specific question.
  matches.sort((a, b) => b.length - a.length);

  if (matches.length > 0) {
    const index = matches[0].index;
    const replies = replyArray[index];

    return replies[Math.floor(Math.random() * replies.length)];
  }

  return alternative[0];
}

function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");

  const userDiv = document.createElement("div");
  userDiv.classList.add("message", "user-message");
  userDiv.textContent = input;
  mainDiv.appendChild(userDiv);

  const botDiv = document.createElement("div");
  botDiv.classList.add("message", "bot-message");

  // Safely display text and make official website URLs clickable.
  const urlPattern = /https:\/\/www\.trr\.org\.in\/[\w/-]*/g;
  let lastIndex = 0;
  let match;

  while ((match = urlPattern.exec(product)) !== null) {
    botDiv.appendChild(
      document.createTextNode(product.slice(lastIndex, match.index))
    );

    const link = document.createElement("a");
    link.href = match[0];
    link.textContent = match[0];
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    botDiv.appendChild(link);
    lastIndex = urlPattern.lastIndex;
  }

  botDiv.appendChild(
    document.createTextNode(product.slice(lastIndex))
  );

  mainDiv.appendChild(botDiv);
  mainDiv.scrollTop = mainDiv.scrollHeight;

  if (typeof voiceControl === "function") {
    voiceControl(product);
  }
}

function output(input) {
  const text = normalize(input);
  const reply = compare(userMessage, botReply, text);
  addChat(input, reply);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  const input = inputField.value.trim();

  if (input !== "") {
    inputField.value = "";
    output(input);
  }
}

document.getElementById("btn").addEventListener("click", sendMessage);

document.getElementById("input").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

document.querySelectorAll(".chat-button").forEach(button => {
  button.addEventListener("click", () => {
    output(button.getAttribute("data-message") || "");
  });
});
