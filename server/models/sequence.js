const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxCoursesId: { type: String, required: true },
  maxNotesId: { type: String, required: true },
  maxTasktId: { type: String, required: true },
});

module.exports = mongoose.model("Sequence", sequenceSchema);