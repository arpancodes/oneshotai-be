const mongoose = require('mongoose');
const {Schema, model} = mongoose

const skills = [
	"Java",
	"C++",
	"C",
	"Python",
	"JavaScript",
	"HTML",
	"CSS",
	"PHP",
	"SQL",
	"React",
	"Angular",
	"Node",
	"Express",
	"MongoDB",
	"Mongoose",
	"Bootstrap",
	"Materialize",
	"jQuery",
	"AJAX",
	"JSON",
	"XML",
	"REST",
	"SOAP",
]


const StudentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	college: {
		type: Schema.Types.ObjectId,
		ref: 'College'
	},
	skills: [{
		type: String,
		required: true,
		enum: skills
	}],
});


module.exports = {
	default:model('Student', StudentSchema),
	skills
};
