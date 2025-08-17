import React, { useState, useRef, useEffect } from "react";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{from: "user"|"bot", text: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, {from: "user", text: input}]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: input}),
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, {from: "bot", text: data.answer || data.error || "Sorry, I couldn't answer that."}]);
    } catch (e) {
      setMessages(msgs => [...msgs, {from: "bot", text: "Error connecting to chatbot backend."}]);
    }
    setLoading(false);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  return (
    <>
      {/* Floating Button with Gold Gradient and Robot SVG */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 1000,
          background: "#2c3e50", color: "#fff", borderRadius: "50%",
          width: 56, height: 56, fontSize: 28, border: "none", boxShadow: "0 2px 8px #0002"
        }}
        aria-label="Open chatbot"
      >
        🤖
      </button>
      {/* Popup Chat */}
      {open && (
        <div style={{
          position: "fixed", bottom: 90, right: 24, width: 370, maxHeight: 540,
          background: "linear-gradient(135deg, #232946 0%, #3e206d 100%)",
          borderRadius: 32,
          boxShadow: "0 8px 32px #0007", zIndex: 1001,
          display: "flex", flexDirection: "column",
          fontFamily: "'Poppins', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
          border: "1.5px solid #b993d6"
        }}>
          {/* Header */}
          <div style={{
            padding: 18, borderBottom: "1px solid #b993d6", fontWeight: 700,
            background: "linear-gradient(90deg, #b993d6 0%, #8ca6db 100%)",
            color: "#232946", fontSize: 18, letterSpacing: 1,
            borderTopLeftRadius: 32, borderTopRightRadius: 32
          }}>
            Chat with Assistant 
            <button onClick={() => setOpen(false)} style={{
              float: "right", background: "none", border: "none", color: "#232946", fontSize: 22, fontWeight: 700
            }}>×</button>
          </div>
          <div style={{
            flex: 1, overflowY: "auto", padding: 18,
            background: "linear-gradient(135deg, #232946 0%, #3e206d 100%)"
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                textAlign: msg.from === "user" ? "right" : "left",
                margin: "10px 0"
              }}>
                {/* Message bubble */}
                <span style={{
                  display: "inline-block",
                  background: msg.from === "user"
                    ? "linear-gradient(90deg, #b993d6 0%, #8ca6db 100%)"
                    : "linear-gradient(90deg, #fffbe6 0%, #e0c3fc 100%)",
                  color: msg.from === "user" ? "#232946" : "#3e206d",
                  borderRadius: 24, // was 12, now more rounded
                  padding: "10px 16px",
                  maxWidth: "80%",
                  fontFamily: "'Poppins', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                  fontSize: 15,
                  boxShadow: msg.from === "user"
                    ? "0 2px 8px #b993d655"
                    : "0 2px 8px #e0c3fc55"
                }}>{msg.text}</span>
              </div>
            ))}
            {loading && <div style={{color: "#b993d6", fontWeight: 500}}>Thinking...</div>}
            <div ref={endRef} />
          </div>
          {/* Footer/input area */}
          <div style={{
            padding: 14, borderTop: "1px solid #b993d6", display: "flex",
            background: "linear-gradient(90deg, #232946 0%, #3e206d 100%)",
            borderBottomLeftRadius: 32, borderBottomRightRadius: 32
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                border: "1.5px solid #b993d6",
                borderRadius: 16, // was 8
                padding: 10,
                marginRight: 10,
                background: "#fffbe6",
                color: "#232946",
                fontFamily: "'Poppins', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                fontSize: 15,
                fontWeight: 500
              }}
              placeholder="Type your question..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading} style={{
              background: "linear-gradient(90deg, #b993d6 0%, #8ca6db 100%)",
              color: "#232946", border: "none", borderRadius: 16, // was 8
              padding: "10px 22px", fontWeight: 700, fontSize: 15, letterSpacing: 1,
              boxShadow: "0 2px 8px #b993d655"
            }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;