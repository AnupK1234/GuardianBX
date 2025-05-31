const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Report = require("./models/Report");
const chatbotRoutes = require("./routes/chatbotRoutes");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("/api/chatbot", chatbotRoutes);

app.post("/api/reports", async (req, res) => {
  try {
    const report = new Report(req.body);

    await report.save();

    res.status(201).send(report);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find({});
    res.send(reports);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/send-sos", async (req, res) => {
  const { email, lat, lng } = req.body;

  if (!email || !lat || !lng) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Emergency SOS" <${process.env.EMAIL_USER}>`,
    to: email, // emergency contact email
    subject: "🚨 Emergency Alert - Immediate Attention Needed",
    html: `
      <h2>🚨 Emergency SOS Alert</h2>
      <p>This is an automated alert from your contact.</p>
      <p><strong>Location:</strong> <a href="${mapsLink}" target="_blank">Click to view on Google Maps</a></p>
      <p>Please check on them immediately.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.use("/test", (req, res) => {
  res.status(404).send("This is a test endpoint");
});

module.exports = app;
