import React, { useState, useRef, useEffect } from "react";
import { CHATBOT_API_URL } from "@/lib/api"; // ✅ central api.ts se import

type Msg = { from: "user" | "bot"; text: string };

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const pushMessage = (msg: Msg) => setMessages((prev) => [...prev, msg]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    pushMessage({ from: "user", text });
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const res = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        let err = `Server returned ${res.status}`;
        try {
          const j = await res.json();
          err = j.error || j.message || JSON.stringify(j);
        } catch {
          try {
            const t = await res.text();
            if (t) err = t;
          } catch {}
        }
        pushMessage({ from: "bot", text: `Error: ${err}` });
        setLoading(false);
        return;
      }

      let data: any;
      try {
        data = await res.json();
      } catch {
        data = { answer: await res.text() };
      }

      const answer =
        data?.answer ?? data?.result ?? data?.message ?? JSON.stringify(data);
      pushMessage({ from: "bot", text: String(answer) });
    } catch (err: any) {
      if (err?.name === "AbortError") {
        pushMessage({ from: "bot", text: "Request timed out. Try again." });
      } else {
        pushMessage({
          from: "bot",
          text: "Error connecting to chatbot backend.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: "#2c3e50",
          color: "#fff",
          borderRadius: "50%",
          width: 56,
          height: 56,
          fontSize: 28,
          border: "none",
          boxShadow: "0 2px 8px #0002",
        }}
        aria-label="Open chatbot"
        title="Open chatbot"
      >
        🤖
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 370,
            maxHeight: 540,
            background: "linear-gradient(135deg, #232946 0%, #3e206d 100%)",
            borderRadius: 32,
            boxShadow: "0 8px 32px #0007",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Poppins', sans-serif",
            border: "1.5px solid #b993d6",
          }}
        >
          <div
            style={{
              padding: 18,
              borderBottom: "1px solid #b993d6",
              fontWeight: 700,
              background: "linear-gradient(90deg, #b993d6 0%, #8ca6db 100%)",
              color: "#232946",
              fontSize: 18,
              letterSpacing: 1,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            }}
          >
            Chat with Assistant
            <button
              onClick={() => setOpen(false)}
              style={{
                float: "right",
                background: "none",
                border: "none",
                color: "#232946",
                fontSize: 22,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 18,
              background: "linear-gradient(135deg, #232946 0%, #3e206d 100%)",
            }}
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  margin: "10px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background:
                      msg.from === "user"
                        ? "linear-gradient(90deg, #b993d6 0%, #8ca6db 100%)"
                        : "linear-gradient(90deg, #fffbe6 0%, #e0c3fc 100%)",
                    color: msg.from === "user" ? "#232946" : "#3e206d",
                    borderRadius: 24,
                    padding: "10px 16px",
                    maxWidth: "80%",
                    fontSize: 15,
                    boxShadow:
                      msg.from === "user"
                        ? "0 2px 8px #b993d655"
                        : "0 2px 8px #e0c3fc55",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ color: "#b993d6", fontWeight: 500 }}>
                Thinking...
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div
            style={{
              padding: 14,
              borderTop: "1px solid #b993d6",
              display: "flex",
              background: "linear-gradient(90deg, #232946 0%, #3e206d 100%)",
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                border: "1.5px solid #b993d6",
                borderRadius: 16,
                padding: 10,
                marginRight: 10,
                background: "#fffbe6",
                color: "#232946",
                fontSize: 15,
                fontWeight: 500,
              }}
              placeholder="Type your question..."
              disabled={loading}
              aria-label="Type your question"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background:
                  "linear-gradient(90deg, #b993d6 0%, #8ca6db 100%)",
                color: "#232946",
                border: "none",
                borderRadius: 16,
                padding: "10px 22px",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: 1,
                boxShadow: "0 2px 8px #b993d655",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
