if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const { PORT, MONGODB_URI } = require("./config/constants");
const cors = require("cors");
const mongoose = require("mongoose");
const seedRouter = require("./routers/seed.router");
const collegeRouter = require("./routers/college.router");

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/seed", seedRouter);
app.use("/colleges", collegeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
