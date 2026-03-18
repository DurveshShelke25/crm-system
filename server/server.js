const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/crm")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Model
const Lead = require("./models/Lead");

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// GET all leads
app.get("/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// ADD lead
app.post("/leads", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.send("Lead Added");
});

// DELETE lead
app.delete("/leads/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.send("Lead Deleted");
});

// UPDATE lead
app.put("/leads/:id", async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, req.body);
  res.send("Lead Updated");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});