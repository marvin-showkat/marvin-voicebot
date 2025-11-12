import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // 🎙️ Voice input
  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser does not support voice input.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = async function (event) {
      const speech = event.results[0][0].transcript;
      setMessage(speech);
      await sendMessage(speech);
    };
  };

  // ✉️ Send message
  const sendMessage = async (msg = message) => {
    if (!msg.trim()) return;
    const newChat = [...chat, { sender: "You", text: msg }];
    setChat(newChat);
    setMessage("");
    setIsTyping(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();

    setTimeout(() => {
      setChat([...newChat, { sender: "Marvin Bot 🤖", text: data.reply }]);
      setIsTyping(false);
      speakResponse(data.reply);
    }, 700);
  };

  // 🔊 Bot speaks back
  const speakResponse = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1.1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💬 Marvin’s Voice Bot</h1>
      <p style={styles.subtitle}>
        Ask me anything about Marvin — I’ll be happy to share!
      </p>

      <div style={styles.chatBox}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={msg.sender === "You" ? styles.userMsg : styles.botMsg}
          >
            <b>{msg.sender}: </b>
            <span>{msg.text}</span>
          </div>
        ))}
        {isTyping && <p style={styles.typing}>🤖 Marvin Bot is thinking...</p>}
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          placeholder="Type or ask with your voice..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button style={styles.sendButton} onClick={() => sendMessage()}>
          🚀
        </button>
        <button style={styles.micButton} onClick={handleVoice}>
          🎤
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    background:
      "linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    color: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "10px",
    textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
  },
  subtitle: {
    fontSize: "1.1rem",
    marginBottom: "20px",
    color: "#fef3c7",
  },
  chatBox: {
    width: "100%",
    maxWidth: "600px",
    minHeight: "200px",
    maxHeight: "420px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "20px",
    padding: "20px",
    overflowY: "auto",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    backdropFilter: "blur(12px)",
    marginBottom: "20px",
  },
  userMsg: {
    textAlign: "right",
    background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: "20px",
    color: "white",
    margin: "10px 0",
    maxWidth: "80%",
    wordBreak: "break-word",
  },
  botMsg: {
    textAlign: "left",
    background: "linear-gradient(90deg, #10b981, #14b8a6)",
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: "20px",
    color: "white",
    margin: "10px 0",
    maxWidth: "80%",
    wordBreak: "break-word",
  },
  typing: {
    fontStyle: "italic",
    color: "#fef9c3",
    marginTop: "10px",
  },
  inputBox: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "600px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "25px 0 0 25px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    backgroundColor: "#fff",
    color: "#333",
  },
  sendButton: {
    padding: "12px 18px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "0",
    transition: "0.3s",
  },
  micButton: {
    padding: "12px 18px",
    border: "none",
    background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "0 25px 25px 0",
    transition: "0.3s",
  },
};