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
	return array[Math.floor(Math.random() * (array.length))];
}

function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getFullYear();
}

function getRandomElements(array){
	const randomElements = [];
	const randomLength = Math.floor(Math.random() * array.length) + 1;
	for(let i = 0; i < randomLength; i++){
		let random = getRandom(array);
		if (!randomElements.includes(random)){
			randomElements.push(random);
		}
	}
	return randomElements;
}

function createRandomCollege(name) {
	const _id = mongoose.Types.ObjectId();
	const randomYear = randomDate(new Date(1970, 0, 1), new Date());
	const country_in = Country.getCountryByCode("IN");
	let randomState = getRandom(State.getStatesOfCountry(country_in.isoCode));
	let randomCity = getRandom(City.getCitiesOfState(country_in.isoCode, randomState.isoCode));
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
		country: country_in,
		courses: randomCourses,
		students: [],
		numberOfStudents: 0,
	}
}

function createRandomStudent(name) {
	const _id = mongoose.Types.ObjectId();
	const randomYear = randomDate(new Date(2010, 0, 1), new Date());
	const randomSkills = getRandomElements(skills);
	return {
		_id,
		name,
		year: randomYear,
		skills: randomSkills,
	}
}


async function seed(){
	for (let i = 0; i < 100; i++){
		const randomNameCollege = `College${i+1}`
		const randomNameStudent = `Student${i+1}`
		const randomCollege = createRandomCollege(randomNameCollege);
		const randomStudent = createRandomStudent(randomNameStudent)
		randomStudent.college = randomCollege._id;
		randomCollege.students.push(randomStudent._id);
		randomCollege.numberOfStudents++;
		colleges.push(randomCollege);
		students.push(randomStudent);
	}
	await College.insertMany(colleges);
	await Student.insertMany(students);

}
module.exports = {
	createRandomStudent,
	default: seed,
}
