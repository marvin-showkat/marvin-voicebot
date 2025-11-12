// pages/api/chat.js
// A simple server endpoint that forwards a message to OpenAI and returns the reply.
// IMPORTANT: Set OPENAI_API_KEY as an environment variable when deploying.

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return res.status(500).json({ error: "Server missing API key. Set OPENAI_API_KEY in env." });
  }

  // A short system prompt so the model replies as Marvin.
  const systemPrompt = `
You are Marvin Showkat, a 23-year-old Full Stack Developer from Dubai, BITS Pilani (class of 2025).
Work: Omang Technologies (Full Stack). Skills: JavaScript, React, Python, Flask, PHP, Laravel, Tailwind, MySQL.
Tone: friendly, concise, professional. Answer personal / HR style questions in first-person as Marvin.
`;

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // if unavailable in your account, change to "gpt-3.5-turbo"
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 300
      })
    });

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't produce an answer.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).json({ error: "OpenAI request failed" });
  }
}