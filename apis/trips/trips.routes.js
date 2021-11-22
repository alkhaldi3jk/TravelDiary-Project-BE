const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const { fetchTrip, tripListFetch, tripCreate } = require("./trips.controller");

const router = express.Router();

router.get("/", tripListFetch);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);

module.exports = router;
