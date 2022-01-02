if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const College = require("../model/college.model").default;
const Student = require("../model/student.model").default;
const { MONGODB_URI } = require("./constants");
const { createRandomStudent } = require("./seed");
const { customAlphabet } = require("nanoid");
const alphabet = "0123456789";
const nanoid = customAlphabet(alphabet, 15);

async function randomSeed() {
  for (let i = 0; i < 500; i++) {
    await createAndAddStudents();
  }
  console.log("Done");
}

async function createAndAddStudents() {
  const college = await College.getRandom();
  const student = createRandomStudent("Student" + nanoid());
  student.college = college._id;
  college.students.push(student._id);
  college.numberOfStudents++;
  await Student.create(student);
  await college.save();
}

module.exports = {
  default: randomSeed,
};
