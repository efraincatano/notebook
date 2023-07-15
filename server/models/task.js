const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  //id: { type: String},
  course: { type: String},
  task: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);