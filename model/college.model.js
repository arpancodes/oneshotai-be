const mongoose = require('mongoose');
const {Schema, model} = mongoose

const courses = [
	"Computer Science",
	"IT",
	"Electronics",
	"Mechanical",
	"Civil",
	"Electrical",
	"Chemical",
	"Bio-Technology",
	"Mining",
	"Textile",
	"Production",
	"Agriculture",
	"Food Technology",
	"Textile",
]

const CollegeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	students: [{
		type: Schema.Types.ObjectId,
		ref: 'Student'
	}],
	numberOfStudents: {
		type: Number,
		default: 0
	},
	courses: [{
		type: String,
		required: true,
		enum: courses
	}]
});


module.exports ={
	default: model('College', CollegeSchema),
	courses
};
