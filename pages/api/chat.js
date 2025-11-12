// pages/api/chat.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message } = req.body;
  const lowerMsg = message.toLowerCase();

  // 🧠 Knowledge Base (RAG-style)
  const knowledge = [
    {
      keywords: ["who are you", "your name", "introduce", "yourself", "marvin"],
      answer:
        "Hi! I'm Marvin Showkat — a Computer Science student at BITS Pilani and a Full Stack Developer at Omang Technologies. I’m passionate about AI, web development, and building meaningful digital products.",
    },
    {
      keywords: ["education", "college", "study", "degree", "bits"],
      answer:
        "I'm pursuing a B.Tech in Computer Science from BITS Pilani, where I’ve focused on AI, web technologies, and software engineering.",
    },
    {
      keywords: ["work", "job", "experience", "internship", "omang"],
      answer:
        "I currently work as a Full Stack Developer at Omang Technologies, where I’ve been contributing to the YourMakan apartment management platform using Laravel and modern frontend technologies.",
    },
    {
      keywords: ["skills", "languages", "programming", "technologies"],
      answer:
        "My core skills include Java, JavaScript, HTML, CSS, PHP, Python, and SQL. I also work with frameworks like Laravel, Flask, and React, and I’m skilled in AI tools like LangChain.",
    },
    {
      keywords: ["projects", "portfolio", "work samples"],
      answer:
        "Some of my key projects include: 1️⃣ BRSR Web App using Flask and MySQL, 2️⃣ Vehicle Number Plate Reader using Python and OpenCV, 3️⃣ ATM Simulation in Java, and 4️⃣ Geofence-IoT-Blind-Stick — a safety device for visually impaired individuals.",
    },
    {
      keywords: ["goals", "dream", "career", "future", "vision"],
      answer:
        "My long-term goal is to become the CEO of a multinational company, building innovative AI-driven solutions that make real-world impact.",
    },
    {
      keywords: ["superpower"],
      answer:
        "My #1 superpower is adaptability — I can quickly learn and apply new technologies to thrive in fast-paced environments.",
    },
    {
      keywords: ["grow", "growth areas", "improve"],
      answer:
        "I’d like to grow further in AI engineering, scalable cloud systems, and leadership skills.",
    },
    {
      keywords: ["misconception", "coworkers", "people think"],
      answer:
        "A common misconception my coworkers have about me is that I’m quiet — but once I get comfortable, I’m full of creative ideas!",
    },
    {
      keywords: ["boundaries", "limits", "challenges"],
      answer:
        "I push my boundaries by taking on challenges that scare me a little. I believe growth happens outside your comfort zone.",
    },
    {
      keywords: ["hobbies", "sports", "free time"],
      answer:
        "I love playing cricket and badminton — they keep me active, focused, and balanced.",
    },
    {
      keywords: ["contact", "linkedin", "email", "reach you"],
      answer:
        "You can reach me at marvinmaster17@gmail.com or connect with me on LinkedIn: linkedin.com/in/marvin-showkat/",
    },
  ];

  // 🧩 Find best match
  let reply = "Sorry, I’m not sure about this. You’re most welcome to ask me about Marvin.";

  for (const item of knowledge) {
    if (item.keywords.some((word) => lowerMsg.includes(word))) {
      reply = item.answer;
      break;
    }
  }

  res.status(200).json({ reply });
}