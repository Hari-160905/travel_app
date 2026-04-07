import { useState, useRef, useEffect } from "react";
import axios from "axios";

function TravelAssistant() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { type: "user", text: message };

    setChat(prev => [...prev, userMessage]);
    setMessage("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/travel-assistant",
        { message }
      );

      const aiMessage = {
        type: "ai",
        text: res.data.reply
      };

      setChat(prev => [...prev, aiMessage]);

    } catch (err) {
      setChat(prev => [
        ...prev,
        { type: "ai", text: "Error getting response ❌" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chat-container">
      <h2>Travel Assistant 🌍</h2>

      {/* CHAT BOX */}
      <div className="chat-box">
        {chat.length === 0 && (
          <p className="placeholder">Ask something to start...</p>
        )}

        {chat.map((msg, index) => (
          <div
            key={index}
            className={
              msg.type === "user" ? "chat-bubble user" : "chat-bubble ai"
            }
          >
            {/* ✅ FIXED DISPLAY (IMPORTANT) */}
            <div style={{ whiteSpace: "pre-wrap" }}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && <p className="thinking">AI is thinking...</p>}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="input-box">
        <input
          value={message}
          placeholder="Ask like: Plan 2-day trip in Ooty"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}  // ✅ ENTER KEY SUPPORT
        />

        <button onClick={sendMessage}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default TravelAssistant;
