const Profile = require("../../db/models/Profile");
const User = require("../../db/models/User");
// REVIEW: Remove unused imports

exports.profileList = async (req, res, next) => {
  try {
    const profile = await Profile.find().populate("owner");
    res.json(profile).status(201);
  } catch (error) {
    next(error);
  }
};

exports.profileFetch = async (req, res, next) => {
  try {
    // REVIEW: Remove commented out code
    // var user = req.body.user._id;
    const profile = await Profile.findOne({ _id: req.user._id });
    //   .populate("user",['name']);
    // REVIEW: you dont need this, since very user when you create it you're creating a  profile with it
    if (!profile) {
      return res.status(400).json({ msg: "the is no profile" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      // /media/imagename.jpg
      // req.body.image = `/${req.file.path}`;
      req.body.image = `/${req.file.path}`;
    }
    req.body.owner = req.user._id;
    // REVIEW: I think this has missing fields
    const updatedProfile = await Profile.findOneAndUpdate(req.body);
    await updatedProfile.populate({
      path: "owner",
      select: "username",
    });
    return res.status(201).json(updatedProfile);
  } catch (error) {
    console.log(error);
  }
};
