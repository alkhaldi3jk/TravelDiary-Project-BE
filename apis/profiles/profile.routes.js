const express = require("express");
const passport = require("passport");
const {
  profileFetch,
  profileUpdate,
  profileList,
} = require("./profile.controllers");
const upload = require("../../middleware/multer");

// Create a mini express application
const router = express.Router();
// Param Middleware
router.param("profile", async (req, res, next, userId) => {
  const profile = await profileList(userId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    next({ status: 404, message: "profile Not Found!" });
  }
});

router.get(
  "/",
  //   upload.single("image"),
  // passport.authenticate("jwt", { session: false }),
  profileList
);
// REVIEW: We NEVER pass the user ID in the URL, this is not safe. We get the user from the token
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  profileFetch
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),

  profileUpdate
);

module.exports = router;
