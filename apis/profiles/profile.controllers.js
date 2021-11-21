const Profile = require("../../db/models/Profile");
const User = require("../../db/models/User");

// exports.profileCreate = async (req, res, next) => {
//   try {
//     User.findOne(
//       {
//         username: req.params.username,
//       },
//       function (err, foundUser) {
//         if (err) {
//           req.flash("error", "Something went wrong.");
//           return res.redirect("/api");
//         }
//         if (foundUser.length == 0) {
//           //Means no data found
//           //Write code for when no such user is there
//           console.log("no users found");
//         }
//         res.render("Profile", {
//           user: foundUser,
//         });
//       }
//     );
//   } catch (error) {
//     next(error);
//   }
// };

exports.profileCreate = async (req, res, next) => {
  try {
    // if (req.file) {
    //   // /media/imagename.jpg
    //   req.body.image = `/${req.file.path}`;
    // }
    req.body.owner = req.user._id;
    const newProfile = await Profile.create(req.body);
    await newProfile.populate({
      path: "owner",
      select: "username",
    });
    return res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};

exports.profileFetch=async (req, res, next) => {
    try {
      const profiles = await Profile.find()
      .populate("user");
      return res.json(profiles);
    } catch (error) {
      next(error);
      // return res.status(500).json({ message: error.message });
    }
  };



