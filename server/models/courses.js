const mongoose = require("mongoose");

const coursesSchema = mongoose.Schema({
  //id: { type: String, default: true},
  name: { type: String, required: true},
  description: { type: String, required: true },
});

module.exports = mongoose.model("Courses", coursesSchema);