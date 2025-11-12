// pages/index.js
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Setup browser speech recognition (works best in Chrome)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      recognitionRef.current = null;
      return;
    }
    const r = new SpeechRecognition();
    r.lang = "en-IN";
    r.interimResults = false;
    r.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join("");
      setTranscript(text);
      sendMessage(text);
    };
    r.onend = () => setListening(false);
    recognitionRef.current = r;
  }, []);

  function startListening() {
    if (!recognitionRef.current) return alert("Speech recognition not supported. Use Chrome.");
    setTranscript("");
    setListening(true);
    recognitionRef.current.start();
  }

  function stopListening() {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setListening(false);
  }

  async function sendMessage(message) {
    setReply("Thinking...");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      setReply(data.reply || "No reply");
      speakText(data.reply || "No reply");
    } catch (e) {
      setReply("Error contacting server.");
    }
  }

  function speakText(text) {
    if (!window.speechSynthesis) return;
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(ut);
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 6 }}>Marvin — Voice Bot (Demo)</h1>
      <p style={{ marginTop: 0 }}>Press Record, ask HR-style questions, or type a question and press Enter.</p>

      <div style={{ marginTop: 16 }}>
        <button onClick={startListening} disabled={listening} style={{ padding: 10, marginRight: 8 }}>
          🎤 Record
        </button>
        <button onClick={stopListening} disabled={!listening} style={{ padding: 10 }}>
          ⏹ Stop
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={{ fontWeight: 600 }}>Transcript:</label>
        <div style={{ minHeight: 48, border: "1px solid #ddd", padding: 8, marginTop: 6 }}>
          {transcript || <i>Speak or type below</i>}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <input
          placeholder="Or type your question and press Enter..."
          style={{ width: "100%", padding: 10, fontSize: 16 }}
          onKeyDown={(e) => { if (e.key === "Enter") { sendMessage(e.target.value); e.target.value = ""; } }}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={{ fontWeight: 600 }}>Bot reply:</label>
        <div style={{ minHeight: 80, border: "1px solid #ddd", padding: 12, marginTop: 6 }}>
          {reply}
        </div>
      </div>

      <div style={{ marginTop: 18, color: "#555", fontSize: 14 }}>
        Tip: Works best in Chrome on desktop. No API key needed by testers — it's hidden on the server.
      </div>
    </div>
  );
}