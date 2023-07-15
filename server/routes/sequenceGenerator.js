const Sequence = require("../models/sequence");

var maxCoursesId;
var maxNotesId;
var maxTasktId;
var sequenceId = null;

async function sequenceGenerator(collectionType) {
	const sequenceList = await Sequence.find();
	let sequence = sequenceList[0];

	let nextId;

	switch (collectionType) {
		case "courses":
			sequence.maxCoursesId++;
			nextId = sequence.maxCoursesId;
			break;
		case "notes":
			sequence.maxNotesId++;
			nextId = sequence.maxNotesId;
			break;
		case "task":
			sequence.maxTasktId++;
			nextId = sequence.maxTasktId;
			break;
		default:
			return -1;
		}

	Sequence.updateOne({ _id: sequence._id }, sequence)
		.then((response, error) => {
			if (error) {
				console.log("Error: " + error);
				return null
			}
		});

	return nextId;
}

module.exports = sequenceGenerator;