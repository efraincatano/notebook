const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  //id: { type: String},
  course: { type: String},
  week: { type: String},
  note: { type: String },
});

module.exports = mongoose.model("Notes", notesSchema);