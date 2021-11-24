const Profile = require("../../db/models/Profile");
const User = require("../../db/models/User");

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
    // var user = req.body.user._id;
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "ow",
      ["name", "image"]
    );
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
