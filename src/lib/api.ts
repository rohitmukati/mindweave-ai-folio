// src/lib/api.ts
const rawChatbot = import.meta.env.VITE_CHATBOT_API_URL as string | undefined;
const rawEmail = import.meta.env.VITE_EMAIL_API_URL as string | undefined;

function normalize(url?: string, fallback = "") {
  if (!url || url === "undefined") return fallback;
  return url.replace(/\/+$/, ""); // remove trailing slashes
}

export const CHATBOT_API_URL = normalize(rawChatbot, "http://localhost:8000");
export const EMAIL_API_URL = normalize(rawEmail, "http://localhost:5000");

if (typeof window !== "undefined") {
  console.info("[env] CHATBOT_API_URL =", CHATBOT_API_URL);
  console.info("[env] EMAIL_API_URL =", EMAIL_API_URL);
}
