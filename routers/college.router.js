const express = require("express");
const router = express.Router();
const {
  listColleges,
  getCollegeById,
  getStudentsOfCollege,
  getStudentOfCollegeById,
  getSimilarColleges,
  getStatsByStates,
  getStatsByCourses,
} = require("../controllers/college.controller");

router.get("/", listColleges);
router.get("/:id", getCollegeById);
router.get("/:id/students", getStudentsOfCollege);
router.get("/:id/students/:studentId", getStudentOfCollegeById);
router.get("/:id/similar", getSimilarColleges);
router.get("/stats/states", getStatsByStates);
router.get("/stats/courses", getStatsByCourses);

module.exports = router;
