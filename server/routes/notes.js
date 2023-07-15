var express = require("express");
var router = express.Router();
const Notes = require("../models/notes");
const sequenceGenerator = require("./sequenceGenerator");
module.exports = router;

router.get("/", (req, res, next) => {
    Notes.find()
    .then((notes) => {
      res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occured",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const note = new Notes({
    note: req.body.note,
    course: req.body.course,
    week: req.body.week,
  });

  note
    .save()
    .then((createdNote) => {
      res.status(201).json({
        message: "Note added successfully",
        course: createdNote,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});


router.put("/:_id", (req, res, next) => {
    Notes.findOne({ _id: req.params._id })
    .then((notes) => {
      if (!notes) {
        return res.status(404).json({
          message: "Note not found",
        });
      }
      notes.course = req.body.course;
      notes.week = req.body.week;
      notes.note = req.body.note;
      
      notes
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Note updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.delete("/:_id", (req, res, next) => {
    Notes.findOne({ _id: req.params._id })
    .then((notes) => {
        notes.deleteOne({ _id: req.params._id })
        .then((result) => {
          res.status(204).json({
            message: "Note deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Note not found.",
        error: { course: "Note not found" },
      });
    });
});
