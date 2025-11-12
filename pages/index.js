import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // 🪄 Intro animation
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // 🎙️ Voice input
  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser doesn’t support voice input.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);

    recognition.onresult = async function (event) {
      const speech = event.results[0][0].transcript;
      setIsListening(false);
      setMessage(speech);
      await sendMessage(speech);
    };

    recognition.onerror = function () {
      setIsListening(false);
      alert("Voice recognition error, please try again!");
    };

    recognition.onend = function () {
      setIsListening(false);
    };
  };

  // ✉️ Send message
  const sendMessage = async (msg = message) => {
    if (!msg.trim()) return;
    setIsSending(true);
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
      setIsSending(false);
      speakResponse(data.reply);
    }, 900);
  };

  // 🔊 Bot speaks
  const speakResponse = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1.05;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={styles.container}>
      {showIntro ? (
        <div style={styles.introBox}>
          <h1 style={styles.introTitle}>👋 Hi, I’m Marvin’s AI Assistant</h1>
          <p style={styles.introSubtitle}>
            Ask me anything about Marvin — his skills, projects, or experience!
          </p>
        </div>
      ) : (
        <>
          <h1 style={styles.title}>💬 Marvin’s Voice Bot</h1>
          <p style={styles.subtitle}>Your friendly AI to learn more about Marvin Showkat!</p>

          <div style={styles.chatBox}>
            {chat.map((msg, i) => (
              <div
                key={i}
                style={
                  msg.sender === "You"
                    ? { ...styles.message, ...styles.userMsg }
                    : { ...styles.message, ...styles.botMsg }
                }
              >
                <b>{msg.sender}: </b>
                <span>{msg.text}</span>
              </div>
            ))}
            {isTyping && (
              <p style={styles.typing}>🤖 Marvin Bot is typing...</p>
            )}
          </div>

          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              style={{
                ...styles.sendBtn,
                ...(isSending ? styles.sendBtnActive : {}),
              }}
              onClick={() => sendMessage()}
            >
              {isSending ? "✅ Sent!" : "✉️"}
            </button>
            <button
              style={{
                ...styles.micBtn,
                ...(isListening ? styles.micActive : {}),
              }}
              onClick={handleVoice}
            >
              {isListening ? "🎧 Listening..." : "🎙️"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    background:
      "linear-gradient(135deg, #ff8a05, #ff4ecd, #5c6aff, #22d3ee, #38ef7d)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 10s ease infinite",
    height: "100vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 0.4s ease-in-out",
    padding: "20px",
  },
  introBox: {
    textAlign: "center",
    padding: "30px",
    animation: "fadeIn 1.5s ease",
  },
  introTitle: {
    fontSize: "2rem",
    fontWeight: "700",
  },
  introSubtitle: {
    marginTop: "10px",
    color: "#fef9c3",
    fontSize: "1.1rem",
  },
  title: {
    fontSize: "2.6rem",
    fontWeight: "700",
    marginBottom: "10px",
    textShadow: "0 0 10px rgba(255,255,255,0.4)",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#fef9c3",
    marginBottom: "20px",
  },
  chatBox: {
    width: "100%",
    maxWidth: "650px",
    height: "400px",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "20px",
    padding: "15px",
    overflowY: "auto",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    marginBottom: "20px",
  },
  message: {
    margin: "10px 0",
    padding: "10px 14px",
    borderRadius: "18px",
    maxWidth: "80%",
    display: "inline-block",
    wordBreak: "break-word",
    animation: "fadeIn 0.3s ease",
  },
  userMsg: {
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    alignSelf: "flex-end",
    float: "right",
    textAlign: "right",
  },
  botMsg: {
    background: "linear-gradient(90deg, #10b981, #14b8a6)",
    alignSelf: "flex-start",
    float: "left",
    textAlign: "left",
  },
  typing: {
    fontStyle: "italic",
    color: "#fef9c3",
    marginTop: "8px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "650px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "25px 0 0 25px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    color: "#333",
  },
  sendBtn: {
    padding: "12px 18px",
    border: "none",
    background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  sendBtnActive: {
    background: "linear-gradient(90deg, #22c55e, #4ade80)",
    transform: "scale(1.05)",
  },
  micBtn: {
    padding: "12px 18px",
    border: "none",
    background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
    color: "white",
    fontWeight: "bold",
    borderRadius: "0 25px 25px 0",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  micActive: {
    background: "linear-gradient(90deg, #ef4444, #f87171)",
    boxShadow: "0 0 15px 4px rgba(239,68,68,0.8)",
    transform: "scale(1.05)",
  },
};