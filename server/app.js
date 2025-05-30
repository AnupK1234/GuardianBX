const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Report = require("./models/Report");
const chatbotRoutes = require("./routes/chatbotRoutes");
require("dotenv").config();


const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.DB, {
  useNewUrlParser: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));


app.use("/api/chatbot", chatbotRoutes);

app.post('/api/reports', async (req, res) => {
  try {
    const report = new Report(req.body);
    
   await report.save();

    res.status(201).send(report);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find({});
    res.send(reports);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.use("/test", (req, res) => {
  res.status(404).send("This is a test endpoint");
});

module.exports = app;
