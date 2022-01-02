const seed = require("../config/seed").default;
const randomSeed = require("../config/randomSeed").default;

const seedHandler = async (_, res) => {
  await seed();
  res.send("Seeded");
};

const randomSeedHandler = async (_, res) => {
  await randomSeed();
  res.send("Randomly seeded 500 students...");
};

module.exports = {
  seedHandler,
  randomSeedHandler,
};
