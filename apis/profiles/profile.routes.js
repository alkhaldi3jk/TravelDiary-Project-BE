const express = require("express");
const passport = require("passport");
const { profileFetch, profileCreate } = require("./profile.controllers");
const upload = require("../../middleware/multer");

// Create a mini express application
const router = express.Router();
// Param Middleware
router.param("profile", async (req, res, next, userId) => {
  const profile = await fetchShop(userId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    next({ status: 404, message: "Shop Not Found!" });
  }
});

// router.post(
//   "/profile",
// //   upload.single("image"),
// //   passport.authenticate("local", { session: false }),
//   profileCreate
// );

router.get(
  "/me",
    // passport.authenticate("local", { session: false }),
  profileFetch
);

module.exports = router;
