const College = require("../model/college.model").default;
const Student = require("../model/student.model").default;

const listColleges = async (req, res) => {
  const { page, states, courses } = req.query;
  const filter = {};
  if (states) {
    filter["state.name"] = states;
  }
  if (courses) {
    filter.courses = { $in: courses };
  }

  const perPage = 10;
  const colleges = await College.find(filter)
    .skip(perPage * (page - 1))
    .limit(perPage);
  const total = await College.countDocuments(filter);
  res.json({ data: colleges, pages: Math.ceil(total / perPage) });
};

const getCollegeById = async (req, res) => {
  const college = await College.findById(req.params.id).select("-students");
  if (!college) {
    return res.status(404).json({ message: "College not found" });
  }
  res.json({ data: college });
};

const getStudentsOfCollege = async (req, res) => {
  const { page } = req.query;
  const perPage = 10;
  const students = await Student.find({ college: req.params.id })
    .skip(perPage * (page - 1))
    .limit(perPage);
  const total = await Student.countDocuments({ college: req.params.id });
  res.json({ data: students, pages: Math.ceil(total / perPage) });
};

const getStudentOfCollegeById = async (req, res) => {
  const student = await Student.findById(req.params.studentId).populate(
    "college"
  );
  res.json({ data: student });
};

const getSimilarColleges = async (req, res) => {
  const college = await College.findById(req.params.id);
  const similarColleges = await College.find({
    $and: [
      {
        _id: {
          $ne: college._id,
        },
      },
      {
        courses: {
          $in: college.courses,
        },
      },
      {
        numberOfStudents: {
          $gte: college.numberOfStudents - 100,
        },
      },
      {
        numberOfStudents: {
          $lte: college.numberOfStudents + 100,
        },
      },
      {
        "state.isoCode": {
          $eq: college.state.isoCode,
        },
      },
    ],
  })
    .select("name numberOfStudents state courses city country")
    .limit(10);
  if (similarColleges.length === 0) {
    return res.status(404).json({ message: "No similar colleges found" });
  }
  res.json({ data: similarColleges });
};

const getStatsByStates = async (_, res) => {
  const colleges = await College.aggregate([
    {
      $group: {
        _id: "$state.name",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  const totalColleges = await College.find({}).countDocuments();
  res.json({ data: { colleges, total: totalColleges } });
};

const getStatsByCourses = async (_, res) => {
  const colleges = await College.aggregate([
    {
      $unwind: "$courses",
    },
    {
      $group: {
        _id: "$courses",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  const totalColleges = await College.find({}).countDocuments();
  res.json({ data: { colleges, total: totalColleges } });
};

module.exports = {
  listColleges,
  getCollegeById,
  getStudentsOfCollege,
  getStudentOfCollegeById,
  getSimilarColleges,
  getStatsByStates,
  getStatsByCourses,
};
