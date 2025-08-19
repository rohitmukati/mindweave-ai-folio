import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------------
// 🔹 CORS Setup (env-based like chatbot.py)
// -------------------------
const FRONTEND_URL = process.env.FRONTEND_URL?.replace(/\/$/, ""); // remove trailing slash

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

if (FRONTEND_URL) {
  allowedOrigins.push(FRONTEND_URL);
}

let corsOptions;
if (process.env.ALLOW_ALL_ORIGINS === "1") {
  corsOptions = {
    origin: "*",
    credentials: false, // IMPORTANT when origin = "*"
  };
} else {
  corsOptions = {
    origin: allowedOrigins,
    credentials: true,
  };
}

app.use(cors(corsOptions));
app.use(express.json());

// -------------------------
// 🔹 Email Setup
// -------------------------
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// -------------------------
// 🔹 API Endpoint
// -------------------------
app.post("/api/save-message", async (req, res) => {
  const message = req.body;
  const filePath = path.join(__dirname, "messages.txt");

  // Admin mail
  const adminMailOptions = {
    from: GMAIL_USER,
    to: "rohanmukati2002@gmail.com",
    subject: "New Client Entry",
    html: `
      <h3>New Client Entry</h3>
      <ul>
        <li><b>Name:</b> ${message.firstName} ${message.lastName}</li>
        <li><b>Email:</b> ${message.email}</li>
        <li><b>Company:</b> ${message.company}</li>
        <li><b>Project Type:</b> ${message.projectType}</li>
        <li><b>Description:</b> ${message.description}</li>
        <li><b>Timeline:</b> ${message.timeline}</li>
      </ul>
    `,
  };

  // Client confirmation mail
  const clientMailOptions = {
    from: GMAIL_USER,
    to: message.email,
    subject: "Thank you for reaching out to Rohit Mukati!",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Hello ${message.firstName || "there"},</h2>
        <p>Thank you for getting in touch with me via my portfolio website.</p>
        <p>I have received your message and will review it carefully. I aim to respond to all inquiries as soon as possible, typically within 24–48 hours.</p>
        <p>If your matter is urgent, please feel free to call me directly at <strong>+91 6261903064</strong>.</p>
        <p>Looking forward to connecting with you!</p>
        <br/>
        <p>Best regards,<br/><strong>Rohit Mukati</strong><br/>AI/ML Engineer & Developer</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    if (message.email && message.email.includes("@")) {
      await transporter.sendMail(clientMailOptions);
    }
    res.status(200).send("Message saved and emails sent");
  } catch (error) {
    fs.appendFile(filePath, JSON.stringify(message) + "\n", (err) => {
      if (err) return res.status(500).send("Error saving message and sending email");
      res.status(500).send("Email failed, message saved to file");
    });
    return;
  }
});

// -------------------------
// 🔹 Cloud-ready PORT + host
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running on port ${PORT}`);
});
