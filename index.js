if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const { PORT, MONGODB_URI } = require("./config/constants");
const cors = require("cors");
const mongoose = require("mongoose");
const seed = require("./config/seed").default;
const randomSeed = require("./config/randomSeed").default;
const College = require("./model/college.model").default;
const Student = require("./model/student.model").default;
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/seed", async (req, res) => {
  await seed();
  res.send("Seeded");
});

app.get("/random-seed", async (req, res) => {
  await randomSeed();
  res.send("Randomly seeding... The results will show up in your DB!");
});

app.get("/colleges", async (req, res) => {
  const { page, states, courses } = req.query;
  const filter = {};
  if (states) {
    filter["state.name"] = states;
  }
  if (courses) {
    filter.courses = { $in: courses };
  }

  console.log(filter)
  const perPage = 10;
  const colleges = await College.find(filter)
    .skip(perPage * (page - 1))
    .limit(perPage);
  const total = await College.countDocuments(filter);
  res.json({ data: colleges, pages: Math.ceil(total / perPage) });
});

app.get("/colleges/:id", async (req, res) => {
  const college = await College.findById(req.params.id).select("-students");
  res.json({ data: college });
});

app.get("/colleges/:id/students", async (req, res) => {
  const { page } = req.query;
  const perPage = 10;
  const students = await Student.find({ college: req.params.id })
    .skip(perPage * page - 1)
    .limit(perPage);
  const total = await Student.countDocuments(filter);
  res.json({ data: students, pages: Math.ceil(total / perPage) });
});

app.get("/colleges/:id/students/:studentId", async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  res.json({ data: student });
});

app.get("/colleges/:id/similar", async (req, res) => {
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
        noOfStudents: {
          $gte: college.noOfStudents - 100,
        },
      },
      {
        noOfStudents: {
          $lte: college.noOfStudents + 100,
        },
      },
      {
        "state.isoCode": {
          $eq: college.state.isoCode,
        },
      },
    ],
  }).select("name noOfStudents state courses").limit(10);
  if (similarColleges.length === 0) {
    return res.status(404).json({ message: "No similar colleges found" });
  }
  res.json({ data: similarColleges });
});

app.get("/colleges/stats/states", async (req, res) => {
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
});

app.get("/colleges/stats/courses", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
