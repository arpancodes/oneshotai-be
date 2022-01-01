if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config();
}
const mongoose = require('mongoose');
const {MONGODB_URI} = require('./constants');
const courses = require("../model/college.model").courses;
const skills = require("../model/student.model").skills;
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;
const College = require("../model/college.model").default;
const Student = require("../model/student.model").default;


const colleges = []
const students = []

function getRandom(array){
	return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements(array){
	const randomElements = [];
	const randomLength = Math.floor(Math.random() * array.length) + 1;
	for(let i = 0; i < randomLength; i++){
		randomElements.push(getRandom(array));
	}
	return randomElements;
}

function createRandomCollege(name) {
	const _id = mongoose.Types.ObjectId();
	const randomYear = Math.floor(Math.random() * 4) + 1;
	const randomCountry = getRandom(Country.getAllCountries());
	let randomState = getRandom(State.getStatesOfCountry(randomCountry.isoCode));
	if (!randomState) {
		randomState = getRandom(State.getAllStates());
	}
	let randomCity = getRandom(City.getCitiesOfState(randomCountry.isoCode, randomState.isoCode));
	if(!randomCity){
		randomCity = getRandom(City.getAllCities());
	};
	const randomCourses = getRandomElements(courses);

	return {
		_id,
		name,
		year: randomYear,
		city: randomCity,
		state: randomState,
		country: randomCountry,
		courses: randomCourses,
		students: [],
		numberOfStudents: 0,
	}
}

function createRandomStudent(name) {
	const _id = mongoose.Types.ObjectId();
	const randomYear = Math.floor(Math.random() * 4) + 1;
	const randomSkills = getRandomElements(skills);
	return {
		_id,
		name,
		year: randomYear,
		skills: randomSkills,
	}
}


function seed(){
for (let i = 0; i < 100; i++){
	const randomNameCollege = `College${i+1}`
	const randomNameStudent = `College${i+1}`
	const randomCollege = createRandomCollege(randomNameCollege);
	const randomStudent = createRandomStudent(randomNameStudent)
	randomStudent.college = randomCollege._id;
	randomCollege.students.push(randomStudent._id);
	randomCollege.numberOfStudents++;
	colleges.push(randomCollege);
	students.push(randomStudent);
}
mongoose.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async() => {
		await College.insertMany(colleges);
		await Student.insertMany(students);
	})
	.catch(err => console.log(err));

}
module.exports = {
	createRandomStudent,
	default: seed,
}
