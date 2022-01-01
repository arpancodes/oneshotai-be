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

const CountrySchema = new Schema({
	name: String,
	phonecode: String,
	isoCode: String,
	flag: String,
	currency: String,
})

const StateSchema = new Schema({
	name: String,
	isoCode: String,
	countryCode: String,
})

const CitySchema = new Schema({
	name: String,
	countryCode: String,
	stateCode: String,
})

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
		type: CitySchema,
		required: true
	},
	state: {
		type: StateSchema,
		required: true
	},
	country: {
		type: CountrySchema,
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
