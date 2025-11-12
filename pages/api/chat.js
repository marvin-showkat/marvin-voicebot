// pages/api/chat.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message } = req.body;
  const lowerMsg = message.toLowerCase();

  // 💡 Marvin’s Personal Knowledge Base
  const knowledge = [
    {
      keywords: ["who are you", "your name", "introduce", "yourself", "marvin"],
      answer:
        "Hey there! I’m Marvin Showkat — a Computer Science Graduate from BITS Pilani, Dubai. I’m passionate about Artificial Intelligence, web development, and creating technology that makes people’s lives better.",
    },
    {
      keywords: ["life story", "your story", "background", "about your life"],
      answer:
        "I was born and raised in Kashmir, India. My journey has been about exploring technology, from coding my first web app to developing AI-powered assistants. I believe curiosity and persistence are what drive me.",
    },
    {
      keywords: ["education", "college", "study", "bits", "degree"],
      answer:
        "I did my B.Tech in Computer Science from BITS Pilani, Dubai, maintaining a GPA of 8.5. My focus areas include AI, full-stack development, and system design.",
    },
    {
      keywords: ["experience", "work", "job", "omang", "internship"],
      answer:
        "I recently completed my internship as a Full Stack Developer at Omang Technologies. I worked on 'YourMakan' — an apartment management web platform. I developed front-end panels using Laravel, Tailwind, and JavaScript while collaborating with the backend team to debug and improve performance.",
    },
    {
      keywords: ["enterprise pivot", "previous job", "past experience"],
      answer:
        "Earlier, I worked as a Front-End Developer at Enterprise Pivot, where I helped build a web-based BRSR application using Flask, HTML, CSS, and MySQL. It was an amazing experience that improved my teamwork and problem-solving skills.",
    },
    {
      keywords: ["superpower", "strength", "best quality"],
      answer:
        "My #1 superpower is adaptability — I can quickly learn new technologies and adjust to different working environments. It helps me stay ahead and deliver results efficiently.",
    },
    {
      keywords: ["grow", "improve", "development areas"],
      answer:
        "The top 3 areas I want to grow in are: advanced AI engineering, scalable cloud architecture, and leadership — so I can lead impactful tech projects in the future.",
    },
    {
      keywords: ["misconception", "coworkers", "people think"],
      answer:
        "A common misconception my coworkers have about me is that I’m quiet — but once I’m comfortable, I’m full of creative ideas and love brainstorming with my team.",
    },
    {
      keywords: ["boundaries", "limits", "challenges", "push yourself"],
      answer:
        "I push my boundaries by taking on projects that challenge me technically and personally. I believe the best learning happens outside your comfort zone.",
    },
    {
      keywords: ["projects", "portfolio", "work samples", "build"],
      answer:
        "Some of my key projects include: 1️⃣ AI-Powered Customer Support Agent using GPT-4 mini, Twilio, and Make.com, 2️⃣ Geofence IoT Blind Stick using NodeMCU and MongoDB, and 3️⃣ Automated License Plate Recognition using Python and OpenCV. Each project reflects my love for blending AI with real-world use cases.",
    },
    {
      keywords: ["skills", "languages", "tech stack", "technologies", "tools"],
      answer:
        "I’m skilled in Python, JavaScript, C++, Java, PHP, and SQL. I work with frameworks like React, Node.js, Laravel, Flask, and Tailwind CSS. I also have experience with AI frameworks like LangChain and RAG, and tools such as Voiceflow, Make.com, and Twilio.",
    },
    {
      keywords: ["goals", "dream", "career", "future", "vision"],
      answer:
        "My goal is to become an AI Engineer and eventually the CEO of a tech-driven company. I want to lead projects that use AI to solve real problems and create meaningful impact.",
    },
    {
      keywords: ["hobbies", "sports", "interests", "free time"],
      answer:
        "I love playing cricket and badminton — they keep me active and help me clear my mind. I also enjoy exploring new AI tools and tech trends in my free time.",
    },
    {
      keywords: ["contact", "linkedin", "email", "reach you"],
      answer:
        "You can contact me at marvinmaster17@gmail.com or connect with me on LinkedIn at linkedin.com/in/marvin-showkat.",
    },
    {
      keywords: ["thank you", "thanks", "appreciate"],
      answer:
        "You’re most welcome! It was great chatting with you. I hope you got to know me better.",
    },
  ];

  // 🔍 Match user question with Marvin’s knowledge base
  let reply = "Hmm, I’m not sure about that — but feel free to ask me about Marvin’s background, skills, or goals!";

  for (const item of knowledge) {
    if (item.keywords.some((word) => lowerMsg.includes(word))) {
      reply = item.answer;
      break;
    }
  }

  res.status(200).json({ reply });
}