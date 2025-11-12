import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);

  // 🎧 Listen to user's voice
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      setListening(false);
    };
  };

  // 🔊 Make the bot speak the response
  const speakResponse = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  // 💬 Send question to backend
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
    speakResponse(data.reply); // Make it talk
  }

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
      <h1>🎤 Marvin’s Voice Bot</h1>
      <p>Ask me anything you'd like — by typing or speaking!</p>

      <form onSubmit={handleSubmit}>
        <input
          style={{ padding: "10px", width: "300px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button
          style={{ padding: "10px 20px", marginLeft: "10px" }}
          type="submit"
        >
          Ask
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={startListening}
          style={{
            backgroundColor: listening ? "red" : "#0070f3",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {listening ? "Listening..." : "🎙️ Speak"}
        </button>
      </div>

      {response && (
        <div style={{ marginTop: "30px" }}>
          <h3>🤖 Bot says:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}