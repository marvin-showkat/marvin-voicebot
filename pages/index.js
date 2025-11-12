import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🎤 Marvin’s Voice Bot</h1>
      <p>Ask me anything you'd like!</p>

      <form onSubmit={handleSubmit}>
        <input
          style={{ padding: "10px", width: "300px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button style={{ padding: "10px 20px", marginLeft: "10px" }} type="submit">
          Ask
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "30px" }}>
          <h3>🤖 Bot says:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}