var express = require("express");
var router = express.Router();
const Courses = require("../models/courses");
const sequenceGenerator = require("./sequenceGenerator");
module.exports = router;

router.get("/", (req, res, next) => {
    Courses.find()
    .then((courses) => {
      res.status(200).json({
        message: "Courses fetched successfully",
        courses: courses,
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
  //const maxCourseId = sequenceGenerator("courses");

  const course = new Courses({
    //id: default,
    name: req.body.name,
    description: req.body.description,
  });

  course
    .save()
    .then((createdCourse) => {
      res.status(201).json({
        message: "Course added successfully",
        course: createdCourse,
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
  Courses.findOne({ _id: req.params._id })
    .then((courses) => {
      if (!courses) {
        return res.status(404).json({
          message: "Course not found",
        });
      }

      courses.name = req.body.name;
      courses.description = req.body.description;

      courses
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Course updated successfully",
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
    Courses.findOne({ _id: req.params._id })
    .then((courses) => {
        Courses.deleteOne({ _id: req.params._id })
        .then((result) => {
          res.status(204).json({
            message: "Course deleted successfully",
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
        message: "Course not found.",
        error: { course: "Course not found" },
      });
    });
});
