const mongoose = require("mongoose");

// Define a Schema and Model for Reports
const reportSchema = new mongoose.Schema({
  incidentType: String,
  location: String,
  description: String,
  photo: String,
  urgency: String,
  anonymous: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
