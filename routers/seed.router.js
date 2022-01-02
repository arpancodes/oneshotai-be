const express = require("express");
const {
  seedHandler,
  randomSeedHandler,
} = require("../controllers/seed.controller");
const router = express.Router();

router.get("/", seedHandler);
router.get("/random", randomSeedHandler);

module.exports = router;
