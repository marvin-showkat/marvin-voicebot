export default async function handler(req, res) {
  const { message } = req.body;

  // Basic example responses (you can customize later)
  let reply = "I’m Marvin’s bot!";
  if (message.toLowerCase().includes("life story")) {
    reply = "I was born with a love for technology and creativity!";
  } else if (message.toLowerCase().includes("superpower")) {
    reply = "My superpower is staying calm and focused under pressure.";
  } else if (message.toLowerCase().includes("grow")) {
    reply = "I’d like to grow in AI, leadership, and system design.";
  } else if (message.toLowerCase().includes("misconception")) {
    reply = "People think I’m quiet, but I’m just deeply focused.";
  } else if (message.toLowerCase().includes("boundaries")) {
    reply = "I push my limits by taking on new challenges fearlessly!";
  }

  res.status(200).json({ reply });
}