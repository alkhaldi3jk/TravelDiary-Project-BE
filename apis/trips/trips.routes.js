const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  fetchTrip,
  tripUpdate,
  tripDelete,
  tripListFetch,
  tripCreate,
  tripDetailFetch,
} = require("./trips.controller");

const router = express.Router();

// Param Middleware
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    next({ status: 404, message: "Trip Not Found!" });
  }
});

router.get("/", tripListFetch);

// REVIEW: The fetchTrip is not a controller, remove this. You already have the trip detail.
router.get("/", fetchTrip);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);
// REVIEW: Why so you have a detail route? Do you need it?
router.get("/:tripId", tripDetailFetch);

router.put(
  "/:tripId",
  // passport.authenticate("jwt", { session: false }),
  // upload.single("image"),
  tripUpdate
);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);

module.exports = router;
