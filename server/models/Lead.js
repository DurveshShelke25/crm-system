const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    status: String,
});

module.exports = mongoose.model("Lead", LeadSchema);