const Profile = require("../../db/models/Profile");
const User = require("../../db/models/User");

exports.profileFetch = async (req, res, next) => {
  try {
    // var user = req.body.user._id;
    const profile = await Profile.findOne( {user: req.user._id} );
    //   .populate("user",['name']);
    if (!profile) {
      return res.status(400).json({ msg: "the is no profile" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};
